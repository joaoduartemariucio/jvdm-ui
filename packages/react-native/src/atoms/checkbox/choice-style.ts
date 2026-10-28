import type { JvdmTokens } from "../../tokens";

export const CHOICE_BOX = 5;

export function choiceStyle(tokens: JvdmTokens, selected: boolean, disabled: boolean) {
  return {
    row: {
      alignItems: "center" as const,
      flexDirection: "row" as const,
      gap: tokens.spacing(3),
      minHeight: tokens.spacing(10),
      opacity: disabled ? 0.5 : 1,
    },
    box: {
      alignItems: "center" as const,
      backgroundColor: tokens.color(selected ? "accent" : "field"),
      borderColor: tokens.color(selected ? "accent" : "line-strong"),
      borderWidth: 1,
      height: tokens.spacing(CHOICE_BOX),
      justifyContent: "center" as const,
      width: tokens.spacing(CHOICE_BOX),
    },
    label: {
      color: tokens.color("ink-soft"),
      fontSize: tokens.fontSize("sm"),
      lineHeight: tokens.lineHeight("sm"),
    },
  };
}
