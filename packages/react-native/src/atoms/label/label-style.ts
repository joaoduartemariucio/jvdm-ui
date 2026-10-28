import type { ColorToken, JvdmTokens } from "../../tokens";

export const LABEL_TONES = {
  muted: "ink-muted",
  dim: "ink-dim",
  accent: "accent-ink",
} as const satisfies Record<string, ColorToken>;

export type LabelTone = keyof typeof LABEL_TONES;

export function labelStyle(tokens: JvdmTokens, tone: LabelTone) {
  return {
    label: {
      color: tokens.color(LABEL_TONES[tone]),
      fontSize: tokens.fontSize("2xs"),
      letterSpacing: tokens.letterSpacing("caps", "2xs"),
      lineHeight: tokens.lineHeight("2xs"),
    },
  };
}
