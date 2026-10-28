import { View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import {
  progressRatio,
  progressStyle,
  type ProgressSize,
  type ProgressTone,
} from "./progress-style";

export {
  PROGRESS_SIZES,
  PROGRESS_TONES,
  progressRatio,
  progressStyle,
  type ProgressSize,
  type ProgressTone,
} from "./progress-style";

export function ProgressBar({
  value,
  tone = "accent",
  size = "md",
  dim = false,
  label,
}: {
  value: number;
  tone?: ProgressTone;
  size?: ProgressSize;
  dim?: boolean;
  label?: string;
}) {
  const style = progressStyle(useJvdmTokens(), value, tone, size, dim);

  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(progressRatio(value) * 100) }}
      style={style.track}
    >
      <View style={style.fill} />
    </View>
  );
}
