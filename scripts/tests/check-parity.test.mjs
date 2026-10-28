import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";

const CHECKER = resolve(import.meta.dirname, "../check-parity.mjs");

const BADGE = {
  name: "Badge",
  contract: "badge",
  layer: "atoms",
  source: "atoms/badge/index.tsx",
  props: [
    { name: "tone", optional: true, type: "BadgeTone", values: ["neutral", "danger"] },
    { name: "children", optional: false, type: "ReactNode", slot: true },
    { name: "className", optional: true, type: "string", inherited: true },
  ],
  locales: [],
};

function fixture(files) {
  const root = mkdtempSync(join(tmpdir(), "parity-"));

  const base = {
    "contracts/platforms.json": {
      platforms: [
        { id: "web", label: "React web", package: "packages/web", source: true },
        { id: "ios", label: "iOS", package: "packages/ios" },
      ],
    },
    "contracts/index.json": {
      components: [{ name: "Badge", contract: "badge", layer: "atoms", source: BADGE.source }],
    },
    "contracts/atoms/badge.json": BADGE,
  };

  for (const [path, contents] of Object.entries({ ...base, ...files })) {
    const target = join(root, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, typeof contents === "string" ? contents : JSON.stringify(contents));
  }

  return root;
}

const run = (root) => spawnSync(process.execPath, [CHECKER, "--root", root], { encoding: "utf8" });

const implemented = (props) => ({
  "packages/ios/contract.json": {
    implements: [{ contract: "atoms/badge", file: "Sources/Badge.swift", props }],
  },
  "packages/ios/Sources/Badge.swift": "struct Badge {}\n",
});

test("a waived contract passes", () => {
  const root = fixture({
    "contracts/waivers.json": { ios: { owner: "x", reason: "y", contracts: ["atoms/badge"] } },
  });
  assert.equal(run(root).status, 0);
});

test("a contract that is neither implemented nor waived fails", () => {
  const result = run(fixture({}));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /atoms\/badge is neither implemented nor waived/);
});

test("a platform missing a prop fails", () => {
  const result = run(fixture(implemented([{ name: "tone", values: ["neutral", "danger"] }])));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing prop `children`/);
});

test("a platform inventing a prop fails", () => {
  const result = run(
    fixture(
      implemented([
        { name: "tone", values: ["neutral", "danger"] },
        { name: "children" },
        { name: "elevation" },
      ]),
    ),
  );
  assert.equal(result.status, 1);
  assert.match(result.stderr, /adds prop `elevation`/);
});

test("a platform with a different variant set fails", () => {
  const result = run(
    fixture(
      implemented([{ name: "tone", values: ["neutral", "danger", "ok"] }, { name: "children" }]),
    ),
  );
  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /has \[danger, neutral, ok\], the web contract has \[danger, neutral\]/,
  );
});

test("a declared file that does not exist fails", () => {
  const root = fixture({
    "packages/ios/contract.json": {
      implements: [
        {
          contract: "atoms/badge",
          file: "Sources/Missing.swift",
          props: [{ name: "tone", values: ["neutral", "danger"] }, { name: "children" }],
        },
      ],
    },
  });
  const result = run(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /points at Sources\/Missing\.swift, which does not exist/);
});

test("a stale waiver fails", () => {
  const root = fixture({
    ...implemented([{ name: "tone", values: ["neutral", "danger"] }, { name: "children" }]),
    "contracts/waivers.json": { ios: { owner: "x", reason: "y", contracts: ["atoms/badge"] } },
  });
  const result = run(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /implemented and still waived/);
});

test("a waiver for an unknown contract fails", () => {
  const root = fixture({
    "contracts/waivers.json": {
      ios: { owner: "x", reason: "y", contracts: ["atoms/badge", "atoms/ghost"] },
    },
  });
  const result = run(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /waiver for atoms\/ghost, which is not a web contract/);
});

test("a fully implemented platform passes", () => {
  const root = fixture(
    implemented([{ name: "tone", values: ["neutral", "danger"] }, { name: "children" }]),
  );
  assert.equal(run(root).status, 0);
});

test("a platform missing a string the component says on its own fails", () => {
  const root = fixture({
    "contracts/atoms/badge.json": { ...BADGE, locales: [{ key: "remove" }] },
    ...implemented([{ name: "tone", values: ["neutral", "danger"] }, { name: "children" }]),
  });
  const result = run(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /says \[\] on its own, the web contract says \[remove\]/);
});

test("a platform inventing a string of its own fails", () => {
  const root = fixture({
    "packages/ios/contract.json": {
      implements: [
        {
          contract: "atoms/badge",
          file: "Sources/Badge.swift",
          props: [{ name: "tone", values: ["neutral", "danger"] }, { name: "children" }],
          locales: ["shout"],
        },
      ],
    },
    "packages/ios/Sources/Badge.swift": "struct Badge {}\n",
  });
  const result = run(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /says \[shout\] on its own, the web contract says \[\]/);
});

test("matching locale keys pass", () => {
  const root = fixture({
    "contracts/atoms/badge.json": { ...BADGE, locales: [{ key: "remove" }] },
    "packages/ios/contract.json": {
      implements: [
        {
          contract: "atoms/badge",
          file: "Sources/Badge.swift",
          props: [{ name: "tone", values: ["neutral", "danger"] }, { name: "children" }],
          locales: ["remove"],
        },
      ],
    },
    "packages/ios/Sources/Badge.swift": "struct Badge {}\n",
  });
  assert.equal(run(root).status, 0);
});
