import { Circle, Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function FaceIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Circle cx={12} cy={9.5} r={3.6} />
      <Path d="M4.5 20c0-3.6 3.4-5.6 7.5-5.6s7.5 2 7.5 5.6" />
    </JvdmIcon>
  );
}
