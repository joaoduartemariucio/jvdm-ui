import type { ColorToken, JvdmTokens } from "../../tokens";

export const SWITCH_TRACK = { width: 40, height: 24 } as const;

export const SWITCH_THUMB = 16;

export const SWITCH_INSET = 4;

export const SWITCH_TRAVEL = SWITCH_TRACK.width - SWITCH_THUMB - SWITCH_INSET * 2;

export const switchTrack = (checked: boolean): ColorToken => (checked ? "accent" : "raised");

export const switchThumb = (checked: boolean): ColorToken => (checked ? "on-accent" : "ink");

export function switchStyle(tokens: JvdmTokens, checked: boolean, disabled: boolean) {
  return {
    row: {
      alignItems: "center" as const,
      flexDirection: "row" as const,
      gap: tokens.spacing(3),
      minHeight: tokens.spacing(10),
      opacity: disabled ? 0.5 : 1,
    },
    track: {
      backgroundColor: tokens.color(switchTrack(checked)),
      borderRadius: SWITCH_TRACK.height / 2,
      height: SWITCH_TRACK.height,
      justifyContent: "center" as const,
      width: SWITCH_TRACK.width,
    },
    thumb: {
      backgroundColor: tokens.color(switchThumb(checked)),
      borderRadius: SWITCH_THUMB / 2,
      height: SWITCH_THUMB,
      marginLeft: checked ? SWITCH_INSET + SWITCH_TRAVEL : SWITCH_INSET,
      width: SWITCH_THUMB,
    },
    label: {
      color: tokens.color("ink-soft"),
      fontSize: tokens.fontSize("sm"),
      lineHeight: tokens.lineHeight("sm"),
    },
  };
}
