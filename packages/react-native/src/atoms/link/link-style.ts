import type { ColorToken, JvdmTokens } from "../../tokens";

export const LINK_TONES = {
  accent: { color: "accent-ink", underline: "accent" },
  ink: { color: "ink", underline: "line-strong" },
  muted: { color: "ink-muted", underline: "line" },
} as const satisfies Record<string, { color: ColorToken; underline: ColorToken }>;

export type LinkTone = keyof typeof LINK_TONES;

export function linkStyle(tokens: JvdmTokens, tone: LinkTone) {
  const pair = LINK_TONES[tone];

  return {
    label: {
      color: tokens.color(pair.color),
      fontSize: tokens.fontSize("sm"),
      lineHeight: tokens.lineHeight("sm"),
      textDecorationColor: tokens.color(pair.underline),
      textDecorationLine: "underline" as const,
    },
  };
}
