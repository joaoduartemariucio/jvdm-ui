import { Svg, type Props } from "../svg";

export function SearchIcon(p: Props) {
  return (
    <Svg {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Svg>
  );
}
