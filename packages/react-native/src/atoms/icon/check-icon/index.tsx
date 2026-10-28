import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function CheckIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="m5 12.5 4.5 4.5L19 7.5" />
    </JvdmIcon>
  );
}
