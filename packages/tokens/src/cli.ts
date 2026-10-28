import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { emitDart, emitKotlin, emitReactNative, emitStylesheet, emitSwift } from "./emit";
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

for (const [path, contents] of TARGETS) {
  const target = new URL(path, PACKAGES);
  mkdirSync(dirname(target.pathname), { recursive: true });
  writeFileSync(target, contents);
  process.stdout.write(`tokens: packages/${path}\n`);
}
