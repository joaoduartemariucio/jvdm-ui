import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const to = (type) => ({ to: { element: { type } } });

const SPACING = "(gap|gap-x|gap-y|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|space-x|space-y)";

const dsPatterns = [
  {
    re: `\\b${SPACING}-\\[`,
    msg: "Arbitrary spacing. Use the scale (2px and multiples of 4). ADR 0001, R5.",
  },
  {
    re: `\\b${SPACING}-[1-9][0-9]*\\.[0-9]`,
    msg: "Half-step outside the scale. Only 0.5 (2px) and whole steps (4, 8, 12, 16…). ADR 0001, R5.",
  },
  {
    re: "\\b(text|tracking|leading)-\\[",
    msg: "Arbitrary typography. Use the token steps and tracking. ADR 0001, R5.",
  },
  {
    re: "\\bfont-(thin|extralight|light|semibold|extrabold|black)\\b",
    msg: "Weight outside the scale (only 400/500/700) — the browser synthesises it. ADR 0001, R5.",
  },
  {
    re: "\\b[a-z-]+-\\[(#|rgb|hsl|oklch|var\\(--p-)",
    msg: "Raw color. Use the semantic tokens (accent, ink, danger…). ADR 0001, R5.",
  },
  {
    re: `\\b${SPACING}-px\\b`,
    msg: "1px spacing. The scale starts at 2px (0.5). That is a border, not a gap. ADR 0001, R5.",
  },
  {
    re: "\\btracking-(?!caps|code)[a-z]",
    msg: "Tracking outside the scale. Only tracking-caps and tracking-code. ADR 0001, R5.",
  },
  {
    re: "\\brounded-\\[",
    msg: "Arbitrary radius. Use radius-xs|sm|md|lg|xl. ADR 0001, R5.",
  },
  {
    re: "-\\[[0-9]*[13579]px",
    msg: "Odd value. A one-off dimension is allowed, but only in even px. ADR 0001, R5.",
  },
];

const LOOSE_TEXT = "Loose text. Move it to this folder's `locales.ts`. ADR 0001, R7.";

const textRules = [
  {
    selector: "JSXText[value=/[A-Za-zÀ-ÿ]{3}/]",
    message: LOOSE_TEXT,
  },
  {
    selector:
      "JSXAttribute[name.name=/^(label|title|placeholder|description|hint|alt|aria-label)$/] > Literal[value=/[A-Za-zÀ-ÿ]{3}/]",
    message: LOOSE_TEXT,
  },
];

const designSystemRules = dsPatterns.flatMap(({ re, msg }) => [
  { selector: `Literal[value=/${re}/]`, message: msg },
  { selector: `TemplateElement[value.raw=/${re}/]`, message: msg },
]);

const local = {
  rules: {
    "import-the-folder": {
      meta: { type: "problem", schema: [] },
      create(context) {
        return {
          ImportDeclaration(node) {
            const spec = node.source.value;
            if (typeof spec !== "string") return;
            if (!spec.startsWith(".")) return;
            if (/\.(css|svg|png|json)$/.test(spec)) return;

            const parts = spec.split("/").filter((p) => p !== "." && p !== "..");
            if (parts.length <= 1) return;

            context.report({
              node: node.source,
              message: `Deep import: ${spec}. Import the folder, not the file inside it. ADR 0002, C2.`,
            });
          },
        };
      },
    },
    "one-component-per-file": {
      meta: { type: "problem", schema: [] },
      create(context) {
        if (!context.filename.endsWith(".tsx")) return {};

        const found = new Map();

        const nameOf = (fn) => {
          if (fn.type === "FunctionDeclaration" && fn.id) return fn.id.name;
          if (fn.parent?.type === "VariableDeclarator" && fn.parent.id.type === "Identifier") {
            return fn.parent.id.name;
          }
          return null;
        };

        const isFunction = (node) =>
          node.type === "FunctionDeclaration" ||
          node.type === "FunctionExpression" ||
          node.type === "ArrowFunctionExpression";

        return {
          "JSXElement, JSXFragment"(node) {
            for (const ancestor of context.sourceCode.getAncestors(node)) {
              if (!isFunction(ancestor)) continue;
              const name = nameOf(ancestor);
              if (!name || !/^[A-Z]/.test(name)) continue;
              if (!found.has(name)) found.set(name, ancestor);
              return;
            }
          },
          "Program:exit"() {
            for (const [name, node] of [...found].slice(1)) {
              context.report({
                node,
                message: `Second component in the same file: ${name}. One component per folder, in its index.tsx. ADR 0002, C1.`,
              });
            }
          },
        };
      },
    },
    "no-comments": {
      meta: { type: "problem", schema: [] },
      create(context) {
        return {
          Program() {
            for (const comment of context.sourceCode.getAllComments()) {
              context.report({
                loc: comment.loc,
                message: "Code comment. The reason for a decision lives in an ADR. ADR 0002, C3.",
              });
            }
          },
        };
      },
    },
    "no-app-import": {
      meta: { type: "problem", schema: [] },
      create(context) {
        return {
          ImportDeclaration(node) {
            const spec = node.source.value;
            if (typeof spec !== "string") return;
            if (!/^@(shared|features|app|ds|test)\//.test(spec)) return;

            context.report({
              node: node.source,
              message: `The design system knows no app: ${spec}. ADR 0001.`,
            });
          },
        };
      },
    },
  },
};

const eslintConfig = defineConfig([
  globalIgnores(["dist/**"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat["recommended-latest"],
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      "no-restricted-syntax": ["error", ...designSystemRules],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "boundaries/include": ["src/**/*.{ts,tsx}"],
      "boundaries/elements": [
        { type: "theme", pattern: "src/theme/**", partialMatch: false },
        { type: "tokens", pattern: "src/tokens/**", partialMatch: false },
        { type: "atoms", pattern: "src/atoms/**", partialMatch: false },
        { type: "molecules", pattern: "src/molecules/**", partialMatch: false },
        { type: "organisms", pattern: "src/organisms/**", partialMatch: false },
        { type: "package-index", pattern: "src", partialMatch: false },
      ],
      "import/resolver": { typescript: { alwaysTryTypes: true } },
    },
    rules: {
      "boundaries/no-unknown-files": "error",
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            { from: [{ element: { type: "theme" } }], allow: [to("theme")] },
            { from: [{ element: { type: "tokens" } }], allow: [to("tokens")] },
            { from: [{ element: { type: "atoms" } }], allow: [to("tokens"), to("atoms")] },
            {
              from: [{ element: { type: "molecules" } }],
              allow: [to("tokens"), to("atoms"), to("molecules")],
            },
            {
              from: [{ element: { type: "organisms" } }],
              allow: [to("tokens"), to("atoms"), to("molecules"), to("organisms")],
            },
            {
              from: [{ element: { type: "package-index" } }],
              allow: [to("tokens"), to("atoms"), to("molecules"), to("organisms")],
            },
          ],
        },
      ],
    },
  },

  {
    files: ["src/**/*.tsx"],
    rules: {
      "no-restricted-syntax": ["error", ...designSystemRules, ...textRules],
    },
  },

  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { local },
    rules: {
      "local/no-comments": "error",
      "local/one-component-per-file": "error",
      "local/import-the-folder": "error",
      "local/no-app-import": "error",
    },
  },

  prettier,
]);

export default eslintConfig;
