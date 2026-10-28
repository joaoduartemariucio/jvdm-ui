import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts", cli: "src/cli.ts" },
  format: ["esm"],
  dts: { entry: { index: "src/index.ts" } },
  target: "node22",
  platform: "node",
  clean: true,
  splitting: false,
});
