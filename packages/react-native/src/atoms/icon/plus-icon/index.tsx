import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function PlusIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M12 5v14M5 12h14" />
    </JvdmIcon>
  );
}
