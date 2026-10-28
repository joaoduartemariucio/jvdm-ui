import { Svg, type Props } from "../svg";

export function StaffIcon(p: Props) {
  return (
    <Svg {...p}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <circle cx="8.5" cy="10.5" r="2.2" />
      <path d="M5 16.4c0-1.7 1.6-2.6 3.5-2.6s3.5.9 3.5 2.6" />
      <path d="M15 10h4" />
      <path d="M15 14h4" />
    </Svg>
  );
}
