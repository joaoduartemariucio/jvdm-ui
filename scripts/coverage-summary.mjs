import { appendFileSync, existsSync, readFileSync } from "node:fs";

const summaryPath = "coverage/coverage-summary.json";
const outputPath = process.env.GITHUB_STEP_SUMMARY;

if (outputPath && existsSync(summaryPath)) {
  const { total } = JSON.parse(readFileSync(summaryPath, "utf8"));
  const rows = Object.entries(total).map(
    ([metric, values]) => `| ${metric} | ${values.covered} | ${values.total} | ${values.pct}% |`,
  );
  appendFileSync(
    outputPath,
    [
      "## Test coverage",
      "",
      "| Metric | Covered | Total | Percentage |",
      "| --- | ---: | ---: | ---: |",
      ...rows,
      "",
    ].join("\n"),
  );
}
