import type { ReactNode } from "react";
import { Image, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { THUMB_RATIO } from "./thumb-style";

export { THUMB_RATIO } from "./thumb-style";

export function Thumb({
  src,
  alt,
  fallback,
}: {
  src?: string | null;
  alt: string;
  fallback?: ReactNode;
}) {
  const tokens = useJvdmTokens();

  return (
    <View
      accessibilityLabel={alt}
      accessibilityRole="image"
      style={{
        alignItems: "center",
        aspectRatio: THUMB_RATIO,
        backgroundColor: tokens.color("raised"),
        borderRadius: tokens.radius("md"),
        justifyContent: "center",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {src ? (
        <Image resizeMode="cover" source={{ uri: src }} style={{ height: "100%", width: "100%" }} />
      ) : (
        fallback
      )}
    </View>
  );
}
