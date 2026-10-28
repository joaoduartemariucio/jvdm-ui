import type { JvdmTokens } from "../../tokens";

export function formAlertStyle(tokens: JvdmTokens) {
  return {
    container: {
      backgroundColor: tokens.color("danger-soft"),
      borderRadius: tokens.radius("md"),
      paddingHorizontal: tokens.spacing(3),
      paddingVertical: tokens.spacing(2),
    },
    label: {
      color: tokens.color("danger"),
      fontSize: tokens.fontSize("sm"),
      lineHeight: tokens.lineHeight("sm"),
    },
  };
}
