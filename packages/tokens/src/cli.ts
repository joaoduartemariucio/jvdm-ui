import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import {
  dartFileName,
  emitDart,
  emitDartBarrel,
  emitDartIcon,
  emitKotlin,
  emitKotlinIcon,
  emitReactNative,
  emitReactNativeBarrel,
  emitReactNativeIcon,
  emitStylesheet,
  emitSwift,
  emitSwiftIcon,
  emitWebBarrel,
  emitWebIcon,
} from "./emit";
import { readIcons } from "./icons";
import { source } from "./source";

const PACKAGES = new URL("../../", import.meta.url);

const runtime = readFileSync(new URL("web/src/tokens/runtime.css", PACKAGES), "utf8");

const TARGETS: [string, string][] = [
  ["web/src/tokens/tokens.css", emitStylesheet(source, runtime)],
  ["ios/Sources/JvdmUI/Generated/JvdmTokens.swift", emitSwift(source)],
  ["android/src/main/kotlin/com/jvdm/ui/tokens/Tokens.kt", emitKotlin(source)],
  ["flutter/lib/src/tokens/tokens.dart", emitDart(source)],
  ["react-native/src/tokens/tokens.ts", emitReactNative(source)],
];

rmSync(new URL("tokens/generated/", PACKAGES), { recursive: true, force: true });

const icons = readIcons();

for (const icon of icons) {
  TARGETS.push(
    [`web/src/atoms/icon/${icon.name}-icon/index.tsx`, emitWebIcon(icon)],
    [`ios/Sources/JvdmUI/Atoms/Icon/${icon.component}.swift`, emitSwiftIcon(icon)],
    [`android/src/main/kotlin/com/jvdm/ui/atoms/icon/${icon.component}.kt`, emitKotlinIcon(icon)],
    [`flutter/lib/src/atoms/icon/${dartFileName(icon.name)}`, emitDartIcon(icon)],
    [`react-native/src/atoms/icon/${icon.name}-icon/index.tsx`, emitReactNativeIcon(icon)],
  );
}

TARGETS.push(
  ["web/src/atoms/icon/index.ts", emitWebBarrel(icons)],
  ["flutter/lib/src/atoms/icon/icons.dart", emitDartBarrel(icons)],
  ["react-native/src/atoms/icon/index.ts", emitReactNativeBarrel(icons)],
);

for (const [path, contents] of TARGETS) {
  const target = new URL(path, PACKAGES);
  mkdirSync(dirname(target.pathname), { recursive: true });
  writeFileSync(target, contents);
  process.stdout.write(`tokens: packages/${path}\n`);
}
