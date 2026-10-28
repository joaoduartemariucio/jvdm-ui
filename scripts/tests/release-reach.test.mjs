import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";
import { test } from "node:test";

const ROOT = resolve(import.meta.dirname, "../..");
const REACH = join(ROOT, "scripts/release-reach.mjs");
const VERSION = join(ROOT, "scripts/next-version.mjs");

const reach = (env) =>
  JSON.parse(
    spawnSync(process.execPath, [REACH], {
      cwd: ROOT,
      encoding: "utf8",
      env: { ...process.env, ...env },
    })
      .stdout.trim()
      .replace("platforms=", ""),
  );

const version = (platform, env = {}) => {
  const result = spawnSync(process.execPath, [VERSION, "--platform", platform], {
    cwd: ROOT,
    encoding: "utf8",
    env: { ...process.env, PR_LABELS: "", PR_TITLE: "", ...env },
  });
  return Object.fromEntries(
    result.stdout
      .trim()
      .split("\n")
      .map((line) => line.split("=")),
  );
};

test("a change to one platform reaches only that platform", () => {
  assert.deepEqual(reach({ PR_FILES: '["packages/flutter/lib/src/atoms/badge/badge.dart"]' }), [
    "flutter",
  ]);
  assert.deepEqual(reach({ PR_FILES: '["Package.swift"]' }), ["ios"]);
});

test("a change to the token source reaches every platform", () => {
  assert.deepEqual(reach({ PR_FILES: '["packages/tokens/src/source.ts"]' }), [
    "web",
    "react-native",
    "ios",
    "android",
    "flutter",
  ]);
});

test("a change to the contracts reaches every platform", () => {
  assert.deepEqual(reach({ PR_FILES: '["contracts/atoms/badge.json"]' }).length, 5);
});

test("a platform label overrides what the paths say", () => {
  assert.deepEqual(
    reach({ PR_LABELS: '[{"name":"platform:android"}]', PR_FILES: '["packages/web/src/x.ts"]' }),
    ["android"],
  );
});

test("no-release reaches nothing", () => {
  assert.deepEqual(
    reach({ PR_LABELS: '[{"name":"no-release"}]', PR_FILES: '["packages/web/x"]' }),
    [],
  );
});

test("a change to nothing released reaches nothing", () => {
  assert.deepEqual(reach({ PR_FILES: '["README.md","docs/adr/0011-platform-scaffolds.md"]' }), []);
});

test("every platform has a readable version and its own tag prefix", () => {
  const prefixes = {
    web: "v",
    "react-native": "rn-v",
    ios: "ios-",
    android: "android-",
    flutter: "flutter-",
  };

  for (const [platform, prefix] of Object.entries(prefixes)) {
    const out = version(platform, { PR_TITLE: "feat: something" });
    assert.match(out.current, /^\d+\.\d+\.\d+$/, platform);
    assert.equal(out.level, "minor", platform);
    assert.equal(out.tag, `${prefix}${out.next}`, platform);
  }
});

test("the tags of two platforms never collide", () => {
  const tags = ["web", "react-native", "ios", "android", "flutter"].map(
    (platform) => version(platform, { PR_TITLE: "fix: x" }).tag,
  );
  assert.equal(new Set(tags).size, tags.length);
});

test("an unknown platform fails rather than defaulting to web", () => {
  const result = spawnSync(process.execPath, [VERSION, "--platform", "windows"], {
    cwd: ROOT,
    encoding: "utf8",
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /unknown platform/);
});
