import { Svg, type Props } from "../svg";

export function MailIcon(p: Props) {
  return (
    <Svg {...p}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 7.4 5.2a2 2 0 0 0 2.2 0L20.5 7" />
    </Svg>
  );
}
