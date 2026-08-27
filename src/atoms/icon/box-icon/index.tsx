import { Svg, type Props } from "../svg";

export function BoxIcon(p: Props) {
  return (
    <Svg {...p}>
      <path d="M20.5 8.2v7.6a1.6 1.6 0 0 1-.8 1.4l-6.9 3.8a1.6 1.6 0 0 1-1.6 0l-6.9-3.8a1.6 1.6 0 0 1-.8-1.4V8.2" />
      <path d="m3.9 7.3 7.3-4a1.6 1.6 0 0 1 1.6 0l7.3 4a1 1 0 0 1 0 1.7l-7.3 4a1.6 1.6 0 0 1-1.6 0l-7.3-4a1 1 0 0 1 0-1.7Z" />
      <path d="M12 12.8v8" />
    </Svg>
  );
}
