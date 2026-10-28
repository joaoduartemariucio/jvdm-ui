import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";

export function Field({
  label,
  error,
  action,
  children,
}: {
  label: string;
  error?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const tokens = useJvdmTokens();

  return (
    <View accessibilityLabel={label} style={{ gap: tokens.spacing(2) }}>
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
            color: tokens.color("ink-soft"),
            fontSize: tokens.fontSize("xs"),
            fontWeight: tokens.fontWeight("medium"),
          }}
        >
          {label}
        </Text>
        {action}
      </View>
      {children}
      {error === undefined ? null : (
        <Text style={{ color: tokens.color("danger"), fontSize: tokens.fontSize("2xs") }}>
          {error}
        </Text>
      )}
    </View>
  );
}
