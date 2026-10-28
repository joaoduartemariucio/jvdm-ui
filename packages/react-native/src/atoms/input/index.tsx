import { TextInput, type StyleProp, type TextStyle } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { controlStyle, type ControlSize } from "./control-style";

export { CONTROL_SIZES, controlStyle, type ControlSize } from "./control-style";

export function Input({
  value,
  onChangeText,
  placeholder,
  size = "md",
  invalid = false,
  style,
}: {
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  size?: ControlSize;
  invalid?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  const tokens = useJvdmTokens();

  return (
    <TextInput
      accessibilityState={{ disabled: false }}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={tokens.color("ink-dim")}
      style={[controlStyle(tokens, size, invalid).field, style]}
      value={value}
    />
  );
}
