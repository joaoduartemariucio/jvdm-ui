import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { COLOR_TOKENS, emitDart, emitKotlin, emitReactNative, emitSwift, source } from "../src";

const GENERATED = new URL("../generated/", import.meta.url);

const CASES: [string, string][] = [
  ["ios/JvdmTokens.swift", emitSwift(source)],
  ["android/Tokens.kt", emitKotlin(source)],
  ["flutter/tokens.dart", emitDart(source)],
  ["react-native/tokens.ts", emitReactNative(source)],
];

const quoted = (emitted: string, name: string) =>
  emitted.includes(`"${name}"`) || emitted.includes(`'${name}'`);

describe("the platform emitters", () => {
  for (const [path, emitted] of CASES) {
    it(`matches the committed generated/${path}`, () => {
      expect(emitted).toBe(readFileSync(new URL(path, GENERATED), "utf8"));
    });
  }

  for (const [path, emitted] of CASES) {
    it(`carries every contract name into generated/${path}`, () => {
      const missing = [
        ...COLOR_TOKENS,
        "2xs",
        "2xl",
        "in-out",
        "instant",
        "raised",
        "popover",
        "modal",
      ].filter((name) => !quoted(emitted, name));

      expect(missing).toEqual([]);
    });
  }
});
