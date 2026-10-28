import { Circle, Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function StudentsIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Circle cx={9} cy={8} r={3.2} />
      <Path d="M3.5 19c0-3 2.5-4.6 5.5-4.6s5.5 1.6 5.5 4.6" />
      <Path d="M16.5 6.6a3 3 0 0 1 0 5.6" />
      <Path d="M18 14.6c2 .6 3.2 2 3.2 4.4" />
    </JvdmIcon>
  );
}
