import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function ChevronIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="m6 9 6 6 6-6" />
    </JvdmIcon>
  );
}
