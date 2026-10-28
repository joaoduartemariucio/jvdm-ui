import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { switchStyle } from "./switch-style";

export {
  SWITCH_INSET,
  SWITCH_THUMB,
  SWITCH_TRACK,
  SWITCH_TRAVEL,
  switchStyle,
  switchThumb,
  switchTrack,
} from "./switch-style";

export function Switch({
  checked,
  onCheckedChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
}) {
  const style = switchStyle(useJvdmTokens(), checked, disabled);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange(!checked)}
      style={style.row}
    >
      <View style={style.track}>
        <View style={style.thumb} />
      </View>
      {label === undefined ? null : typeof label === "string" ? (
        <Text style={style.label}>{label}</Text>
      ) : (
        label
      )}
    </Pressable>
  );
}
