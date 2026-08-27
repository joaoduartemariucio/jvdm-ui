import { Svg, type Props } from "../svg";

export function PlansIcon(p: Props) {
  return (
    <Svg {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
    </Svg>
  );
}
