import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function GavelIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="m13.4 6.6 4 4" />
      <Path d="M15.9 2.9a2 2 0 0 1 2.8 0l2.4 2.4a2 2 0 0 1 0 2.8l-2 2a2 2 0 0 1-2.8 0l-2.4-2.4a2 2 0 0 1 0-2.8Z" />
      <Path d="m14.2 9.8-7.6 7.6a2 2 0 0 0 0 2.8 2 2 0 0 0 2.8 0l7.6-7.6" />
      <Path d="M3.5 21.5h7" />
    </JvdmIcon>
  );
}
