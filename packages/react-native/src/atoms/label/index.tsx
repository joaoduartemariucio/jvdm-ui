import type { ReactNode } from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { labelStyle, type LabelTone } from "./label-style";

export function Label({
  children,
  tone = "muted",
  style,
}: {
  children: ReactNode;
  tone?: LabelTone;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[labelStyle(useJvdmTokens(), tone).label, style]}>{children}</Text>;
}
