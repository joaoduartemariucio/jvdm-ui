import { Svg, type Props } from "../svg";

export function LogoutIcon(p: Props) {
  return (
    <Svg {...p}>
      <path d="M9 4.5H6A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h3" />
      <path d="M15.5 15.5 19.5 12l-4-3.5M19 12H9.5" />
    </Svg>
  );
}
