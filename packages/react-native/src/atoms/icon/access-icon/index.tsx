import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function AccessIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
      <Path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
      <Path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
      <Path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <Path d="M4 12h16" />
    </JvdmIcon>
  );
}
