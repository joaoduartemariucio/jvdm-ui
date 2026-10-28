import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";

const ROOT = resolve(import.meta.dirname, "../..");
const EXTRACTOR = join(ROOT, "scripts/extract-contract.mjs");

function walk(folder) {
  return readdirSync(folder, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name).slice(folder.length + 1))
    .sort();
}

test("re-extracting leaves the ledger alone", () => {
  const before = readdirSync(join(ROOT, "contracts")).sort();

  const result = spawnSync(process.execPath, [EXTRACTOR], { cwd: ROOT, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);

  assert.deepEqual(readdirSync(join(ROOT, "contracts")).sort(), before);
  assert.ok(before.includes("platforms.json"));
  assert.ok(before.includes("waivers.json"));
});

test("the committed contracts are what the web source says today", () => {
  const out = mkdtempSync(join(tmpdir(), "contracts-"));

  const result = spawnSync(process.execPath, [EXTRACTOR, "--out", out], {
    cwd: ROOT,
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);

  const committed = join(ROOT, "contracts");
  const fresh = walk(out);

  assert.deepEqual(
    fresh,
    walk(committed).filter((name) => name !== "waivers.json" && name !== "platforms.json"),
  );

  for (const name of fresh) {
    assert.equal(
      readFileSync(join(out, name), "utf8"),
      readFileSync(join(committed, name), "utf8"),
      `contracts/${name} is stale — run npm run contracts`,
    );
  }
});
