import type { JvdmTokens } from "../../tokens";

export function dividerStyle(tokens: JvdmTokens) {
  return {
    rule: {
      backgroundColor: tokens.color("line"),
      flex: 1,
      height: 1,
    },
    vertical: {
      alignSelf: "stretch" as const,
      backgroundColor: tokens.color("line"),
      width: 1,
    },
    row: {
      alignItems: "center" as const,
      flexDirection: "row" as const,
      gap: tokens.spacing(3),
    },
    label: {
      color: tokens.color("ink-dim"),
      fontSize: tokens.fontSize("2xs"),
      fontWeight: tokens.fontWeight("medium"),
      letterSpacing: tokens.letterSpacing("caps", "2xs"),
      textTransform: "uppercase" as const,
    },
  };
}
