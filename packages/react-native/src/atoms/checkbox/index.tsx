import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { CheckIcon } from "../icon";
import { useJvdmTokens } from "../../tokens";
import { choiceStyle } from "./choice-style";

export { CHOICE_BOX, choiceStyle } from "./choice-style";

export function Checkbox({
  label,
  checked = false,
  disabled = false,
  onCheckedChange,
}: {
  label?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const tokens = useJvdmTokens();
  const style = choiceStyle(tokens, checked, disabled);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange?.(!checked)}
      style={style.row}
    >
      <View style={[style.box, { borderRadius: tokens.radius("xs") }]}>
        {checked ? <CheckIcon color={tokens.color("on-accent")} size="sm" /> : null}
      </View>
      {label === undefined ? null : typeof label === "string" ? (
        <Text style={style.label}>{label}</Text>
      ) : (
        label
      )}
    </Pressable>
  );
}
