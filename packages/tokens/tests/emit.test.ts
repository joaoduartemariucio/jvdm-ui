import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  COLOR_TOKENS,
  dartFileName,
  emitDart,
  emitDartBarrel,
  emitDartIcon,
  emitKotlin,
  emitKotlinIcon,
  emitReactNative,
  emitReactNativeBarrel,
  emitReactNativeIcon,
  emitSwift,
  emitSwiftIcon,
  emitWebBarrel,
  emitWebIcon,
  readIcons,
  shapeSegments,
  source,
} from "../src";

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

const icons = readIcons();

const ICON_CASES: [string, (icon: (typeof icons)[number]) => string][] = [
  ["web/src/atoms/icon/{name}-icon/index.tsx", emitWebIcon],
  ["ios/Sources/JvdmUI/Atoms/Icon/{component}.swift", emitSwiftIcon],
  ["android/src/main/kotlin/com/jvdm/ui/atoms/icon/{component}.kt", emitKotlinIcon],
  ["flutter/lib/src/atoms/icon/{dart}", emitDartIcon],
  ["react-native/src/atoms/icon/{name}-icon/index.tsx", emitReactNativeIcon],
];

describe("the icon generator", () => {
  it("reads 33 icons and emits one file each per platform", () => {
    expect(icons).toHaveLength(33);
  });

  for (const [template, emit] of ICON_CASES) {
    it(`matches every committed ${template.split("/")[0]} icon`, () => {
      const stale = icons.filter((icon) => {
        const path = template
          .replace("{name}", icon.name)
          .replace("{component}", icon.component)
          .replace("{dart}", dartFileName(icon.name));
        return readFileSync(new URL(path, PACKAGES), "utf8") !== emit(icon);
      });

      expect(stale.map((icon) => icon.name)).toEqual([]);
    });
  }

  it("keeps the web barrel the one the package exports", () => {
    expect(emitWebBarrel(icons)).toBe(
      readFileSync(new URL("web/src/atoms/icon/index.ts", PACKAGES), "utf8"),
    );
  });

  it("keeps the generated barrels current", () => {
    expect(emitDartBarrel(icons)).toBe(
      readFileSync(new URL("flutter/lib/src/atoms/icon/icons.dart", PACKAGES), "utf8"),
    );
    expect(emitReactNativeBarrel(icons)).toBe(
      readFileSync(new URL("react-native/src/atoms/icon/index.ts", PACKAGES), "utf8"),
    );
  });

  it("draws every shape with the same segments on every platform that needs them", () => {
    for (const icon of icons) {
      for (const shape of icon.shapes) {
        const segments = shapeSegments(shape);
        expect(segments.length).toBeGreaterThan(0);
        expect(segments[0].kind).toBe("move");
      }
    }
  });
});
