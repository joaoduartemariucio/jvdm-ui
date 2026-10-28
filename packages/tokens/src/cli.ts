import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { emitDart, emitKotlin, emitReactNative, emitStylesheet, emitSwift } from "./emit";
import { source } from "./source";

const WEB_TOKENS = new URL("../../web/src/tokens/", import.meta.url);
const GENERATED = new URL("../generated/", import.meta.url);

const runtime = readFileSync(new URL("runtime.css", WEB_TOKENS), "utf8");

const TARGETS: [URL, string][] = [
  [new URL("tokens.css", WEB_TOKENS), emitStylesheet(source, runtime)],
  [new URL("ios/JvdmTokens.swift", GENERATED), emitSwift(source)],
  [new URL("android/Tokens.kt", GENERATED), emitKotlin(source)],
  [new URL("flutter/tokens.dart", GENERATED), emitDart(source)],
  [new URL("react-native/tokens.ts", GENERATED), emitReactNative(source)],
];

for (const [target, contents] of TARGETS) {
  mkdirSync(dirname(target.pathname), { recursive: true });
  writeFileSync(target, contents);
  process.stdout.write(`tokens: ${target.pathname.split("/jvdm-ui/")[1]}\n`);
}
