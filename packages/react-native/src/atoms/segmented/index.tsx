import { Pressable, Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";

export type SegmentedOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export function Segmented({
  options,
  value,
  onValueChange,
  label,
}: {
  options: readonly SegmentedOption[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
}) {
  const tokens = useJvdmTokens();

  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="radiogroup"
      style={{
        backgroundColor: tokens.color("raised"),
        borderRadius: tokens.radius("md"),
        flexDirection: "row",
        gap: tokens.spacing(0.5),
        padding: tokens.spacing(0.5),
      }}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled: option.disabled }}
            disabled={option.disabled}
            key={option.value}
            onPress={() => onValueChange(option.value)}
            style={{
              alignItems: "center",
              backgroundColor: selected ? tokens.color("surface") : "transparent",
              borderRadius: tokens.radius("sm"),
              flex: 1,
              justifyContent: "center",
              minHeight: tokens.spacing(9),
            }}
          >
            <Text
              style={{
                color: tokens.color(selected ? "ink" : "ink-muted"),
                fontSize: tokens.fontSize("sm"),
                fontWeight: tokens.fontWeight(selected ? "medium" : "normal"),
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
