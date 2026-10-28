import type { JvdmTokens } from "../../tokens";

export const MODAL_SIZES = { sm: 448, md: 672, lg: 896, xl: 1152 } as const;

export type ModalSize = keyof typeof MODAL_SIZES;

export function dialogSurfaceStyle(tokens: JvdmTokens) {
  return {
    backdrop: {
      backgroundColor: tokens.color("app"),
      flex: 1,
      justifyContent: "flex-end" as const,
      opacity: 0.98,
    },
    surface: {
      backgroundColor: tokens.color("surface"),
      borderTopLeftRadius: tokens.radius("xl"),
      borderTopRightRadius: tokens.radius("xl"),
      maxHeight: "92%" as const,
      width: "100%" as const,
    },
    header: {
      alignItems: "center" as const,
      borderBottomColor: tokens.color("line"),
      borderBottomWidth: 1,
      flexDirection: "row" as const,
      gap: tokens.spacing(4),
      justifyContent: "space-between" as const,
      paddingLeft: tokens.spacing(5),
      paddingRight: tokens.spacing(3),
      paddingVertical: tokens.spacing(3),
    },
    title: {
      color: tokens.color("ink"),
      fontSize: tokens.fontSize("lg"),
      fontWeight: tokens.fontWeight("bold"),
    },
    body: {
      padding: tokens.spacing(5),
    },
  };
}
