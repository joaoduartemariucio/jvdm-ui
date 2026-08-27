import { Svg, type Props } from "../svg";

export function PencilIcon(p: Props) {
  return (
    <Svg {...p}>
      <path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      <path d="M13.5 6.5l4 4" />
    </Svg>
  );
}
