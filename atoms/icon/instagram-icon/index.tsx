import { Svg, type Props } from "../svg";

export function InstagramIcon(p: Props) {
  return (
    <Svg {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17 7h.01" />
    </Svg>
  );
}
