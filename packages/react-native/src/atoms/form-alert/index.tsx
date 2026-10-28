import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { formAlertStyle } from "./form-alert-style";

export function FormAlert({ children }: { children: ReactNode }) {
  const style = formAlertStyle(useJvdmTokens());

  return (
    <View accessibilityRole="alert" accessibilityLiveRegion="polite" style={style.container}>
      {typeof children === "string" ? <Text style={style.label}>{children}</Text> : children}
    </View>
  );
}
