import type { ThemeConfig } from "../types";

export const gavel: ThemeConfig = {
  font: {
    sans: '"Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  colors: {
    app: { light: "oklch(0.972 0.006 255)", dark: "oklch(0.19 0.032 255)" },
    rail: { light: "oklch(0.948 0.009 255)", dark: "oklch(0.15 0.03 255)" },
    panel: { light: "oklch(0.948 0.009 255)", dark: "oklch(0.17 0.03 255)" },
    surface: { light: "oklch(1 0 0)", dark: "oklch(0.235 0.033 255)" },
    field: { light: "oklch(0.985 0.004 255)", dark: "oklch(0.215 0.032 255)" },
    raised: { light: "oklch(0.928 0.011 255)", dark: "oklch(0.3 0.032 255)" },

    line: { light: "oklch(0.902 0.013 255)", dark: "oklch(0.275 0.032 255)" },
    "line-strong": { light: "oklch(0.845 0.018 255)", dark: "oklch(0.35 0.031 255)" },

    ink: { light: "oklch(0.24 0.04 255)", dark: "oklch(0.96 0.008 255)" },
    "ink-soft": { light: "oklch(0.37 0.035 255)", dark: "oklch(0.82 0.015 255)" },
    "ink-muted": { light: "oklch(0.52 0.032 255)", dark: "oklch(0.65 0.022 255)" },
    "ink-dim": { light: "oklch(0.57 0.028 255)", dark: "oklch(0.57 0.025 255)" },

    accent: { light: "oklch(0.56 0.12 74)", dark: "oklch(0.79 0.14 80)" },
    "accent-ink": { light: "oklch(0.47 0.1 72)", dark: "oklch(0.86 0.13 82)" },
    "accent-soft": { light: "oklch(0.94 0.045 82)", dark: "oklch(0.31 0.06 80)" },
    "on-accent": { light: "oklch(1 0 0)", dark: "oklch(0.15 0.03 255)" },
  },
};
