import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function CloseIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M6 6l12 12M18 6 6 18" />
    </JvdmIcon>
  );
}
