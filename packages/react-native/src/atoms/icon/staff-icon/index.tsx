import { Circle, Path, Rect } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function StaffIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Rect x={2.5} y={4.5} width={19} height={15} rx={2.5} />
      <Circle cx={8.5} cy={10.5} r={2.2} />
      <Path d="M5 16.4c0-1.7 1.6-2.6 3.5-2.6s3.5.9 3.5 2.6" />
      <Path d="M15 10h4" />
      <Path d="M15 14h4" />
    </JvdmIcon>
  );
}
