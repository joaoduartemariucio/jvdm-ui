import { readFileSync } from "node:fs";

const LEVELS = ["patch", "minor", "major"];

const PLATFORMS = {
  web: { manifest: "../packages/web/package.json", tag: "v", read: readJsonVersion },
  "react-native": {
    manifest: "../packages/react-native/package.json",
    tag: "rn-v",
    read: readJsonVersion,
  },
  ios: { manifest: "../packages/ios/contract.json", tag: "ios-", read: readSwiftVersion },
  android: {
    manifest: "../packages/android/build.gradle.kts",
    tag: "android-",
    read: readGradleVersion,
  },
  flutter: { manifest: "../packages/flutter/pubspec.yaml", tag: "flutter-", read: readYamlVersion },
};

function contents(manifest) {
  return readFileSync(new URL(manifest, import.meta.url), "utf8");
}

function readJsonVersion(manifest) {
  return JSON.parse(contents(manifest)).version;
}

function readGradleVersion(manifest) {
  return contents(manifest).match(/^version\s*=\s*"([^"]+)"/m)?.[1];
}

function readYamlVersion(manifest) {
  return contents(manifest).match(/^version:\s*(\S+)/m)?.[1];
}

function readSwiftVersion(manifest) {
  return JSON.parse(contents(manifest)).version;
}

const requested = process.argv.includes("--platform")
  ? process.argv[process.argv.indexOf("--platform") + 1]
  : "web";

const platform = PLATFORMS[requested];

if (!platform) {
  process.stderr.write(
    `next-version: unknown platform "${requested}". One of ${Object.keys(PLATFORMS).join(", ")}.\n`,
  );
  process.exit(1);
}

function currentVersion() {
  const version = platform.read(platform.manifest);
  if (!version) {
    process.stderr.write(`next-version: no version in ${platform.manifest}\n`);
    process.exit(1);
  }
  return version;
}

function labelNames(raw) {
  let labels;
  try {
    labels = JSON.parse(raw || "[]");
  } catch {
    labels = [];
  }

  return labels
    .map((label) => (typeof label === "string" ? label : label?.name))
    .filter(Boolean)
    .map((name) => name.toLowerCase().replace(/^release:/, ""));
}

function fromTitle(title) {
  if (!title) return null;
  if (/^[a-z]+(\([^)]*\))?!:/i.test(title)) return "major";
  if (/breaking[ -]change/i.test(title)) return "major";
  if (/^feat(\([^)]*\))?:/i.test(title)) return "minor";
  return null;
}

function bumpVersion(version, level) {
  const [major, minor, patch] = version.split(".").map(Number);
  if (level === "major") return `${major + 1}.0.0`;
  if (level === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

const names = labelNames(process.env.PR_LABELS);

if (names.some((name) => name === "no-release" || name === "skip-release")) {
  const held = currentVersion();
  process.stdout.write(
    `platform=${requested}\ntag=${platform.tag}${held}\ncurrent=${held}\nlevel=none\nsource=label\nnext=${held}\n`,
  );
  process.exit(0);
}

const labelled = names.filter((name) => LEVELS.includes(name));

if (labelled.length > 1) {
  process.stderr.write(
    `next-version: conflicting release labels (${labelled.join(", ")}). Keep exactly one.\n`,
  );
  process.exit(1);
}

const source =
  labelled.length === 1 ? "label" : fromTitle(process.env.PR_TITLE) ? "title" : "default";
const level = labelled[0] ?? fromTitle(process.env.PR_TITLE) ?? "patch";

const current = currentVersion();
const next = bumpVersion(current, level);

process.stdout.write(
  `platform=${requested}\ntag=${platform.tag}${next}\ncurrent=${current}\nlevel=${level}\nsource=${source}\nnext=${next}\n`,
);
