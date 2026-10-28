import type { ColorToken, JvdmTokens } from "../../tokens";

export const BADGE_TONES = {
  neutral: { background: "raised", foreground: "ink-soft" },
  accent: { background: "accent-soft", foreground: "accent-ink" },
  ok: { background: "ok-soft", foreground: "ok" },
  warn: { background: "warn-soft", foreground: "warn" },
  danger: { background: "danger-soft", foreground: "danger" },
  info: { background: "info-soft", foreground: "info" },
} as const satisfies Record<string, { background: ColorToken; foreground: ColorToken }>;

export type BadgeTone = keyof typeof BADGE_TONES;

export function badgeStyle(tokens: JvdmTokens, tone: BadgeTone) {
  const pair = BADGE_TONES[tone];

  return {
    container: {
      alignItems: "center" as const,
      alignSelf: "flex-start" as const,
      backgroundColor: tokens.color(pair.background),
      borderRadius: tokens.radius("xs"),
      flexDirection: "row" as const,
      gap: tokens.spacing(1),
      paddingHorizontal: tokens.spacing(2),
      paddingVertical: tokens.spacing(0.5),
    },
    label: {
      color: tokens.color(pair.foreground),
      fontSize: tokens.fontSize("2xs"),
      fontWeight: tokens.fontWeight("medium"),
      lineHeight: tokens.lineHeight("2xs"),
    },
  };
}
