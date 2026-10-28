import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = process.argv.includes("--root")
  ? resolve(process.argv[process.argv.indexOf("--root") + 1])
  : resolve(".");

const read = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));

const localeKey = (entry) =>
  typeof entry === "string" ? entry : `${entry.key}${entry.parameterised ? "(…)" : ""}`;

const { platforms } = read("contracts/platforms.json");
const { components } = read("contracts/index.json");

const web = new Map(
  components.map((entry) => {
    const contract = read(`contracts/${entry.layer}/${entry.contract}.json`);
    return [
      `${entry.layer}/${entry.contract}`,
      {
        name: contract.name,
        props: contract.props.filter((prop) => !prop.inherited && !prop.affordance),
        locales: contract.locales.map(localeKey),
      },
    ];
  }),
);

const waivers = existsSync(join(root, "contracts/waivers.json"))
  ? read("contracts/waivers.json")
  : {};

const failures = [];
const summary = [];

for (const platform of platforms) {
  if (platform.source) continue;

  const manifest = join(platform.package, "contract.json");
  const declared = existsSync(join(root, manifest)) ? read(manifest) : { implements: [] };
  const implemented = new Map(declared.implements.map((entry) => [entry.contract, entry]));

  const waived = waivers[platform.id] ?? { contracts: [] };
  const waivedSet = new Set(waived.contracts);

  for (const id of waivedSet) {
    if (!web.has(id)) {
      failures.push(`${platform.id}: waiver for ${id}, which is not a web contract`);
    }
    if (implemented.has(id)) {
      failures.push(`${platform.id}: ${id} is implemented and still waived — drop the waiver`);
    }
  }

  const missing = [];

  for (const [id, contract] of web) {
    const entry = implemented.get(id);

    if (!entry) {
      if (!waivedSet.has(id)) missing.push(id);
      continue;
    }

    if (!entry.file) {
      failures.push(`${platform.id}: ${id} declares no file`);
    } else if (!existsSync(join(root, platform.package, entry.file))) {
      failures.push(`${platform.id}: ${id} points at ${entry.file}, which does not exist`);
    }

    const expected = contract.props.map((prop) => prop.name).sort();
    const actual = [...(entry.props ?? [])].map((prop) => prop.name).sort();

    for (const name of expected.filter((prop) => !actual.includes(prop))) {
      failures.push(`${platform.id}: ${id} is missing prop \`${name}\``);
    }
    for (const name of actual.filter((prop) => !expected.includes(prop))) {
      failures.push(
        `${platform.id}: ${id} adds prop \`${name}\`, which the web contract does not have`,
      );
    }

    const strings = [...(entry.locales ?? [])].map(localeKey).sort();
    const expectedStrings = [...contract.locales].sort();

    if (strings.join("|") !== expectedStrings.join("|")) {
      failures.push(
        `${platform.id}: ${id} says [${strings.join(", ")}] on its own, the web contract says [${expectedStrings.join(", ")}]`,
      );
    }

    for (const prop of contract.props) {
      if (!prop.values) continue;
      const mirror = (entry.props ?? []).find((candidate) => candidate.name === prop.name);
      if (!mirror) continue;
      const theirs = [...(mirror.values ?? [])].sort();
      const ours = [...prop.values].sort();
      if (theirs.join("|") !== ours.join("|")) {
        failures.push(
          `${platform.id}: ${id}.${prop.name} has [${theirs.join(", ")}], the web contract has [${ours.join(", ")}]`,
        );
      }
    }
  }

  for (const id of missing) {
    failures.push(`${platform.id}: ${id} is neither implemented nor waived`);
  }

  summary.push(
    `${platform.id.padEnd(13)} ${String(implemented.size).padStart(3)} implemented  ${String(waivedSet.size).padStart(3)} waived  ${String(missing.length).padStart(3)} unaccounted`,
  );
}

process.stdout.write(`${web.size} web contracts\n\n${summary.join("\n")}\n`);

if (failures.length > 0) {
  process.stderr.write(`\n${failures.map((line) => `  ${line}`).join("\n")}\n`);
  process.stderr.write(`\ncheck-parity: ${failures.length} problem(s).\n`);
  process.exit(1);
}

process.stdout.write("\ncheck-parity: every web contract is implemented or waived.\n");
