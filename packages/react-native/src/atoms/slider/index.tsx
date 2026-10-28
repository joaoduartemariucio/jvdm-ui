import { View, type StyleProp, type ViewStyle } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { sliderStyle } from "./slider-style";

export { SLIDER_THUMB, SLIDER_TRACK, sliderRatio, sliderStyle } from "./slider-style";

export function Slider({
  value = 0,
  min = 0,
  max = 100,
  disabled = false,
  style,
}: {
  value?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const resolved = sliderStyle(useJvdmTokens(), value, min, max, disabled);

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      style={[resolved.container, style]}
    >
      <View style={resolved.track}>
        <View style={resolved.fill} />
      </View>
      <View style={resolved.thumb} />
    </View>
  );
}
