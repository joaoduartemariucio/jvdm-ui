import type { ColorToken, JvdmTokens } from "../../tokens";

export const NOTICE_TONES = {
  info: { foreground: "info", background: "info-soft" },
  ok: { foreground: "ok", background: "ok-soft" },
  warn: { foreground: "warn", background: "warn-soft" },
  danger: { foreground: "danger", background: "danger-soft" },
} as const satisfies Record<string, { foreground: ColorToken; background: ColorToken }>;

export type NoticeTone = keyof typeof NOTICE_TONES;

export const NOTICE_BORDER_OPACITY = 0.4;

export function noticeStyle(tokens: JvdmTokens, tone: NoticeTone) {
  const pair = NOTICE_TONES[tone];

  return {
    container: {
      backgroundColor: tokens.color(pair.background),
      borderColor: tokens.color(pair.foreground),
      borderRadius: tokens.radius("md"),
      borderWidth: 1,
      opacity: 1,
      paddingHorizontal: tokens.spacing(4),
      paddingVertical: tokens.spacing(3),
    },
    title: {
      color: tokens.color(pair.foreground),
      fontSize: tokens.fontSize("sm"),
      fontWeight: tokens.fontWeight("medium"),
      lineHeight: tokens.lineHeight("sm"),
    },
    body: {
      color: tokens.color(pair.foreground),
      opacity: 0.8,
    },
  };
}
