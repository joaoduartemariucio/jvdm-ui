import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function ShieldCheckIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M12 2.8 4.5 5.9v5.6c0 4.4 3.1 8.5 7.5 9.7 4.4-1.2 7.5-5.3 7.5-9.7V5.9Z" />
      <Path d="m9 11.8 2.2 2.2 4-4" />
    </JvdmIcon>
  );
}
