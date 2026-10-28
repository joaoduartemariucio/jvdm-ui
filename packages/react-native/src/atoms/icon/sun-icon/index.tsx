import { Circle, Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function SunIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Circle cx={12} cy={12} r={4} />
      <Path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </JvdmIcon>
  );
}
