import { Path, Rect } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function PlansIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Rect x={2.5} y={5} width={19} height={14} rx={2.5} />
      <Path d="M2.5 10h19" />
    </JvdmIcon>
  );
}
