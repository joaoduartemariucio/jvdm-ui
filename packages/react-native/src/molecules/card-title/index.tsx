import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";

export function CardTitle({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  const tokens = useJvdmTokens();

  return (
    <View
      style={{
        alignItems: "baseline",
        flexDirection: "row",
        gap: tokens.spacing(3),
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: tokens.color("ink"),
          fontSize: tokens.fontSize("sm"),
          fontWeight: tokens.fontWeight("medium"),
        }}
      >
        {children}
      </Text>
      {hint === undefined ? null : (
        <Text style={{ color: tokens.color("ink-muted"), fontSize: tokens.fontSize("xs") }}>
          {hint}
        </Text>
      )}
    </View>
  );
}
