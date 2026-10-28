import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function FactoryIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M2.5 20.5V11l6 3.5V11l6 3.5V6.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v14Z" />
      <Path d="M2 20.5h20" />
    </JvdmIcon>
  );
}
