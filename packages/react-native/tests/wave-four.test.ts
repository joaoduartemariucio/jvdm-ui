import { describe, expect, it } from "vitest";

import { locales as spinnerLocales } from "../src/atoms/spinner/locales";
import { locales as tagLocales } from "../src/atoms/tag/locales";
import {
  PROGRESS_SIZES,
  PROGRESS_TONES,
  progressRatio,
  progressStyle,
  type ProgressSize,
  type ProgressTone,
} from "../src/atoms/progress-bar/progress-style";
import { locales as breadcrumbLocales } from "../src/molecules/breadcrumb/locales";
import { locales as loadErrorLocales } from "../src/molecules/load-error/locales";
import { METRIC_TRENDS, type MetricTrend } from "../src/molecules/metric-card/metric-style";
import { darkTokens, lightTokens } from "../src/tokens/theme";

describe("what a component says on its own", () => {
  it("defaults to English, non-empty", () => {
    expect(spinnerLocales.label).toBe("Loading");
    expect(tagLocales.remove).toBe("Remove");
    expect(breadcrumbLocales.label).toBe("Breadcrumb");
    expect(loadErrorLocales.retry).toBe("Try again");
  });

  it("exports exactly the keys the contract names", () => {
    expect(Object.keys(spinnerLocales)).toEqual(["label"]);
    expect(Object.keys(tagLocales)).toEqual(["remove"]);
    expect(Object.keys(breadcrumbLocales)).toEqual(["label"]);
    expect(Object.keys(loadErrorLocales)).toEqual(["retry"]);
  });

  it("gives every string a value a reader can see", () => {
    for (const bag of [spinnerLocales, tagLocales, breadcrumbLocales, loadErrorLocales]) {
      for (const value of Object.values(bag)) {
        expect(value.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

describe("ProgressBar", () => {
  it("clamps the value to the track", () => {
    expect(progressRatio(0.5)).toBe(0.5);
    expect(progressRatio(-1)).toBe(0);
    expect(progressRatio(9)).toBe(1);
    expect(progressRatio(0)).toBe(0);
    expect(progressRatio(1)).toBe(1);
  });

  it("carries the four tones and two sizes the contract names", () => {
    expect(Object.keys(PROGRESS_TONES)).toEqual(["accent", "ok", "warn", "danger"]);
    expect(Object.keys(PROGRESS_SIZES)).toEqual(["md", "xs"]);
    expect(PROGRESS_SIZES.md).toBe(2);
    expect(PROGRESS_SIZES.xs).toBe(1);
  });

  it("fills to the ratio over a raised track", () => {
    const style = progressStyle(lightTokens, 0.25, "accent", "md", false);
    expect(style.fill.width).toBe("25%");
    expect(style.track.backgroundColor).toBe(lightTokens.color("raised"));
    expect(style.track.height).toBe(8);
  });

  it("dims without repainting", () => {
    for (const tone of Object.keys(PROGRESS_TONES) as ProgressTone[]) {
      for (const size of Object.keys(PROGRESS_SIZES) as ProgressSize[]) {
        const off = progressStyle(darkTokens, 0.5, tone, size, true);
        const on = progressStyle(darkTokens, 0.5, tone, size, false);
        expect(off.track.opacity).toBe(0.5);
        expect(off.fill.backgroundColor).toBe(on.fill.backgroundColor);
      }
    }
  });
});

describe("MetricCard", () => {
  it("colors the change by its trend", () => {
    expect(Object.keys(METRIC_TRENDS)).toEqual(["neutral", "up", "down"]);
    expect(METRIC_TRENDS.up).toBe("ok");
    expect(METRIC_TRENDS.down).toBe("danger");
    expect(METRIC_TRENDS.neutral).toBe("ink-muted");
  });

  it("never paints a trend in the card's own background", () => {
    for (const trend of Object.keys(METRIC_TRENDS) as MetricTrend[]) {
      expect(lightTokens.color(METRIC_TRENDS[trend])).not.toBe(lightTokens.color("surface"));
    }
  });
});
