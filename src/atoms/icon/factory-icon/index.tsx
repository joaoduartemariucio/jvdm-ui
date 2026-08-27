import { Svg, type Props } from "../svg";

export function FactoryIcon(p: Props) {
  return (
    <Svg {...p}>
      <path d="M2.5 20.5V11l6 3.5V11l6 3.5V6.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v14Z" />
      <path d="M2 20.5h20" />
    </Svg>
  );
}
