import { Path, Rect } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function CopyIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Rect x={9} y={9} width={11} height={11} rx={2} />
      <Path d="M5 15V6a2 2 0 0 1 2-2h8" />
    </JvdmIcon>
  );
}
