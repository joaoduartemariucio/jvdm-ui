import type { ColorPair, Oklch, TokenSource } from "./types";

const sand = (l: number, c: number): Oklch => ({ l, c, h: 78 });

const pair = (light: Oklch, dark: Oklch): ColorPair => ({ light, dark });

const shade = (light: number, dark: number): ColorPair =>
  pair({ l: 0.23, c: 0.02, h: 78, alpha: light }, { l: 0, c: 0, h: 0, alpha: dark });

export const source: TokenSource = {
  font: {
    sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    mono: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
  },

  text: {
    "2xs": { size: 11, lineHeight: 1.45 },
    xs: { size: 12, lineHeight: 1.45 },
    sm: { size: 13, lineHeight: 1.5 },
    base: { size: 15, lineHeight: 1.55 },
    lg: { size: 18, lineHeight: 1.45 },
    xl: { size: 23, lineHeight: 1.3 },
    "2xl": { size: 29, lineHeight: 1.2 },
    display: { size: 58, lineHeight: 0.98 },
  },

  spacing: 4,

  tracking: {
    caps: 0.06,
    code: 0.4,
    tight: -0.015,
    display: -0.025,
  },

  weight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },

  radius: {
    xs: 3,
    sm: 5,
    md: 8,
    lg: 12,
    xl: 20,
  },

  ease: {
    out: [0.16, 1, 0.3, 1],
    "in-out": [0.65, 0, 0.35, 1],
    over: [0.34, 1.42, 0.64, 1],
  },

  duration: {
    instant: 90,
    fast: 160,
    base: 240,
    slow: 420,
  },

  colors: [
    {
      app: pair(sand(0.965, 0.012), sand(0.18, 0.015)),
      rail: pair(sand(0.945, 0.014), sand(0.15, 0.018)),
      panel: pair(sand(0.95, 0.01), sand(0.17, 0.016)),
      surface: pair(sand(0.99, 0.008), sand(0.23, 0.015)),
      field: pair(sand(0.98, 0.008), sand(0.215, 0.015)),
      raised: pair(sand(0.93, 0.012), sand(0.3, 0.02)),
    },
    {
      line: pair(sand(0.89, 0.015), sand(0.275, 0.018)),
      "line-strong": pair(sand(0.82, 0.018), sand(0.35, 0.02)),
    },
    {
      ink: pair(sand(0.23, 0.02), sand(0.95, 0.01)),
      "ink-soft": pair(sand(0.36, 0.018), sand(0.82, 0.016)),
      "ink-muted": pair(sand(0.51, 0.014), sand(0.65, 0.012)),
      "ink-dim": pair(sand(0.56, 0.012), sand(0.57, 0.012)),
    },
    {
      accent: pair(sand(0.25, 0.025), sand(0.94, 0.015)),
      "accent-ink": pair(sand(0.33, 0.022), sand(0.87, 0.018)),
      "accent-soft": pair(sand(0.92, 0.025), sand(0.29, 0.02)),
      "on-accent": pair(sand(0.99, 0.008), sand(0.16, 0.018)),
    },
    {
      ok: pair({ l: 0.5, c: 0.13, h: 155 }, { l: 0.78, c: 0.12, h: 155 }),
      "ok-soft": pair({ l: 0.94, c: 0.04, h: 155 }, { l: 0.29, c: 0.05, h: 155 }),
      warn: pair({ l: 0.58, c: 0.14, h: 62 }, { l: 0.78, c: 0.14, h: 62 }),
      "warn-soft": pair({ l: 0.94, c: 0.05, h: 62 }, { l: 0.31, c: 0.06, h: 62 }),
      danger: pair({ l: 0.51, c: 0.21, h: 22 }, { l: 0.7, c: 0.18, h: 22 }),
      "danger-soft": pair({ l: 0.94, c: 0.05, h: 22 }, { l: 0.29, c: 0.07, h: 22 }),
      info: pair({ l: 0.5, c: 0.14, h: 250 }, { l: 0.72, c: 0.11, h: 245 }),
      "info-soft": pair({ l: 0.94, c: 0.035, h: 250 }, { l: 0.29, c: 0.055, h: 245 }),
    },
  ],

  shadow: {
    raised: [
      { x: 0, y: 1, blur: 1, color: shade(0.05, 0.36) },
      { x: 0, y: 2, blur: 4, spread: -1, color: shade(0.06, 0.4) },
    ],
    popover: [
      { x: 0, y: 2, blur: 4, spread: -2, color: shade(0.06, 0.4) },
      { x: 0, y: 10, blur: 24, spread: -6, color: shade(0.12, 0.52) },
    ],
    modal: [
      { x: 0, y: 4, blur: 10, spread: -4, color: shade(0.08, 0.44) },
      { x: 0, y: 28, blur: 64, spread: -16, color: shade(0.18, 0.64) },
    ],
  },
};
