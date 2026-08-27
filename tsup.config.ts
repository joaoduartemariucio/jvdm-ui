import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "tokens/index": "src/tokens/index.ts",
    "atoms/index": "src/atoms/index.ts",
    "molecules/index": "src/molecules/index.ts",
    "organisms/index": "src/organisms/index.ts",
    "theme/index": "src/theme/index.ts",
  },
  format: ["esm"],
  target: "es2022",
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
});
