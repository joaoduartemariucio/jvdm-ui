import { describe, expect, it } from "vitest";

import { AVATAR_SIZES, avatarStyle, type AvatarSize } from "../src/atoms/avatar/avatar-style";
import { initials } from "../src/atoms/avatar/initials";
import { CARD_PADDINGS, cardStyle, type CardPadding } from "../src/atoms/card/card-style";
import { dividerStyle } from "../src/atoms/divider/divider-style";
import { formAlertStyle } from "../src/atoms/form-alert/form-alert-style";
import { kbdStyle } from "../src/atoms/kbd/kbd-style";
import { LABEL_TONES, labelStyle, type LabelTone } from "../src/atoms/label/label-style";
import { skeletonStyle } from "../src/atoms/skeleton/skeleton-style";
import { darkTokens, lightTokens } from "../src/tokens/theme";

describe("Avatar", () => {
  it("takes the first and last initial, upper-cased", () => {
    expect(initials("João Vitor Duarte Mariucio")).toBe("JM");
    expect(initials("ada")).toBe("A");
    expect(initials("  grace   hopper  ")).toBe("GH");
    expect(initials("")).toBe("");
    expect(initials("   ")).toBe("");
  });

  it("sizes sit on the scale the web uses", () => {
    expect(Object.values(AVATAR_SIZES).map((size) => size.points)).toEqual([32, 40, 48]);
    expect(Object.values(AVATAR_SIZES).map((size) => size.text)).toEqual(["xs", "sm", "base"]);
  });

  it("draws the circle and the initials from different tokens", () => {
    for (const size of Object.keys(AVATAR_SIZES) as AvatarSize[]) {
      const style = avatarStyle(lightTokens, size);
      expect(style.container.backgroundColor).not.toBe(style.label.color);
      expect(style.container.borderRadius).toBe(lightTokens.radius("md"));
    }
  });
});

describe("Card", () => {
  it("pads in whole steps of the spacing scale", () => {
    expect(Object.values(CARD_PADDINGS)).toEqual([0, 4, 5, 6]);
    for (const padding of Object.keys(CARD_PADDINGS) as CardPadding[]) {
      expect(cardStyle(lightTokens, padding).container.padding % 4).toBe(0);
    }
  });

  it("is a surface with a line border", () => {
    const style = cardStyle(lightTokens, "md").container;
    expect(style.backgroundColor).toBe(lightTokens.color("surface"));
    expect(style.borderColor).toBe(lightTokens.color("line"));
    expect(style.padding).toBe(20);
  });
});

describe("Label", () => {
  it("carries the three tones the contract names", () => {
    expect(Object.keys(LABEL_TONES)).toEqual(["muted", "dim", "accent"]);
    expect(Object.values(LABEL_TONES)).toEqual(["ink-muted", "ink-dim", "accent-ink"]);
  });

  it("tracks caps at the 2xs step", () => {
    for (const tone of Object.keys(LABEL_TONES) as LabelTone[]) {
      const style = labelStyle(lightTokens, tone).label;
      expect(style.fontSize).toBe(11);
      expect(style.letterSpacing).toBeCloseTo(0.06 * 11, 5);
    }
  });
});

describe("the rest of the wave", () => {
  it("paints the alert in the danger pair", () => {
    const style = formAlertStyle(lightTokens);
    expect(style.container.backgroundColor).toBe(lightTokens.color("danger-soft"));
    expect(style.label.color).toBe(lightTokens.color("danger"));
  });

  it("gives the key cap a mono face and a strong border", () => {
    const style = kbdStyle(lightTokens);
    expect(style.label.fontFamily).toBe(lightTokens.monoFamily);
    expect(style.container.borderColor).toBe(lightTokens.color("line-strong"));
    expect(style.container.minWidth).toBe(24);
  });

  it("rules the divider at one pixel of line in both directions", () => {
    const style = dividerStyle(lightTokens);
    expect(style.rule.height).toBe(1);
    expect(style.vertical.width).toBe(1);
    expect(style.rule.backgroundColor).toBe(lightTokens.color("line"));
  });

  it("pulses the skeleton on the motion scale", () => {
    expect(skeletonStyle(lightTokens).duration).toBe(lightTokens.duration("slow"));
    expect(skeletonStyle(lightTokens).container.borderRadius).toBe(lightTokens.radius("sm"));
  });

  it("repaints every piece when the scheme flips", () => {
    expect(cardStyle(lightTokens, "md").container.backgroundColor).not.toBe(
      cardStyle(darkTokens, "md").container.backgroundColor,
    );
    expect(kbdStyle(lightTokens).label.color).not.toBe(kbdStyle(darkTokens).label.color);
    expect(formAlertStyle(lightTokens).label.color).not.toBe(
      formAlertStyle(darkTokens).label.color,
    );
  });
});
