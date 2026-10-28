export const COLOR_TOKENS = [
  "app",
  "rail",
  "panel",
  "surface",
  "field",
  "raised",
  "line",
  "line-strong",
  "ink",
  "ink-soft",
  "ink-muted",
  "ink-dim",
  "accent",
  "accent-ink",
  "accent-soft",
  "on-accent",
  "ok",
  "ok-soft",
  "warn",
  "warn-soft",
  "danger",
  "danger-soft",
  "info",
  "info-soft",
] as const;

export const TEXT_STEPS = ["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "display"] as const;

export const TRACKING_STEPS = ["caps", "code", "tight", "display"] as const;

export const WEIGHT_STEPS = ["normal", "medium", "bold"] as const;

export const RADIUS_STEPS = ["xs", "sm", "md", "lg", "xl"] as const;

export const SHADOW_STEPS = ["raised", "popover", "modal"] as const;

export const EASE_STEPS = ["out", "in-out", "over"] as const;

export const DURATION_STEPS = ["instant", "fast", "base", "slow"] as const;

export const FONT_FAMILIES = ["sans", "mono"] as const;

export type ColorToken = (typeof COLOR_TOKENS)[number];
export type TextStep = (typeof TEXT_STEPS)[number];
export type TrackingStep = (typeof TRACKING_STEPS)[number];
export type WeightStep = (typeof WEIGHT_STEPS)[number];
export type RadiusStep = (typeof RADIUS_STEPS)[number];
export type ShadowStep = (typeof SHADOW_STEPS)[number];
export type EaseStep = (typeof EASE_STEPS)[number];
export type DurationStep = (typeof DURATION_STEPS)[number];
export type FontFamily = (typeof FONT_FAMILIES)[number];

export type Oklch = { l: number; c: number; h: number; alpha?: number };

export type ColorPair = { light: Oklch; dark: Oklch };

export type ColorGroup = Partial<Record<ColorToken, ColorPair>>;

export type TextSize = { size: number; lineHeight: number };

export type ShadowLayer = {
  x: number;
  y: number;
  blur: number;
  spread?: number;
  color: ColorPair;
};

export type Ease = readonly [number, number, number, number];

export type TokenSource = {
  font: Record<FontFamily, string>;
  text: Record<TextStep, TextSize>;
  spacing: number;
  tracking: Record<TrackingStep, number>;
  weight: Record<WeightStep, number>;
  radius: Record<RadiusStep, number>;
  ease: Record<EaseStep, Ease>;
  duration: Record<DurationStep, number>;
  colors: readonly ColorGroup[];
  shadow: Record<ShadowStep, readonly ShadowLayer[]>;
};
