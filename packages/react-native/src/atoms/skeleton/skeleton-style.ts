import type { JvdmTokens } from "../../tokens";

export const SKELETON_OPACITY = { from: 1, to: 0.5 } as const;

export function skeletonStyle(tokens: JvdmTokens) {
  return {
    container: {
      backgroundColor: tokens.color("raised"),
      borderRadius: tokens.radius("sm"),
    },
    duration: tokens.duration("slow"),
  };
}
