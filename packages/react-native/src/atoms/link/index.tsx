import type { ReactNode } from "react";
import { Linking, Text, type StyleProp, type TextStyle } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { linkStyle, type LinkTone } from "./link-style";

export { LINK_TONES, linkStyle, type LinkTone } from "./link-style";

export function Link({
  children,
  href,
  tone = "accent",
  style,
}: {
  children: ReactNode;
  href: string;
  tone?: LinkTone;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      accessibilityRole="link"
      onPress={() => void Linking.openURL(href)}
      style={[linkStyle(useJvdmTokens(), tone).label, style]}
    >
      {children}
    </Text>
  );
}
