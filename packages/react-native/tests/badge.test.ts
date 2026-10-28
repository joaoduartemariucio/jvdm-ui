import { describe, expect, it } from "vitest";

import { BADGE_TONES, badgeStyle, type BadgeTone } from "../src/atoms/badge/badge-style";
import { darkTokens, lightTokens } from "../src/tokens/theme";

const TONES: BadgeTone[] = ["neutral", "accent", "ok", "warn", "danger", "info"];

describe("the Badge style", () => {
  it("carries the six tones the contract names, in order", () => {
    expect(Object.keys(BADGE_TONES)).toEqual(TONES);
  });

  it("pairs the same tokens the web table pairs", () => {
    expect(BADGE_TONES).toEqual({
      neutral: { background: "raised", foreground: "ink-soft" },
      accent: { background: "accent-soft", foreground: "accent-ink" },
      ok: { background: "ok-soft", foreground: "ok" },
      warn: { background: "warn-soft", foreground: "warn" },
      danger: { background: "danger-soft", foreground: "danger" },
      info: { background: "info-soft", foreground: "info" },
    });
  });

  it("stays on the scale R5 names", () => {
    const style = badgeStyle(lightTokens, "neutral");
    expect(style.container.borderRadius).toBe(lightTokens.radius("xs"));
    expect(style.container.paddingHorizontal).toBe(lightTokens.spacing(2));
    expect(style.container.paddingVertical).toBe(lightTokens.spacing(0.5));
    expect(style.container.gap).toBe(lightTokens.spacing(1));
    expect(style.label.fontSize).toBe(lightTokens.fontSize("2xs"));
    expect(style.label.fontWeight).toBe("500");
  });

  it("repaints every tone when the scheme flips", () => {
    for (const tone of TONES) {
      expect(badgeStyle(lightTokens, tone).container.backgroundColor).not.toBe(
        badgeStyle(darkTokens, tone).container.backgroundColor,
      );
    }
  });

  it("never paints the label in the background color", () => {
    for (const tokens of [lightTokens, darkTokens]) {
      for (const tone of TONES) {
        const style = badgeStyle(tokens, tone);
        expect(style.label.color).not.toBe(style.container.backgroundColor);
      }
    }
  });
});
