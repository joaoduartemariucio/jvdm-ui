import { TextInput, type StyleProp, type TextStyle } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { controlStyle, type ControlSize } from "../input";

export function Textarea({
  value,
  onChangeText,
  placeholder,
  rows = 4,
  size = "md",
  invalid = false,
  style,
}: {
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  size?: ControlSize;
  invalid?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  const tokens = useJvdmTokens();

  return (
    <TextInput
      multiline
      numberOfLines={rows}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={tokens.color("ink-dim")}
      style={[
        controlStyle(tokens, size, invalid).field,
        { minHeight: tokens.lineHeight("sm") * rows + tokens.spacing(6) },
        style,
      ]}
      textAlignVertical="top"
      value={value}
    />
  );
}
