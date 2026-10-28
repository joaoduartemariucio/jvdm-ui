import type { ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { cardStyle, type CardPadding } from "./card-style";

export function Card({
  children,
  padding = "md",
  style,
}: {
  children: ReactNode;
  padding?: CardPadding;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[cardStyle(useJvdmTokens(), padding).container, style]}>{children}</View>;
}
