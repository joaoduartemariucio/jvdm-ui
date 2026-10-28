import type { JvdmTokens } from "../../tokens";

export const CARD_PADDINGS = { none: 0, sm: 4, md: 5, lg: 6 } as const;

export type CardPadding = keyof typeof CARD_PADDINGS;

export function cardStyle(tokens: JvdmTokens, padding: CardPadding) {
  return {
    container: {
      backgroundColor: tokens.color("surface"),
      borderColor: tokens.color("line"),
      borderRadius: tokens.radius("md"),
      borderWidth: 1,
      padding: tokens.spacing(CARD_PADDINGS[padding]),
    },
  };
}
