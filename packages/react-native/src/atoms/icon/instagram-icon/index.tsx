import { Circle, Path, Rect } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function InstagramIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Rect x={3.5} y={3.5} width={17} height={17} rx={4.5} />
      <Circle cx={12} cy={12} r={3.8} />
      <Path d="M17 7h.01" />
    </JvdmIcon>
  );
}
