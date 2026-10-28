import type { JvdmTokens } from "../../tokens";

export function kbdStyle(tokens: JvdmTokens) {
  return {
    container: {
      alignItems: "center" as const,
      alignSelf: "flex-start" as const,
      backgroundColor: tokens.color("raised"),
      borderColor: tokens.color("line-strong"),
      borderRadius: tokens.radius("xs"),
      borderWidth: 1,
      justifyContent: "center" as const,
      minWidth: tokens.spacing(6),
      paddingHorizontal: tokens.spacing(1),
      paddingVertical: tokens.spacing(0.5),
    },
    label: {
      color: tokens.color("ink-soft"),
      fontFamily: tokens.monoFamily,
      fontSize: tokens.fontSize("2xs"),
      lineHeight: tokens.lineHeight("2xs"),
    },
  };
}
