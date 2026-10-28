import type { ReactNode } from "react";
import { Pressable, Text, type StyleProp, type ViewStyle } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { buttonStyle, type ButtonSize, type ButtonVariant } from "./button-style";

export {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  buttonStyle,
  type ButtonSize,
  type ButtonVariant,
} from "./button-style";

export function Button({
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  onPress,
  style,
  accessibilityLabel,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}) {
  const resolved = buttonStyle(useJvdmTokens(), variant, size, disabled);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[resolved.container, style]}
    >
      {typeof children === "string" ? <Text style={resolved.label}>{children}</Text> : children}
    </Pressable>
  );
}
