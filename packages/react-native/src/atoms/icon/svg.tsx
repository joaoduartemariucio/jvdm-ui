import type { ReactNode } from "react";
import Svg from "react-native-svg";

export type IconSize = "sm" | "md" | "lg" | "xl" | "2xl";

const POINTS: Record<IconSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
};

export const VIEW_BOX = 24;

export const STROKE_WIDTH = 1.6;

export type IconProps = { size?: IconSize; color?: string };

export function JvdmIcon({
  size = "md",
  color = "currentColor",
  children,
}: IconProps & { children: ReactNode }) {
  const points = POINTS[size];

  return (
    <Svg
      width={points}
      height={points}
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      fill="none"
      stroke={color}
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
  );
}

export const iconPoints = (size: IconSize): number => POINTS[size];
