export type ColorToken =
  | "app"
  | "rail"
  | "panel"
  | "surface"
  | "field"
  | "raised"
  | "line"
  | "line-strong"
  | "ink"
  | "ink-soft"
  | "ink-muted"
  | "ink-dim"
  | "accent"
  | "accent-ink"
  | "accent-soft"
  | "on-accent"
  | "ok"
  | "ok-soft"
  | "warn"
  | "warn-soft"
  | "danger"
  | "danger-soft"
  | "info"
  | "info-soft";

export type TextStep = "2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "display";

export type RadiusStep = "xs" | "sm" | "md" | "lg" | "xl";

export type WeightStep = "normal" | "medium" | "bold";

export type TrackingStep = "caps" | "code" | "tight" | "display";

export type ShadowStep = "raised" | "popover" | "modal";

export type EaseStep = "out" | "in-out" | "over";

export type DurationStep = "instant" | "fast" | "base" | "slow";

export type ColorValue = string | { light: string; dark: string };

export type TypographyConfig = {
  font?: { sans?: string; mono?: string };
  text?: { [K in TextStep]?: string | [string, string | number] };
  tracking?: { [K in TrackingStep]?: string };
  weight?: { [K in WeightStep]?: number };
};

export type TokenConfig = {
  spacing?: string;
  radius?: { [K in RadiusStep]?: string };
  shadow?: { [K in ShadowStep]?: string };
  ease?: { [K in EaseStep]?: string };
  duration?: { [K in DurationStep]?: string };
};

export type ThemeConfig = {
  colors?: { [K in ColorToken]?: ColorValue } & { [key: string]: ColorValue | undefined };
  typography?: TypographyConfig;
  tokens?: TokenConfig;
};
