import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function BuildingIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M4.5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 14.5 5v15.5" />
      <Path d="M14.5 10h4A1.5 1.5 0 0 1 20 11.5v9" />
      <Path d="M3 20.5h18M7.5 7.5h4M7.5 11h4M7.5 14.5h4M7.5 18h4" />
    </JvdmIcon>
  );
}
