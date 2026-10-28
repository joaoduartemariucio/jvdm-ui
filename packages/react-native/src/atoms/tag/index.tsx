import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { BADGE_TONES, type BadgeTone } from "../badge";
import { CloseIcon } from "../icon";
import { useJvdmTokens } from "../../tokens";
import { locales } from "./locales";

export function Tag({
  children,
  tone = "neutral",
  onRemove,
  removeLabel = locales.remove,
  disabled = false,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
}) {
  const tokens = useJvdmTokens();
  const pair = BADGE_TONES[tone];

  return (
    <View
      style={{
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: tokens.color(pair.background),
        borderRadius: tokens.radius("sm"),
        flexDirection: "row",
        gap: tokens.spacing(1),
        opacity: disabled ? 0.5 : 1,
        paddingLeft: tokens.spacing(2),
        paddingRight: tokens.spacing(onRemove === undefined ? 2 : 1),
        paddingVertical: tokens.spacing(0.5),
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          color: tokens.color(pair.foreground),
          fontSize: tokens.fontSize("xs"),
          fontWeight: tokens.fontWeight("medium"),
        }}
      >
        {children}
      </Text>
      {onRemove === undefined ? null : (
        <Pressable
          accessibilityLabel={removeLabel}
          accessibilityRole="button"
          disabled={disabled}
          onPress={onRemove}
          style={{ opacity: 0.7, padding: tokens.spacing(0.5) }}
        >
          <CloseIcon color={tokens.color(pair.foreground)} size="sm" />
        </Pressable>
      )}
    </View>
  );
}
