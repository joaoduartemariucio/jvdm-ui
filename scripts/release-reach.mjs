const PLATFORM_PATHS = {
  web: ["packages/web/"],
  "react-native": ["packages/react-native/"],
  ios: ["packages/ios/", "Package.swift"],
  android: ["packages/android/"],
  flutter: ["packages/flutter/"],
};

const SHARED = ["packages/tokens/", "contracts/", "scripts/"];

function parse(raw) {
  try {
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

const labels = parse(process.env.PR_LABELS)
  .map((label) => (typeof label === "string" ? label : label?.name))
  .filter(Boolean)
  .map((name) => name.toLowerCase());

const declared = Object.keys(PLATFORM_PATHS).filter((platform) =>
  labels.includes(`platform:${platform}`),
);

const files = parse(process.env.PR_FILES);

const touchedShared = files.some((file) => SHARED.some((prefix) => file.startsWith(prefix)));

const inferred = touchedShared
  ? Object.keys(PLATFORM_PATHS)
  : Object.entries(PLATFORM_PATHS)
      .filter(([, prefixes]) => files.some((file) => prefixes.some((p) => file.startsWith(p))))
      .map(([platform]) => platform);

const reached = labels.includes("no-release") ? [] : declared.length > 0 ? declared : inferred;

process.stdout.write(`platforms=${JSON.stringify(reached)}\n`);
