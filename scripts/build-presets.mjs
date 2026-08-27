import { mkdirSync, writeFileSync } from "node:fs";
import { defineTheme, gavel } from "../dist/theme/index.js";

const PRESETS = { gavel };

mkdirSync(new URL("../dist/presets/", import.meta.url), { recursive: true });

for (const [name, preset] of Object.entries(PRESETS)) {
  const target = new URL(`../dist/presets/${name}.css`, import.meta.url);
  writeFileSync(target, defineTheme(preset));
  process.stdout.write(`presets: dist/presets/${name}.css\n`);
}
