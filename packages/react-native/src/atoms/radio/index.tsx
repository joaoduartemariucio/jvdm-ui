import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { CHOICE_BOX, choiceStyle } from "../checkbox";
import { useJvdmTokens } from "../../tokens";

export function Radio({
  label,
  selected = false,
  disabled = false,
  onSelect,
}: {
  label?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}) {
  const tokens = useJvdmTokens();
  const style = choiceStyle(tokens, selected, disabled);
  const box = tokens.spacing(CHOICE_BOX);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onSelect}
      style={style.row}
    >
      <View style={[style.box, { backgroundColor: tokens.color("field"), borderRadius: box / 2 }]}>
        {selected ? (
          <View
            style={{
              backgroundColor: tokens.color("accent"),
              borderRadius: tokens.spacing(2.5) / 2,
              height: tokens.spacing(2.5),
              width: tokens.spacing(2.5),
            }}
          />
        ) : null}
      </View>
      {label === undefined ? null : typeof label === "string" ? (
        <Text style={style.label}>{label}</Text>
      ) : (
        label
      )}
    </Pressable>
  );
}
