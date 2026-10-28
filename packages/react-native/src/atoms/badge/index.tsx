import type { ReactNode } from "react";
import { Text, View, type StyleProp, type ViewStyle } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { badgeStyle, type BadgeTone } from "./badge-style";

export { BADGE_TONES, badgeStyle, type BadgeTone } from "./badge-style";

export function Badge({
  tone = "neutral",
  children,
  style,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const tokens = useJvdmTokens();
  const resolved = badgeStyle(tokens, tone);

  return (
    <View style={[resolved.container, style]}>
      {typeof children === "string" ? <Text style={resolved.label}>{children}</Text> : children}
    </View>
  );
}
