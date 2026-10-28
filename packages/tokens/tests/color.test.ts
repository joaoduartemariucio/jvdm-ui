import { describe, expect, it } from "vitest";

import {
  formatOklch,
  isInDisplayP3Gamut,
  isInSrgbGamut,
  source,
  toDisplayP3,
  toHex,
  toLinearSrgb,
} from "../src";

const PRIMARIES: [string, { l: number; c: number; h: number }][] = [
  ["#ffffff", { l: 1, c: 0, h: 0 }],
  ["#000000", { l: 0, c: 0, h: 0 }],
  ["#ff0000", { l: 0.6279553606145515, c: 0.25768330773615683, h: 29.2338851923426 }],
  ["#00ff00", { l: 0.8664396115356899, c: 0.2948272245426958, h: 142.49533888780996 }],
  ["#0000ff", { l: 0.4520137183853429, c: 0.31321437166460125, h: 264.052020638055 }],
];

const P3_PRIMARIES: [string, [number, number, number]][] = [
  ["#ffffff", [255, 255, 255]],
  ["#ff0000", [234, 51, 35]],
  ["#0000ff", [0, 0, 245]],
];

const OUT_OF_P3_GAMUT = ["warn-soft light", "danger-soft light", "info-soft light"];

const OUT_OF_GAMUT = [
  "ok light",
  "warn light",
  "warn-soft light",
  "danger light",
  "danger-soft light",
  "info-soft light",
];

const outside = (fits: (value: { l: number; c: number; h: number }) => boolean) =>
  source.colors.flatMap((group) =>
    Object.entries(group).flatMap(([token, pair]) =>
      pair
        ? (["light", "dark"] as const)
            .filter((mode) => !fits(pair[mode]))
            .map((mode) => `${token} ${mode}`)
        : [],
    ),
  );

describe("oklch", () => {
  it("serialises the way the stylesheet does", () => {
    expect(formatOklch({ l: 0.965, c: 0.012, h: 78 })).toBe("oklch(0.965 0.012 78)");
    expect(formatOklch({ l: 0, c: 0, h: 0, alpha: 0.36 })).toBe("oklch(0 0 0 / 0.36)");
  });

  it("round-trips the sRGB primaries", () => {
    for (const [hex, value] of PRIMARIES) {
      expect(toHex(value)).toBe(hex);
    }
  });

  it("re-expresses the sRGB primaries in Display P3 coordinates", () => {
    for (const [hex, expected] of P3_PRIMARIES) {
      const value = PRIMARIES.find(([candidate]) => candidate === hex)?.[1];
      const p3 = toDisplayP3(value!);
      expect([p3.r, p3.g, p3.b]).toEqual(expected);
    }
  });

  it("names the tokens a sRGB-only platform has to clamp", () => {
    expect(outside(isInSrgbGamut)).toEqual(OUT_OF_GAMUT);
  });

  it("names the tokens even Display P3 has to clamp", () => {
    expect(outside(isInDisplayP3Gamut)).toEqual(OUT_OF_P3_GAMUT);
  });

  it("keeps every clamp small enough to stay a nuance", () => {
    for (const group of source.colors) {
      for (const pair of Object.values(group)) {
        if (!pair) continue;
        for (const value of [pair.light, pair.dark]) {
          const excess = Math.max(
            ...toLinearSrgb(value).map((channel) => Math.max(-channel, channel - 1)),
          );
          expect(excess).toBeLessThan(0.12);
        }
      }
    }
  });
});
