import type { JvdmTokens } from "../../tokens";

export const CONTROL_SIZES = {
  sm: { horizontal: 3, vertical: 2 },
  md: { horizontal: 4, vertical: 3 },
} as const;

export type ControlSize = keyof typeof CONTROL_SIZES;

export function controlStyle(tokens: JvdmTokens, size: ControlSize, invalid: boolean) {
  const step = CONTROL_SIZES[size];

  return {
    field: {
      backgroundColor: tokens.color("field"),
      borderColor: tokens.color(invalid ? "danger" : "line-strong"),
      borderRadius: tokens.radius("md"),
      borderWidth: 1,
      color: tokens.color("ink"),
      fontSize: tokens.fontSize("sm"),
      paddingHorizontal: tokens.spacing(step.horizontal),
      paddingVertical: tokens.spacing(step.vertical),
      width: "100%" as const,
    },
  };
}
