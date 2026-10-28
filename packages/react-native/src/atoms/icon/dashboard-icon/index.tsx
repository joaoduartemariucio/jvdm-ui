import { Rect } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function DashboardIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Rect x={3} y={3} width={7} height={7} rx={1.5} />
      <Rect x={14} y={3} width={7} height={7} rx={1.5} />
      <Rect x={3} y={14} width={7} height={7} rx={1.5} />
      <Rect x={14} y={14} width={7} height={7} rx={1.5} />
    </JvdmIcon>
  );
}
