import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";

export function Empty({ title, description }: { title: string; description?: ReactNode }) {
  const tokens = useJvdmTokens();

  return (
    <View
      style={{
        alignItems: "center",
        gap: tokens.spacing(2),
        justifyContent: "center",
        paddingVertical: tokens.spacing(16),
      }}
    >
      <Text
        style={{
          color: tokens.color("ink-soft"),
          fontSize: tokens.fontSize("sm"),
          fontWeight: tokens.fontWeight("medium"),
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {description === undefined ? null : (
        <Text
          style={{
            color: tokens.color("ink-muted"),
            fontSize: tokens.fontSize("sm"),
            textAlign: "center",
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}
