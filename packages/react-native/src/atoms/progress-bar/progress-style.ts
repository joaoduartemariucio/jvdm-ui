import type { ColorToken, JvdmTokens } from "../../tokens";

export const PROGRESS_TONES = {
  accent: "accent",
  ok: "ok",
  warn: "warn",
  danger: "danger",
} as const satisfies Record<string, ColorToken>;

export type ProgressTone = keyof typeof PROGRESS_TONES;

export const PROGRESS_SIZES = { md: 2, xs: 1 } as const;

export type ProgressSize = keyof typeof PROGRESS_SIZES;

export const progressRatio = (value: number): number => Math.min(1, Math.max(0, value));

export function progressStyle(
  tokens: JvdmTokens,
  value: number,
  tone: ProgressTone,
  size: ProgressSize,
  dim: boolean,
) {
  const height = tokens.spacing(PROGRESS_SIZES[size]);

  return {
    track: {
      backgroundColor: tokens.color("raised"),
      borderRadius: height / 2,
      height,
      opacity: dim ? 0.5 : 1,
      overflow: "hidden" as const,
      width: "100%" as const,
    },
    fill: {
      backgroundColor: tokens.color(PROGRESS_TONES[tone]),
      height,
      width: `${progressRatio(value) * 100}%` as const,
    },
  };
}
