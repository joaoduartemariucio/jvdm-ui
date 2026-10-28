import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { emitStylesheet, source } from "../src";

const WEB_TOKENS = new URL("../../web/src/tokens/", import.meta.url);

const read = (name: string) => readFileSync(new URL(name, WEB_TOKENS), "utf8");

describe("the generated stylesheet", () => {
  it("is exactly what is committed as packages/web/src/tokens/tokens.css", () => {
    expect(emitStylesheet(source, read("runtime.css"))).toBe(read("tokens.css"));
  });

  it("declares every color once, inside light-dark", () => {
    const css = read("tokens.css");
    const declarations = [...css.matchAll(/^ {2}--color-([a-z-]+):/gm)].map(([, name]) => name);

    expect(new Set(declarations).size).toBe(declarations.length);
    for (const name of declarations) {
      expect(css).toMatch(new RegExp(`^ {2}--color-${name}: light-dark\\(`, "m"));
    }
  });

  it("re-declares no token under a data-theme selector", () => {
    expect(read("tokens.css")).not.toMatch(/\[data-theme=[^\]]+\][^{]*\{[^}]*--/);
  });
});
