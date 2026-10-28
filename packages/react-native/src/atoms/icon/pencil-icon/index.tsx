import { Path } from "react-native-svg";

import { JvdmIcon, type IconProps } from "../svg";

export function PencilIcon(props: IconProps) {
  return (
    <JvdmIcon {...props}>
      <Path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      <Path d="M13.5 6.5l4 4" />
    </JvdmIcon>
  );
}
