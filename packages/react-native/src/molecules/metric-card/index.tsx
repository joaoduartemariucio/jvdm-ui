import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { METRIC_TRENDS, type MetricTrend } from "./metric-style";

export { METRIC_TRENDS, type MetricTrend } from "./metric-style";

export function MetricCard({
  label,
  value,
  change,
  trend = "neutral",
  hint,
  children,
}: {
  label: string;
  value: ReactNode;
  change?: string;
  trend?: MetricTrend;
  hint?: string;
  children?: ReactNode;
}) {
  const tokens = useJvdmTokens();

  return (
    <View
      style={{
        backgroundColor: tokens.color("surface"),
        borderColor: tokens.color("line"),
        borderRadius: tokens.radius("md"),
        borderWidth: 1,
        padding: tokens.spacing(5),
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
          gap: tokens.spacing(4),
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: tokens.color("ink-muted"), fontSize: tokens.fontSize("xs") }}>
          {label}
        </Text>
        {change === undefined ? null : (
          <Text
            style={{
              color: tokens.color(METRIC_TRENDS[trend]),
              fontSize: tokens.fontSize("xs"),
              fontWeight: tokens.fontWeight("medium"),
            }}
          >
            {change}
          </Text>
        )}
      </View>

      <Text
        style={{
          color: tokens.color("ink"),
          fontSize: tokens.fontSize("2xl"),
          fontWeight: tokens.fontWeight("bold"),
          marginTop: tokens.spacing(3),
        }}
      >
        {value}
      </Text>

      {hint === undefined ? null : (
        <Text
          style={{
            color: tokens.color("ink-dim"),
            fontSize: tokens.fontSize("xs"),
            marginTop: tokens.spacing(1),
          }}
        >
          {hint}
        </Text>
      )}

      {children === undefined ? null : (
        <View style={{ marginTop: tokens.spacing(4) }}>{children}</View>
      )}
    </View>
  );
}
