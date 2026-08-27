import { readFileSync } from "node:fs";

const LEVELS = ["patch", "minor", "major"];

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
  const held = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  ).version;
  process.stdout.write(`current=${held}\nlevel=none\nsource=label\nnext=${held}\n`);
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

const current = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
).version;
const next = bumpVersion(current, level);

process.stdout.write(`current=${current}\nlevel=${level}\nsource=${source}\nnext=${next}\n`);
