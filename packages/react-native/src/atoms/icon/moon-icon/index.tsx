import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function MoonIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />
    </JvdmIcon>
  );
}
