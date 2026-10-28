import type { ReactNode } from "react";
import { type StyleProp, type ViewStyle } from "react-native";

import { Button, type ButtonVariant } from "../button";

export type IconButtonSize = "icon" | "icon-sm";

export function IconButton({
  children,
  label,
  variant = "ghost",
  size = "icon",
  disabled = false,
  onPress,
  style,
}: {
  children: ReactNode;
  label: string;
  variant?: ButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Button
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      size={size}
      style={style}
      variant={variant}
    >
      {children}
    </Button>
  );
}
