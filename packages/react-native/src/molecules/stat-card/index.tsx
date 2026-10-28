import { Text, View } from "react-native";

import { Card, Label } from "../../atoms";
import { useJvdmTokens, type ColorToken } from "../../tokens";
import { statCardStep } from "./stat-card-style";

export { statCardStep } from "./stat-card-style";

export function StatCard({
  label,
  value,
  hint,
  color,
  attention = false,
}: {
  label: string;
  value: string;
  hint?: string;
  color?: ColorToken;
  attention?: boolean;
}) {
  const tokens = useJvdmTokens();

  return (
    <Card
      padding="sm"
      style={
        attention
          ? { borderColor: tokens.color("danger-soft"), borderWidth: tokens.spacing(1) }
          : undefined
      }
    >
      <View style={{ gap: tokens.spacing(1) }}>
        <Label>{label}</Label>
        <Text
          numberOfLines={1}
          style={{
            color: tokens.color(color ?? "ink"),
            fontSize: tokens.fontSize(statCardStep(value)),
            fontWeight: tokens.fontWeight("bold"),
          }}
        >
          {value}
        </Text>
        {hint === undefined ? null : (
          <Text
            numberOfLines={1}
            style={{ color: tokens.color("ink-muted"), fontSize: tokens.fontSize("xs") }}
          >
            {hint}
          </Text>
        )}
      </View>
    </Card>
  );
}
