import { describe, expect, it } from "vitest";

import { COLOR_TOKENS, source } from "../src";

const declared = source.colors.flatMap((group) => Object.keys(group));

describe("the token source", () => {
  it("covers every color token, in contract order, exactly once", () => {
    expect(declared).toEqual([...COLOR_TOKENS]);
  });

  it("keeps the spacing scale on a 4px base", () => {
    expect(source.spacing).toBe(4);
  });

  it("carries no weight the browser has to synthesise", () => {
    expect(Object.values(source.weight)).toEqual([400, 500, 700]);
  });

  it("gives every shadow step at least two layers", () => {
    for (const layers of Object.values(source.shadow)) {
      expect(layers.length).toBeGreaterThanOrEqual(2);
    }
  });
});
