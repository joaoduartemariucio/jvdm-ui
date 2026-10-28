import type { JvdmTokens } from "../../tokens";

export const SLIDER_TRACK = 4;

export const SLIDER_THUMB = 16;

export function sliderRatio(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

export function sliderStyle(
  tokens: JvdmTokens,
  value: number,
  min: number,
  max: number,
  disabled: boolean,
) {
  const ratio = sliderRatio(value, min, max);

  return {
    container: {
      height: tokens.spacing(6),
      justifyContent: "center" as const,
      opacity: disabled ? 0.5 : 1,
      width: "100%" as const,
    },
    track: {
      backgroundColor: tokens.color("raised"),
      borderRadius: SLIDER_TRACK / 2,
      height: SLIDER_TRACK,
      overflow: "hidden" as const,
      width: "100%" as const,
    },
    fill: {
      backgroundColor: tokens.color("accent"),
      height: SLIDER_TRACK,
      width: `${ratio * 100}%` as const,
    },
    thumb: {
      backgroundColor: tokens.color("accent"),
      borderRadius: SLIDER_THUMB / 2,
      height: SLIDER_THUMB,
      left: `${ratio * 100}%` as const,
      marginLeft: -SLIDER_THUMB / 2,
      position: "absolute" as const,
      width: SLIDER_THUMB,
    },
  };
}
