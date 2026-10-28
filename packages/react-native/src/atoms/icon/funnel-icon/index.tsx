import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function FunnelIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M3 5h18l-7 8v6l-4 2v-8z" />
    </JvdmIcon>
  );
}
