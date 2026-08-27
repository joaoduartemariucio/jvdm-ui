import { Svg, type Props } from "../svg";

export function CarIcon(p: Props) {
  return (
    <Svg {...p}>
      <path d="M3 13.5 5 8a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5.5" />
      <path d="M2.5 13.5h19v4a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1Z" />
      <path d="M6 18.5v2M18 18.5v2M6 16h1.5M16.5 16H18" />
    </Svg>
  );
}
