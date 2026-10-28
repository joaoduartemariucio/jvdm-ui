import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function AlertIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M12 8.5v5" />
      <Path d="M12 16.7h.01" />
      <Path d="M10.3 3.9 2.6 17.4A1.9 1.9 0 0 0 4.3 20.3h15.4a1.9 1.9 0 0 0 1.7-2.9L13.7 3.9a1.9 1.9 0 0 0-3.4 0Z" />
    </JvdmIcon>
  );
}
