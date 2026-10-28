import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { kbdStyle } from "./kbd-style";

export function Kbd({ children }: { children: ReactNode }) {
  const style = kbdStyle(useJvdmTokens());

  return (
    <View style={style.container}>
      {typeof children === "string" ? <Text style={style.label}>{children}</Text> : children}
    </View>
  );
}
