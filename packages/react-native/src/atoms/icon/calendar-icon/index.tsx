import { Path, Rect } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function CalendarIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Rect x={3.5} y={5} width={17} height={16} rx={2.5} />
      <Path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </JvdmIcon>
  );
}
