import { Circle, Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function SearchIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Circle cx={11} cy={11} r={6.5} />
      <Path d="m16 16 4.5 4.5" />
    </JvdmIcon>
  );
}
