import assert from "node:assert/strict";
import test from "node:test";

import { defineTheme } from "../dist/theme/index.js";

test("emits grouped colors, typography and token configuration", () => {
  const css = defineTheme({
    colors: {
      accent: { light: "white", dark: "black" },
      brand: "red",
    },
    typography: {
      font: { sans: "Example Sans", mono: "Example Mono" },
      text: { sm: ["15px", 1.6] },
      tracking: { caps: "0.08em" },
      weight: { medium: 500 },
    },
    tokens: {
      spacing: "0.25rem",
      radius: { md: "8px" },
    },
  });

  assert.match(css, /--color-accent: light-dark\(white, black\);/);
  assert.match(css, /--color-brand: red;/);
  assert.match(css, /--font-sans: Example Sans;/);
  assert.match(css, /--font-mono: Example Mono;/);
  assert.match(css, /--text-sm: 15px;/);
  assert.match(css, /--text-sm--line-height: 1.6;/);
  assert.match(css, /--spacing: 0.25rem;/);
  assert.match(css, /--radius-md: 8px;/);
});

test("emits the depth and motion scales a consumer overrides", () => {
  const css = defineTheme({
    typography: { tracking: { display: "-0.03em" } },
    tokens: {
      shadow: { modal: "0 2px 4px black" },
      ease: { out: "linear" },
      duration: { base: "300ms" },
    },
  });

  assert.match(css, /--tracking-display: -0.03em;/);
  assert.match(css, /--shadow-modal: 0 2px 4px black;/);
  assert.match(css, /--ease-out: linear;/);
  assert.match(css, /--duration-base: 300ms;/);
});

test("can emit the same theme under a runtime selector", () => {
  const css = defineTheme({ colors: { accent: "red" } }, { selector: ":root" });

  assert.match(css, /^:root \{/);
  assert.match(css, /--color-accent: red;/);
});
