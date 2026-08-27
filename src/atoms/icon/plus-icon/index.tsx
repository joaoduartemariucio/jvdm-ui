import { Svg, type Props } from "../svg";

export function PlusIcon(p: Props) {
  return (
    <Svg {...p}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}
