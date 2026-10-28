import { useEffect, useState } from "react";
import { Animated, Easing, type StyleProp, type ViewStyle } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { SKELETON_OPACITY, skeletonStyle } from "./skeleton-style";

export function Skeleton({ style }: { style?: StyleProp<ViewStyle> }) {
  const tokens = useJvdmTokens();
  const resolved = skeletonStyle(tokens);
  const [opacity] = useState(() => new Animated.Value(SKELETON_OPACITY.from));

  useEffect(() => {
    const [x1, y1, x2, y2] = tokens.bezier("in-out");

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: SKELETON_OPACITY.to,
          duration: resolved.duration,
          easing: Easing.bezier(x1, y1, x2, y2),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: SKELETON_OPACITY.from,
          duration: resolved.duration,
          easing: Easing.bezier(x1, y1, x2, y2),
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [opacity, resolved.duration, tokens]);

  return (
    <Animated.View accessibilityElementsHidden style={[resolved.container, { opacity }, style]} />
  );
}
