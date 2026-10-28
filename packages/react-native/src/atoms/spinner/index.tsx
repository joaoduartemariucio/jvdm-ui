import { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import { iconPoints, type IconSize } from "../icon";
import { useJvdmTokens } from "../../tokens";
import { locales } from "./locales";

export const SPINNER_STROKE = 2.4;

export const SPINNER_PERIOD = 1000;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function Spinner({
  size = "md",
  label = locales.label,
}: {
  size?: IconSize;
  label?: string;
}) {
  const tokens = useJvdmTokens();
  const points = iconPoints(size);
  const [turn] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(turn, {
        toValue: 1,
        duration: SPINNER_PERIOD,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    loop.start();
    return () => loop.stop();
  }, [turn]);

  const rotate = turn.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <AnimatedSvg
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      height={points}
      style={{ transform: [{ rotate }] }}
      viewBox="0 0 24 24"
      width={points}
    >
      <Circle
        cx={12}
        cy={12}
        opacity={0.2}
        r={9}
        stroke={tokens.color("ink")}
        strokeWidth={SPINNER_STROKE}
      />
      <Path
        d="M21 12a9 9 0 0 0-9-9"
        stroke={tokens.color("ink")}
        strokeLinecap="round"
        strokeWidth={SPINNER_STROKE}
      />
    </AnimatedSvg>
  );
}
