import { describe, expect, it } from "vitest";

import {
  COLOR_TOKENS,
  DURATION_STEPS,
  EASE_STEPS,
  RADIUS_STEPS,
  SHADOW_STEPS,
  TEXT_STEPS,
  TRACKING_STEPS,
  WEIGHT_STEPS,
  constantName,
  identifier,
  typeName,
} from "../src";

const SCALES = [
  COLOR_TOKENS,
  TEXT_STEPS,
  TRACKING_STEPS,
  WEIGHT_STEPS,
  RADIUS_STEPS,
  EASE_STEPS,
  DURATION_STEPS,
  SHADOW_STEPS,
];

describe("the identifier rule", () => {
  it("turns a contract name into each platform's spelling", () => {
    expect(identifier("line-strong")).toBe("lineStrong");
    expect(typeName("line-strong")).toBe("LineStrong");
    expect(constantName("line-strong")).toBe("LINE_STRONG");
  });

  it("spells out the names no language lets start with a digit", () => {
    expect(identifier("2xs")).toBe("xxs");
    expect(identifier("2xl")).toBe("xxl");
    expect(constantName("2xs")).toBe("XXS");
  });

  it("produces a valid identifier for every name in every scale", () => {
    for (const scale of SCALES) {
      for (const name of scale) {
        expect(identifier(name)).toMatch(/^[a-z][A-Za-z0-9]*$/);
        expect(constantName(name)).toMatch(/^[A-Z][A-Z0-9_]*$/);
      }
    }
  });

  it("collides on no name within a scale", () => {
    for (const scale of SCALES) {
      const spellings = scale.map(identifier);
      expect(new Set(spellings).size).toBe(spellings.length);
    }
  });
});
