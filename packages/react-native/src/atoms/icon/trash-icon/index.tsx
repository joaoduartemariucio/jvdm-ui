import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function TrashIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M5 7h14" />
      <Path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <Path d="M7 7l1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13" />
      <Path d="M10 11v6" />
      <Path d="M14 11v6" />
    </JvdmIcon>
  );
}
