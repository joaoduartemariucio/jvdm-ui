import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { dividerStyle } from "./divider-style";

export function Divider({
  children,
  vertical = false,
}: {
  children?: ReactNode;
  vertical?: boolean;
}) {
  const style = dividerStyle(useJvdmTokens());

  if (vertical) return <View accessibilityElementsHidden style={style.vertical} />;

  if (children === undefined) return <View accessibilityElementsHidden style={style.rule} />;

  return (
    <View style={style.row}>
      <View accessibilityElementsHidden style={style.rule} />
      {typeof children === "string" ? <Text style={style.label}>{children}</Text> : children}
      <View accessibilityElementsHidden style={style.rule} />
    </View>
  );
}
