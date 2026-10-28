import { describe, expect, it } from "vitest";

import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  buttonStyle,
  type ButtonSize,
  type ButtonVariant,
} from "../src/atoms/button/button-style";
import { choiceStyle } from "../src/atoms/checkbox/choice-style";
import { CONTROL_SIZES, controlStyle, type ControlSize } from "../src/atoms/input/control-style";
import { LINK_TONES, linkStyle, type LinkTone } from "../src/atoms/link/link-style";
import { sliderRatio, sliderStyle } from "../src/atoms/slider/slider-style";
import {
  SWITCH_INSET,
  SWITCH_THUMB,
  SWITCH_TRACK,
  SWITCH_TRAVEL,
  switchStyle,
  switchThumb,
  switchTrack,
} from "../src/atoms/switch/switch-style";
import { darkTokens, lightTokens } from "../src/tokens/theme";

const VARIANTS = Object.keys(BUTTON_VARIANTS) as ButtonVariant[];
const SIZES = Object.keys(BUTTON_SIZES) as ButtonSize[];

describe("Button", () => {
  it("carries the four variants and five sizes the contract names", () => {
    expect(VARIANTS).toEqual(["primary", "secondary", "ghost", "danger"]);
    expect(SIZES).toEqual(["sm", "md", "lg", "icon", "icon-sm"]);
  });

  it("paints a background for the primary variant alone", () => {
    expect(BUTTON_VARIANTS.primary.background).toBe("accent");
    for (const variant of VARIANTS.filter((name) => name !== "primary")) {
      expect(BUTTON_VARIANTS[variant].background).toBeNull();
    }
  });

  it("keeps every label readable against what it sits on", () => {
    for (const variant of VARIANTS) {
      const style = buttonStyle(lightTokens, variant, "md", false);
      expect(style.label.color).not.toBe(style.container.backgroundColor);
    }
  });

  it("makes the icon sizes square and the rest padded", () => {
    expect(buttonStyle(lightTokens, "ghost", "icon", false).container.width).toBe(40);
    expect(buttonStyle(lightTokens, "ghost", "icon-sm", false).container.height).toBe(32);
    expect(buttonStyle(lightTokens, "ghost", "md", false).container.paddingHorizontal).toBe(16);
    expect(buttonStyle(lightTokens, "ghost", "sm", false).container.paddingVertical).toBe(8);
  });

  it("dims a disabled button rather than repainting it", () => {
    const off = buttonStyle(lightTokens, "primary", "md", true).container;
    const on = buttonStyle(lightTokens, "primary", "md", false).container;
    expect(off.opacity).toBe(0.5);
    expect(off.backgroundColor).toBe(on.backgroundColor);
  });
});

describe("the control family", () => {
  it("pads in whole steps at both sizes", () => {
    expect(Object.keys(CONTROL_SIZES)).toEqual(["sm", "md"]);
    for (const size of Object.keys(CONTROL_SIZES) as ControlSize[]) {
      const field = controlStyle(lightTokens, size, false).field;
      expect(field.paddingHorizontal % 4).toBe(0);
      expect(field.paddingVertical % 4).toBe(0);
    }
  });

  it("borders an invalid field in danger and a valid one in line-strong", () => {
    expect(controlStyle(lightTokens, "md", true).field.borderColor).toBe(
      lightTokens.color("danger"),
    );
    expect(controlStyle(lightTokens, "md", false).field.borderColor).toBe(
      lightTokens.color("line-strong"),
    );
  });
});

describe("Link", () => {
  it("pairs a text and an underline token for each tone", () => {
    expect(Object.keys(LINK_TONES)).toEqual(["accent", "ink", "muted"]);
    for (const tone of Object.keys(LINK_TONES) as LinkTone[]) {
      const style = linkStyle(lightTokens, tone).label;
      expect(style.color).not.toBe(style.textDecorationColor);
      expect(style.textDecorationLine).toBe("underline");
    }
  });
});

describe("Switch", () => {
  it("travels the track minus the thumb and both insets", () => {
    expect(SWITCH_TRACK).toEqual({ width: 40, height: 24 });
    expect(SWITCH_TRAVEL).toBe(SWITCH_TRACK.width - SWITCH_THUMB - SWITCH_INSET * 2);
    expect(SWITCH_TRAVEL).toBe(16);
  });

  it("moves the thumb by exactly the travel", () => {
    const off = switchStyle(lightTokens, false, false).thumb.marginLeft;
    const on = switchStyle(lightTokens, true, false).thumb.marginLeft;
    expect(on - off).toBe(SWITCH_TRAVEL);
  });

  it("keeps the thumb readable against the track in both states", () => {
    for (const checked of [true, false]) {
      expect(switchTrack(checked)).not.toBe(switchThumb(checked));
      const style = switchStyle(darkTokens, checked, false);
      expect(style.thumb.backgroundColor).not.toBe(style.track.backgroundColor);
    }
  });
});

describe("Slider", () => {
  it("clamps the ratio to the track", () => {
    expect(sliderRatio(50, 0, 100)).toBe(0.5);
    expect(sliderRatio(-10, 0, 100)).toBe(0);
    expect(sliderRatio(999, 0, 100)).toBe(1);
    expect(sliderRatio(5, 5, 5)).toBe(0);
    expect(sliderRatio(3, 1, 5)).toBe(0.5);
  });

  it("fills to the ratio and parks the thumb on it", () => {
    const style = sliderStyle(lightTokens, 25, 0, 100, false);
    expect(style.fill.width).toBe("25%");
    expect(style.thumb.left).toBe("25%");
    expect(style.fill.backgroundColor).toBe(lightTokens.color("accent"));
  });
});

describe("Checkbox and Radio", () => {
  it("share one box, 20px, on the spacing scale", () => {
    expect(choiceStyle(lightTokens, false, false).box.width).toBe(20);
    expect(choiceStyle(lightTokens, false, false).row.minHeight).toBe(40);
  });

  it("fill the box only when selected", () => {
    expect(choiceStyle(lightTokens, true, false).box.backgroundColor).toBe(
      lightTokens.color("accent"),
    );
    expect(choiceStyle(lightTokens, false, false).box.backgroundColor).toBe(
      lightTokens.color("field"),
    );
  });
});
