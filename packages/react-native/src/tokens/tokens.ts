export type Oklch = { l: number; c: number; h: number; alpha: number };

export type ColorValue = { hex: string; oklch: Oklch };

export type ColorPair = { light: ColorValue; dark: ColorValue };

export type TextSize = { size: number; lineHeight: number };

export type Bezier = [number, number, number, number];

export type ShadowLayer = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: ColorPair;
};

export const COLOR_TOKENS = ["app", "rail", "panel", "surface", "field", "raised", "line", "line-strong", "ink", "ink-soft", "ink-muted", "ink-dim", "accent", "accent-ink", "accent-soft", "on-accent", "ok", "ok-soft", "warn", "warn-soft", "danger", "danger-soft", "info", "info-soft"] as const;

export type ColorToken = (typeof COLOR_TOKENS)[number];

export const TEXT_STEPS = ["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "display"] as const;

export type TextStep = (typeof TEXT_STEPS)[number];

export const TRACKING_STEPS = ["caps", "code", "tight", "display"] as const;

export type TrackingStep = (typeof TRACKING_STEPS)[number];

export const WEIGHT_STEPS = ["normal", "medium", "bold"] as const;

export type WeightStep = (typeof WEIGHT_STEPS)[number];

export const RADIUS_STEPS = ["xs", "sm", "md", "lg", "xl"] as const;

export type RadiusStep = (typeof RADIUS_STEPS)[number];

export const EASE_STEPS = ["out", "in-out", "over"] as const;

export type EaseStep = (typeof EASE_STEPS)[number];

export const DURATION_STEPS = ["instant", "fast", "base", "slow"] as const;

export type DurationStep = (typeof DURATION_STEPS)[number];

export const SHADOW_STEPS = ["raised", "popover", "modal"] as const;

export type ShadowStep = (typeof SHADOW_STEPS)[number];

export const fontSans = ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"];
export const fontMono = ["ui-monospace", "SF Mono", "JetBrains Mono", "Menlo", "Consolas", "monospace"];

export const spacing = 4;

export const colors: Record<ColorToken, ColorPair> = {
  "app": {
    light: { hex: "#f8f3eb", oklch: { l: 0.965, c: 0.012, h: 78, alpha: 1 } },
    dark: { hex: "#15110a", oklch: { l: 0.18, c: 0.015, h: 78, alpha: 1 } },
  },
  "rail": {
    light: { hex: "#f2ece3", oklch: { l: 0.945, c: 0.014, h: 78, alpha: 1 } },
    dark: { hex: "#0f0a04", oklch: { l: 0.15, c: 0.018, h: 78, alpha: 1 } },
  },
  "panel": {
    light: { hex: "#f2eee7", oklch: { l: 0.95, c: 0.01, h: 78, alpha: 1 } },
    dark: { hex: "#130f08", oklch: { l: 0.17, c: 0.016, h: 78, alpha: 1 } },
  },
  "surface": {
    light: { hex: "#fffbf6", oklch: { l: 0.99, c: 0.008, h: 78, alpha: 1 } },
    dark: { hex: "#211c15", oklch: { l: 0.23, c: 0.015, h: 78, alpha: 1 } },
  },
  "field": {
    light: { hex: "#fbf8f3", oklch: { l: 0.98, c: 0.008, h: 78, alpha: 1 } },
    dark: { hex: "#1d1912", oklch: { l: 0.215, c: 0.015, h: 78, alpha: 1 } },
  },
  "raised": {
    light: { hex: "#ece7df", oklch: { l: 0.93, c: 0.012, h: 78, alpha: 1 } },
    dark: { hex: "#332d23", oklch: { l: 0.3, c: 0.02, h: 78, alpha: 1 } },
  },
  "line": {
    light: { hex: "#e0dad0", oklch: { l: 0.89, c: 0.015, h: 78, alpha: 1 } },
    dark: { hex: "#2d271e", oklch: { l: 0.275, c: 0.018, h: 78, alpha: 1 } },
  },
  "line-strong": {
    light: { hex: "#cbc3b7", oklch: { l: 0.82, c: 0.018, h: 78, alpha: 1 } },
    dark: { hex: "#40392f", oklch: { l: 0.35, c: 0.02, h: 78, alpha: 1 } },
  },
  "ink": {
    light: { hex: "#221c12", oklch: { l: 0.23, c: 0.02, h: 78, alpha: 1 } },
    dark: { hex: "#f2eee7", oklch: { l: 0.95, c: 0.01, h: 78, alpha: 1 } },
  },
  "ink-soft": {
    light: { hex: "#423c33", oklch: { l: 0.36, c: 0.018, h: 78, alpha: 1 } },
    dark: { hex: "#cac3b9", oklch: { l: 0.82, c: 0.016, h: 78, alpha: 1 } },
  },
  "ink-muted": {
    light: { hex: "#6b655d", oklch: { l: 0.51, c: 0.014, h: 78, alpha: 1 } },
    dark: { hex: "#938e87", oklch: { l: 0.65, c: 0.012, h: 78, alpha: 1 } },
  },
  "ink-dim": {
    light: { hex: "#78746d", oklch: { l: 0.56, c: 0.012, h: 78, alpha: 1 } },
    dark: { hex: "#7b7770", oklch: { l: 0.57, c: 0.012, h: 78, alpha: 1 } },
  },
  "accent": {
    light: { hex: "#282014", oklch: { l: 0.25, c: 0.025, h: 78, alpha: 1 } },
    dark: { hex: "#f1eae0", oklch: { l: 0.94, c: 0.015, h: 78, alpha: 1 } },
  },
  "accent-ink": {
    light: { hex: "#3c3429", oklch: { l: 0.33, c: 0.022, h: 78, alpha: 1 } },
    dark: { hex: "#dbd3c7", oklch: { l: 0.87, c: 0.018, h: 78, alpha: 1 } },
  },
  "accent-soft": {
    light: { hex: "#eee3d3", oklch: { l: 0.92, c: 0.025, h: 78, alpha: 1 } },
    dark: { hex: "#312a20", oklch: { l: 0.29, c: 0.02, h: 78, alpha: 1 } },
  },
  "on-accent": {
    light: { hex: "#fffbf6", oklch: { l: 0.99, c: 0.008, h: 78, alpha: 1 } },
    dark: { hex: "#120c05", oklch: { l: 0.16, c: 0.018, h: 78, alpha: 1 } },
  },
  "ok": {
    light: { hex: "#007840", oklch: { l: 0.5, c: 0.13, h: 155, alpha: 1 } },
    dark: { hex: "#73ce95", oklch: { l: 0.78, c: 0.12, h: 155, alpha: 1 } },
  },
  "ok-soft": {
    light: { hex: "#d7f4e0", oklch: { l: 0.94, c: 0.04, h: 155, alpha: 1 } },
    dark: { hex: "#143320", oklch: { l: 0.29, c: 0.05, h: 155, alpha: 1 } },
  },
  "warn": {
    light: { hex: "#b36300", oklch: { l: 0.58, c: 0.14, h: 62, alpha: 1 } },
    dark: { hex: "#f6a14f", oklch: { l: 0.78, c: 0.14, h: 62, alpha: 1 } },
  },
  "warn-soft": {
    light: { hex: "#ffe5ca", oklch: { l: 0.94, c: 0.05, h: 62, alpha: 1 } },
    dark: { hex: "#46290b", oklch: { l: 0.31, c: 0.06, h: 62, alpha: 1 } },
  },
  "danger": {
    light: { hex: "#c20028", oklch: { l: 0.51, c: 0.21, h: 22, alpha: 1 } },
    dark: { hex: "#fa686a", oklch: { l: 0.7, c: 0.18, h: 22, alpha: 1 } },
  },
  "danger-soft": {
    light: { hex: "#ffdfdc", oklch: { l: 0.94, c: 0.05, h: 22, alpha: 1 } },
    dark: { hex: "#481b1b", oklch: { l: 0.29, c: 0.07, h: 22, alpha: 1 } },
  },
  "info": {
    light: { hex: "#0465af", oklch: { l: 0.5, c: 0.14, h: 250, alpha: 1 } },
    dark: { hex: "#66abe5", oklch: { l: 0.72, c: 0.11, h: 245, alpha: 1 } },
  },
  "info-soft": {
    light: { hex: "#daeeff", oklch: { l: 0.94, c: 0.035, h: 250, alpha: 1 } },
    dark: { hex: "#102e45", oklch: { l: 0.29, c: 0.055, h: 245, alpha: 1 } },
  },
};

export const text: Record<TextStep, TextSize> = {
  "2xs": { size: 11, lineHeight: 1.45 },
  "xs": { size: 12, lineHeight: 1.45 },
  "sm": { size: 13, lineHeight: 1.5 },
  "base": { size: 15, lineHeight: 1.55 },
  "lg": { size: 18, lineHeight: 1.45 },
  "xl": { size: 23, lineHeight: 1.3 },
  "2xl": { size: 29, lineHeight: 1.2 },
  "display": { size: 58, lineHeight: 0.98 },
};

export const tracking: Record<TrackingStep, number> = {
  "caps": 0.06,
  "code": 0.4,
  "tight": -0.015,
  "display": -0.025,
};

export const weight: Record<WeightStep, number> = {
  "normal": 400,
  "medium": 500,
  "bold": 700,
};

export const radius: Record<RadiusStep, number> = {
  "xs": 3,
  "sm": 5,
  "md": 8,
  "lg": 12,
  "xl": 20,
};

export const ease: Record<EaseStep, Bezier> = {
  "out": [0.16, 1, 0.3, 1],
  "in-out": [0.65, 0, 0.35, 1],
  "over": [0.34, 1.42, 0.64, 1],
};

export const duration: Record<DurationStep, number> = {
  "instant": 90,
  "fast": 160,
  "base": 240,
  "slow": 420,
};

export const shadow: Record<ShadowStep, ShadowLayer[]> = {
  "raised": [
    { x: 0, y: 1, blur: 1, spread: 0, color: {
    light: { hex: "#221c120d", oklch: { l: 0.23, c: 0.02, h: 78, alpha: 0.05 } },
    dark: { hex: "#0000005c", oklch: { l: 0, c: 0, h: 0, alpha: 0.36 } },
  } },
    { x: 0, y: 2, blur: 4, spread: -1, color: {
    light: { hex: "#221c120f", oklch: { l: 0.23, c: 0.02, h: 78, alpha: 0.06 } },
    dark: { hex: "#00000066", oklch: { l: 0, c: 0, h: 0, alpha: 0.4 } },
  } },
  ],
  "popover": [
    { x: 0, y: 2, blur: 4, spread: -2, color: {
    light: { hex: "#221c120f", oklch: { l: 0.23, c: 0.02, h: 78, alpha: 0.06 } },
    dark: { hex: "#00000066", oklch: { l: 0, c: 0, h: 0, alpha: 0.4 } },
  } },
    { x: 0, y: 10, blur: 24, spread: -6, color: {
    light: { hex: "#221c121f", oklch: { l: 0.23, c: 0.02, h: 78, alpha: 0.12 } },
    dark: { hex: "#00000085", oklch: { l: 0, c: 0, h: 0, alpha: 0.52 } },
  } },
  ],
  "modal": [
    { x: 0, y: 4, blur: 10, spread: -4, color: {
    light: { hex: "#221c1214", oklch: { l: 0.23, c: 0.02, h: 78, alpha: 0.08 } },
    dark: { hex: "#00000070", oklch: { l: 0, c: 0, h: 0, alpha: 0.44 } },
  } },
    { x: 0, y: 28, blur: 64, spread: -16, color: {
    light: { hex: "#221c122e", oklch: { l: 0.23, c: 0.02, h: 78, alpha: 0.18 } },
    dark: { hex: "#000000a3", oklch: { l: 0, c: 0, h: 0, alpha: 0.64 } },
  } },
  ],
};
