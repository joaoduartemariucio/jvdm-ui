import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { avatarStyle, type AvatarSize } from "./avatar-style";
import { initials } from "./initials";

export function Avatar({
  name,
  size = "md",
  label,
}: {
  name: string;
  size?: AvatarSize;
  label?: string;
}) {
  const style = avatarStyle(useJvdmTokens(), size);

  return (
    <View accessibilityRole="image" accessibilityLabel={label ?? name} style={style.container}>
      <Text style={style.label}>{initials(name)}</Text>
    </View>
  );
}
