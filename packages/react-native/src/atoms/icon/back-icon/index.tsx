import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function BackIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="m14 6-6 6 6 6" />
    </JvdmIcon>
  );
}
