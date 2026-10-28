import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { noticeStyle, type NoticeTone } from "./notice-style";

export { NOTICE_BORDER_OPACITY, NOTICE_TONES, noticeStyle, type NoticeTone } from "./notice-style";

export function Banner({
  title,
  tone = "info",
  children,
  action,
}: {
  title: string;
  tone?: NoticeTone;
  children?: ReactNode;
  action?: ReactNode;
}) {
  const tokens = useJvdmTokens();
  const style = noticeStyle(tokens, tone);

  return (
    <View
      accessibilityRole="alert"
      style={[
        style.container,
        { alignItems: "center", flexDirection: "row", gap: tokens.spacing(4) },
      ]}
    >
      <View style={{ flex: 1, gap: tokens.spacing(1) }}>
        <Text style={style.title}>{title}</Text>
        {children === undefined ? null : (
          <Text style={[style.body, { fontSize: tokens.fontSize("xs") }]}>{children}</Text>
        )}
      </View>
      {action}
    </View>
  );
}
