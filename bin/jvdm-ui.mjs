#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineTheme } from "../dist/theme/index.js";

const USAGE = `jvdm-ui theme <input.json> [--out <output.css>]

Turns a theme JSON into a Tailwind @theme block.

  jvdm-ui theme theme.json --out src/theme.css
  jvdm-ui theme theme.json > src/theme.css
`;

const [command, input, ...rest] = process.argv.slice(2);

if (command !== "theme" || !input) {
  process.stdout.write(USAGE);
  process.exit(command === "theme" ? 1 : 0);
}

const outIndex = rest.findIndex((arg) => arg === "--out" || arg === "-o");
const out = outIndex === -1 ? null : rest[outIndex + 1];

if (outIndex !== -1 && !out) {
  process.stderr.write("jvdm-ui: --out needs a file path\n");
  process.exit(1);
}

let config;
try {
  config = JSON.parse(readFileSync(resolve(input), "utf8"));
} catch (error) {
  process.stderr.write(`jvdm-ui: cannot read ${input}\n${error.message}\n`);
  process.exit(1);
}

const css = defineTheme(config);

if (!css) {
  process.stderr.write(`jvdm-ui: ${input} produced no tokens\n`);
  process.exit(1);
}

if (out) {
  writeFileSync(resolve(out), css);
  process.stderr.write(`jvdm-ui: wrote ${out}\n`);
} else {
  process.stdout.write(css);
}
