import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  const tokens = useJvdmTokens();

  return (
    <View
      style={{
        alignItems: "flex-end",
        flexDirection: "row",
        gap: tokens.spacing(4),
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1, gap: tokens.spacing(1) }}>
        <Text
          numberOfLines={1}
          style={{
            color: tokens.color("ink"),
            fontSize: tokens.fontSize("xl"),
            fontWeight: tokens.fontWeight("bold"),
          }}
        >
          {title}
        </Text>
        {subtitle === undefined ? null : (
          <Text style={{ color: tokens.color("ink-muted"), fontSize: tokens.fontSize("sm") }}>
            {subtitle}
          </Text>
        )}
      </View>
      {children === undefined ? null : (
        <View style={{ flexDirection: "row", gap: tokens.spacing(3) }}>{children}</View>
      )}
    </View>
  );
}
