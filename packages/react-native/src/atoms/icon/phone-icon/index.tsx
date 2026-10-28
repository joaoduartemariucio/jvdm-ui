import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function PhoneIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M8.4 3.5H5.2a1.9 1.9 0 0 0-1.9 2.1c.4 3.7 1.8 7.2 4.1 10.1a19 19 0 0 0 5.9 5.1 1.9 1.9 0 0 0 2.6-.7l1.4-2.3a1.9 1.9 0 0 0-.6-2.5l-2.2-1.4-2.3 2.3a14 14 0 0 1-3.9-3.9l2.3-2.3-1.4-2.2a1.9 1.9 0 0 0-1.6-.9Z" />
    </JvdmIcon>
  );
}
