import { Svg, type Props } from "../svg";

export function FaceIcon(p: Props) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="9.5" r="3.6" />
      <path d="M4.5 20c0-3.6 3.4-5.6 7.5-5.6s7.5 2 7.5 5.6" />
    </Svg>
  );
}
