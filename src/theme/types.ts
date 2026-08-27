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

export type ColorValue = string | { light: string; dark: string };

export type ThemeConfig = {
  colors?: { [K in ColorToken]?: ColorValue } & { [key: string]: ColorValue | undefined };
  font?: { sans?: string; mono?: string };
  text?: { [K in TextStep]?: string | [string, string | number] };
  spacing?: string;
  tracking?: { caps?: string; code?: string };
  weight?: { [K in WeightStep]?: number };
  radius?: { [K in RadiusStep]?: string };
};
