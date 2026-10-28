import type { JvdmTokens, TextStep } from "../../tokens";

export const AVATAR_SIZES = {
  sm: { points: 32, text: "xs" },
  md: { points: 40, text: "sm" },
  lg: { points: 48, text: "base" },
} as const satisfies Record<string, { points: number; text: TextStep }>;

export type AvatarSize = keyof typeof AVATAR_SIZES;

export function avatarStyle(tokens: JvdmTokens, size: AvatarSize) {
  const step = AVATAR_SIZES[size];

  return {
    container: {
      alignItems: "center" as const,
      backgroundColor: tokens.color("raised"),
      borderRadius: tokens.radius("md"),
      height: step.points,
      justifyContent: "center" as const,
      width: step.points,
    },
    label: {
      color: tokens.color("ink-muted"),
      fontSize: tokens.fontSize(step.text),
      fontWeight: tokens.fontWeight("medium"),
    },
  };
}
