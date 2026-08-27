import { Svg, type Props } from "../svg";

export function BuildingIcon(p: Props) {
  return (
    <Svg {...p}>
      <path d="M4.5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 14.5 5v15.5" />
      <path d="M14.5 10h4A1.5 1.5 0 0 1 20 11.5v9" />
      <path d="M3 20.5h18M7.5 7.5h4M7.5 11h4M7.5 14.5h4M7.5 18h4" />
    </Svg>
  );
}
