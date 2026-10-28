import { Path, Rect } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function MailIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Rect x={2.5} y={4.5} width={19} height={15} rx={2.5} />
      <Path d="m3.5 7 7.4 5.2a2 2 0 0 0 2.2 0L20.5 7" />
    </JvdmIcon>
  );
}
