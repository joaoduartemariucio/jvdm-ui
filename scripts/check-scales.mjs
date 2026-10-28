import { readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = process.argv.includes("--root")
  ? resolve(process.argv[process.argv.indexOf("--root") + 1])
  : resolve(".");

const ROOTS = [
  "packages/ios/Sources",
  "packages/ios/Tests",
  "packages/android/src",
  "packages/flutter/lib",
  "packages/flutter/test",
  "packages/react-native/src",
];

const GENERATED = [
  "packages/ios/Sources/JvdmUI/Generated/JvdmTokens.swift",
  "packages/android/src/main/kotlin/com/jvdm/ui/tokens/Tokens.kt",
  "packages/flutter/lib/src/tokens/tokens.dart",
  "packages/react-native/src/tokens/tokens.ts",
];

const LANGUAGES = {
  ".swift": "swift",
  ".kt": "kotlin",
  ".dart": "dart",
  ".ts": "ts",
  ".tsx": "ts",
};

const RULES = [
  {
    id: "no-comments",
    pattern: /(^|[^:"'/])(\/\/|\/\*)/,
    message: "Code comment. The reason for a decision lives in an ADR. ADR 0002, C3.",
  },
  {
    id: "raw-color",
    pattern:
      /Color\(0x|0x[fF]{2}[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{6}\b|Colors\.[a-z]|Color\.(red|blue|green|grey|gray|orange|yellow|pink|purple|black|white)\b/,
    message: "Raw color. Reach for a semantic token. ADR 0001, R5.",
    skip: /argb|JvdmColorToken|toString\(16\)/,
  },
  {
    id: "raw-dimension",
    pattern:
      /\b(?!1\.dp\b)\d+(\.\d+)?\.(dp|sp)\b|(fontSize|letterSpacing|lineHeight|borderRadius|elevation)\s*[:=]\s*-?\d|borderWidth\s*[:=]\s*(?!1\b)-?\d|EdgeInsets\.(all|only)\(\s*-?\d|(horizontal|vertical|top|bottom|left|right|start|end)\s*:\s*-?\d|BorderRadius\.circular\(\s*-?\d/,
    message: "Dimension outside the scale. Use the spacing, radius or text scale. ADR 0001, R5.",
  },
  {
    id: "raw-motion",
    pattern:
      /Duration\(\s*milliseconds:\s*-?\d|Curves\.[a-z]|duration\s*[:=]\s*-?\d|Cubic\(\s*-?\d/,
    message: "Motion outside the scale. Use the duration and ease scales. ADR 0001, R5.",
  },
];

function walk(folder) {
  let found = [];
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) {
      found = found.concat(walk(path));
    } else if (LANGUAGES[extname(entry.name)]) {
      found.push(path);
    }
  }
  return found;
}

const failures = [];
let scanned = 0;

for (const folder of ROOTS) {
  const absolute = join(root, folder);
  let files = [];
  try {
    files = walk(absolute);
  } catch {
    continue;
  }

  for (const file of files) {
    const name = relative(root, file);
    if (GENERATED.includes(name)) continue;
    scanned += 1;

    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const rule of RULES) {
        if (rule.skip?.test(line)) continue;
        if (!rule.pattern.test(line)) continue;
        failures.push(`${name}:${index + 1}  ${rule.message} (${rule.id})`);
      }
    });
  }
}

process.stdout.write(`check-scales: ${scanned} native source files\n`);

if (failures.length > 0) {
  process.stderr.write(`\n${failures.map((line) => `  ${line}`).join("\n")}\n`);
  process.stderr.write(`\ncheck-scales: ${failures.length} problem(s).\n`);
  process.exit(1);
}

process.stdout.write("check-scales: no raw value and no comment outside the generated files.\n");
