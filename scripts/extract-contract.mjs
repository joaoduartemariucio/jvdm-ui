import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";

import ts from "typescript";

const WEB = resolve("packages/web/src");
const OUT = process.argv.includes("--out")
  ? resolve(process.argv[process.argv.indexOf("--out") + 1])
  : resolve("contracts");
const LAYERS = ["atoms", "molecules", "organisms"];

const program = ts.createProgram(
  LAYERS.map((layer) => join(WEB, layer, "index.ts")),
  {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
  },
);

const checker = program.getTypeChecker();

function functionOf(declaration) {
  if (ts.isFunctionDeclaration(declaration)) return declaration;
  if (
    ts.isVariableDeclaration(declaration) &&
    declaration.initializer &&
    (ts.isArrowFunction(declaration.initializer) ||
      ts.isFunctionExpression(declaration.initializer))
  ) {
    return declaration.initializer;
  }
  return null;
}

function isComponent(name, node) {
  if (!/^[A-Z]/.test(name)) return false;
  const signature = checker.getSignatureFromDeclaration(node);
  if (!signature) return false;
  return /\bElement\b/.test(checker.typeToString(checker.getReturnTypeOfSignature(signature)));
}

function literalValues(type) {
  const parts = type.isUnion() ? type.types : [type];
  const literals = parts.filter((part) => part.isStringLiteral());
  if (
    literals.length === 0 ||
    literals.length !== parts.filter((part) => !isUndefined(part)).length
  ) {
    return null;
  }
  return literals.map((part) => part.value);
}

const isUndefined = (type) => (type.flags & ts.TypeFlags.Undefined) !== 0;

function defaultsOf(node) {
  const parameter = node.parameters[0];
  const defaults = new Map();
  if (!parameter || !ts.isObjectBindingPattern(parameter.name)) return defaults;

  for (const element of parameter.name.elements) {
    if (!element.initializer) continue;
    const key = (element.propertyName ?? element.name).getText();
    const text = element.initializer.getText();
    const literal =
      ts.isStringLiteral(element.initializer) ||
      ts.isNumericLiteral(element.initializer) ||
      element.initializer.kind === ts.SyntaxKind.TrueKeyword ||
      element.initializer.kind === ts.SyntaxKind.FalseKeyword;
    defaults.set(key, {
      default: ts.isStringLiteral(element.initializer) ? element.initializer.text : text,
      defaultKind: literal ? "literal" : "expression",
    });
  }
  return defaults;
}

function aliasTarget(reference) {
  const found = checker.getSymbolAtLocation(reference.typeName);
  if (!found) return null;
  const symbol = found.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(found) : found;
  const declaration = symbol.declarations?.find(ts.isTypeAliasDeclaration);
  return declaration?.type ?? null;
}

function hostOf(reference) {
  const name = reference.typeName.getText();
  if (!/^ComponentProps(WithRef|WithoutRef)?$/.test(name)) return null;
  const argument = reference.typeArguments?.[0];
  if (!argument || !ts.isLiteralTypeNode(argument) || !ts.isStringLiteral(argument.literal)) {
    return "unknown";
  }
  return argument.literal.text;
}

function omitted(reference) {
  const argument = reference.typeArguments?.[1];
  if (!argument) return [];
  const parts = ts.isUnionTypeNode(argument) ? argument.types : [argument];
  return parts
    .filter((part) => ts.isLiteralTypeNode(part) && ts.isStringLiteral(part.literal))
    .map((part) => part.literal.text);
}

function collect(typeNode, members, hosts, seen) {
  if (!typeNode) return;

  if (ts.isTypeLiteralNode(typeNode)) {
    members.push(...typeNode.members.filter(ts.isPropertySignature));
    return;
  }

  if (ts.isIntersectionTypeNode(typeNode)) {
    for (const part of typeNode.types) collect(part, members, hosts, seen);
    return;
  }

  if (ts.isParenthesizedTypeNode(typeNode)) {
    collect(typeNode.type, members, hosts, seen);
    return;
  }

  if (ts.isTypeReferenceNode(typeNode)) {
    const host = hostOf(typeNode);
    if (host) {
      hosts.push({ element: host, omits: [] });
      return;
    }

    const name = typeNode.typeName.getText();
    if (name === "Omit" || name === "Pick") {
      const before = hosts.length;
      collect(typeNode.typeArguments?.[0], members, hosts, seen);
      const keys = omitted(typeNode);
      for (const entry of hosts.slice(before)) {
        entry.omits = name === "Omit" ? keys : [];
        if (name === "Pick") entry.keeps = keys;
      }
      return;
    }
    const text = typeNode.getText();
    if (seen.has(text)) return;
    seen.add(text);
    collect(aliasTarget(typeNode), members, hosts, seen);
  }
}

const AFFORDANCES = { className: "styling", htmlFor: "labelling" };

const PRESENTATION = {
  "molecules/modal": ["isOpen", "onClose"],
  "molecules/drawer": ["isOpen", "onClose"],
  "molecules/confirm-dialog": ["open", "onCancel"],
};

function propsOf(node, presentation) {
  const parameter = node.parameters[0];
  if (!parameter) return { props: [], host: null };

  const defaults = defaultsOf(node);
  const members = [];
  const hosts = [];
  collect(parameter.type, members, hosts, new Set());

  const props = members.map((member) => {
    const name = member.name.getText().replace(/^"|"$/g, "");
    const printed = member.type ? member.type.getText() : "unknown";
    const values = member.type ? literalValues(checker.getTypeFromTypeNode(member.type)) : null;
    const fallback = defaults.get(name);

    return {
      name,
      optional: Boolean(member.questionToken),
      type: printed,
      ...(values ? { values } : {}),
      ...(/\bReactNode\b/.test(printed) ? { slot: true } : {}),
      ...(AFFORDANCES[name] ? { affordance: AFFORDANCES[name] } : {}),
      ...(presentation.includes(name) ? { presentation: true } : {}),
      ...(fallback ?? {}),
    };
  });

  const declared = new Set(props.map((prop) => prop.name));

  for (const [name, fallback] of defaults) {
    if (declared.has(name)) continue;
    props.push({
      name,
      optional: true,
      type: "unknown",
      inherited: true,
      ...(AFFORDANCES[name] ? { affordance: AFFORDANCES[name] } : {}),
      ...fallback,
    });
  }

  return { props, host: hosts[0] ?? null };
}

function localesImportedBy(file) {
  const component = program.getSourceFile(file);
  if (!component) return [];

  const specifiers = component.statements
    .filter(ts.isImportDeclaration)
    .map((statement) => statement.moduleSpecifier)
    .filter(ts.isStringLiteral)
    .map((specifier) => specifier.text)
    .filter((specifier) => /(^|\/)locales$/.test(specifier));

  for (const specifier of specifiers) {
    const target = `${resolve(dirname(file), specifier)}.ts`;
    const source = program.getSourceFile(target);
    if (!source) continue;

    const keys = [];
    ts.forEachChild(source, (node) => {
      if (!ts.isVariableStatement(node)) return;
      for (const declaration of node.declarationList.declarations) {
        if (declaration.name.getText() !== "locales") continue;
        if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) {
          continue;
        }
        for (const property of declaration.initializer.properties) {
          if (!ts.isPropertyAssignment(property)) continue;
          const parameterised =
            ts.isArrowFunction(property.initializer) ||
            ts.isFunctionExpression(property.initializer);
          keys.push({
            key: property.name.getText().replace(/^"|"$/g, ""),
            ...(parameterised ? { parameterised: true } : {}),
          });
        }
      }
    });

    if (keys.length > 0) return keys;
  }
  return [];
}

const contracts = [];

for (const layer of LAYERS) {
  const barrel = program.getSourceFile(join(WEB, layer, "index.ts"));
  const moduleSymbol = checker.getSymbolAtLocation(barrel);

  for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
    const resolved =
      symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
    const declaration = resolved.valueDeclaration ?? resolved.declarations?.[0];
    if (!declaration) continue;

    const node = functionOf(declaration);
    if (!node) continue;

    const name = symbol.getName();
    if (!isComponent(name, node)) continue;

    const file = declaration.getSourceFile().fileName;
    const folder = dirname(file);

    const id = `${layer}/${basename(folder)}`;
    const presentation = PRESENTATION[id] ?? [];
    const { props, host } = propsOf(node, presentation);

    contracts.push({
      name,
      contract: basename(folder),
      layer,
      source: relative(WEB, file),
      ...(host ? { host } : {}),
      ...(presentation.length > 0 ? { presents: true } : {}),
      props,
      locales: localesImportedBy(file),
    });
  }
}

contracts.sort((a, b) => a.layer.localeCompare(b.layer) || a.contract.localeCompare(b.contract));

const clashes = new Map();
for (const entry of contracts) {
  const key = `${entry.layer}/${entry.contract}`;
  clashes.set(key, (clashes.get(key) ?? 0) + 1);
}
const duplicated = [...clashes].filter(([, count]) => count > 1);
if (duplicated.length > 0) {
  process.stderr.write(
    `extract-contract: two components share a contract name: ${duplicated
      .map(([key]) => key)
      .join(", ")}\n`,
  );
  process.exit(1);
}

for (const layer of LAYERS) {
  rmSync(join(OUT, layer), { recursive: true, force: true });
}
rmSync(join(OUT, "index.json"), { force: true });

for (const entry of contracts) {
  const folder = join(OUT, entry.layer);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, `${entry.contract}.json`), `${JSON.stringify(entry, null, 2)}\n`);
}

writeFileSync(
  join(OUT, "index.json"),
  `${JSON.stringify(
    {
      components: contracts.map(({ name, contract, layer, source }) => ({
        name,
        contract,
        layer,
        source,
      })),
    },
    null,
    2,
  )}\n`,
);

const counted = LAYERS.map(
  (layer) => `${contracts.filter((entry) => entry.layer === layer).length} ${layer}`,
).join(", ");

process.stdout.write(`contracts: ${contracts.length} components (${counted})\n`);
