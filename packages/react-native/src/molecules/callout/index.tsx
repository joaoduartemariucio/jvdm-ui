import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { noticeStyle, type NoticeTone } from "../banner";
import { useJvdmTokens } from "../../tokens";

export function Callout({
  title,
  tone = "info",
  children,
}: {
  title: string;
  tone?: NoticeTone;
  children: ReactNode;
}) {
  const tokens = useJvdmTokens();
  const style = noticeStyle(tokens, tone);

  return (
    <View style={[style.container, { gap: tokens.spacing(1) }]}>
      <Text style={style.title}>{title}</Text>
      {typeof children === "string" ? (
        <Text style={[style.body, { fontSize: tokens.fontSize("sm") }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
