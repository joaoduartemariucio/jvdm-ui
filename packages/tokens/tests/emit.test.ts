import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { COLOR_TOKENS, emitDart, emitKotlin, emitReactNative, emitSwift, source } from "../src";

const PACKAGES = new URL("../../", import.meta.url);

const CASES: [string, string][] = [
  ["ios/Sources/JvdmUI/Generated/JvdmTokens.swift", emitSwift(source)],
  ["android/src/main/kotlin/com/jvdm/ui/tokens/Tokens.kt", emitKotlin(source)],
  ["flutter/lib/src/tokens/tokens.dart", emitDart(source)],
  ["react-native/src/tokens/tokens.ts", emitReactNative(source)],
];

const quoted = (emitted: string, name: string) =>
  emitted.includes(`"${name}"`) || emitted.includes(`'${name}'`);

describe("the platform emitters", () => {
  for (const [path, emitted] of CASES) {
    it(`matches the committed packages/${path}`, () => {
      expect(emitted).toBe(readFileSync(new URL(path, PACKAGES), "utf8"));
    });
  }

  for (const [path, emitted] of CASES) {
    it(`carries every contract name into packages/${path}`, () => {
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
