import type { ColorToken, JvdmTokens, TextStep, WeightStep } from "../../tokens";

export const BUTTON_VARIANTS = {
  primary: { background: "accent", foreground: "on-accent", border: null, weight: "medium" },
  secondary: { background: null, foreground: "ink", border: "line-strong", weight: "normal" },
  ghost: { background: null, foreground: "ink-muted", border: null, weight: "normal" },
  danger: { background: null, foreground: "danger", border: "danger", weight: "normal" },
} as const satisfies Record<
  string,
  {
    background: ColorToken | null;
    foreground: ColorToken;
    border: ColorToken | null;
    weight: WeightStep;
  }
>;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;

export const BUTTON_SIZES = {
  sm: { horizontal: 3, vertical: 2, square: null, text: "xs" },
  md: { horizontal: 4, vertical: 3, square: null, text: "sm" },
  lg: { horizontal: 4, vertical: 4, square: null, text: "base" },
  icon: { horizontal: 0, vertical: 0, square: 40, text: "sm" },
  "icon-sm": { horizontal: 0, vertical: 0, square: 32, text: "sm" },
} as const satisfies Record<
  string,
  { horizontal: number; vertical: number; square: number | null; text: TextStep }
>;

export type ButtonSize = keyof typeof BUTTON_SIZES;

export function buttonStyle(
  tokens: JvdmTokens,
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
) {
  const paint = BUTTON_VARIANTS[variant];
  const step = BUTTON_SIZES[size];

  return {
    container: {
      alignItems: "center" as const,
      alignSelf: "flex-start" as const,
      backgroundColor: paint.background ? tokens.color(paint.background) : "transparent",
      borderColor: paint.border ? tokens.color(paint.border) : "transparent",
      borderRadius: tokens.radius("md"),
      borderWidth: 1,
      flexDirection: "row" as const,
      gap: tokens.spacing(2),
      justifyContent: "center" as const,
      opacity: disabled ? 0.5 : 1,
      paddingHorizontal: tokens.spacing(step.horizontal),
      paddingVertical: tokens.spacing(step.vertical),
      ...(step.square === null ? {} : { height: step.square, width: step.square }),
    },
    label: {
      color: tokens.color(paint.foreground),
      fontSize: tokens.fontSize(step.text),
      fontWeight: tokens.fontWeight(paint.weight),
      lineHeight: tokens.lineHeight(step.text),
    },
  };
}
