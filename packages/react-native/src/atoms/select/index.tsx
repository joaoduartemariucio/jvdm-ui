import { Text, View, type StyleProp, type ViewStyle } from "react-native";

import { ChevronIcon } from "../icon";
import { useJvdmTokens } from "../../tokens";
import { controlStyle, type ControlSize } from "../input";

export type SelectOption = { value: string; label: string };

export function Select({
  options,
  value,
  placeholder,
  size = "md",
  invalid = false,
  style,
}: {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  size?: ControlSize;
  invalid?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const tokens = useJvdmTokens();
  const field = controlStyle(tokens, size, invalid).field;
  const selected = options.find((option) => option.value === value);

  return (
    <View
      accessibilityRole="combobox"
      accessibilityValue={{ text: selected?.label ?? placeholder ?? "" }}
      style={[
        field,
        { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
        style,
      ]}
    >
      <Text style={{ color: tokens.color(selected ? "ink" : "ink-dim"), fontSize: field.fontSize }}>
        {selected?.label ?? placeholder ?? ""}
      </Text>
      <ChevronIcon color={tokens.color("ink-muted")} size="sm" />
    </View>
  );
}
