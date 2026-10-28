import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { ChevronIcon } from "../../atoms";
import { useJvdmTokens } from "../../tokens";
import { locales } from "./locales";

export type Crumb = { id: string; label: ReactNode; href?: string };

export function Breadcrumb({
  items,
  label = locales.label,
}: {
  items: readonly Crumb[];
  label?: string;
}) {
  const tokens = useJvdmTokens();

  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="header"
      style={{
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: tokens.spacing(1),
      }}
    >
      {items.map((item, index) => {
        const last = index === items.length - 1;

        return (
          <View
            key={item.id}
            style={{ alignItems: "center", flexDirection: "row", gap: tokens.spacing(1) }}
          >
            {index > 0 ? <ChevronIcon color={tokens.color("ink-dim")} size="sm" /> : null}
            <Text
              style={{
                color: tokens.color(last ? "ink" : "ink-muted"),
                fontSize: tokens.fontSize("xs"),
                fontWeight: tokens.fontWeight(last ? "medium" : "normal"),
              }}
            >
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
