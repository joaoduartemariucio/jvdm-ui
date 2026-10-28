import type { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { locales } from "./locales";

export type Tab = {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};

export function Tabs({
  items,
  value,
  onValueChange,
  label = locales.label,
}: {
  items: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
}) {
  const tokens = useJvdmTokens();
  const active = items.find((item) => item.value === value) ?? items[0];

  return (
    <View style={{ gap: tokens.spacing(4) }}>
      <ScrollView
        accessibilityLabel={label}
        accessibilityRole="tablist"
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ borderBottomColor: tokens.color("line"), borderBottomWidth: 1 }}
      >
        <View style={{ flexDirection: "row", gap: tokens.spacing(1) }}>
          {items.map((item) => {
            const selected = item.value === active?.value;

            return (
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected, disabled: item.disabled }}
                disabled={item.disabled}
                key={item.value}
                onPress={() => onValueChange(item.value)}
                style={{
                  alignItems: "center",
                  borderBottomColor: selected ? tokens.color("accent") : "transparent",
                  borderBottomWidth: tokens.spacing(0.5),
                  justifyContent: "center",
                  minHeight: tokens.spacing(10),
                  paddingHorizontal: tokens.spacing(3),
                }}
              >
                <Text
                  style={{
                    color: tokens.color(selected ? "ink" : "ink-muted"),
                    fontSize: tokens.fontSize("sm"),
                    fontWeight: tokens.fontWeight(selected ? "medium" : "normal"),
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      {active === undefined ? null : <View>{active.content}</View>}
    </View>
  );
}
