import type { Icon, IconShape } from "../../icons";
import { num } from "../../number";

function element(shape: IconShape): string {
  if (shape.kind === "path") return `<Path d="${shape.d}" />`;
  if (shape.kind === "circle") {
    return `<Circle cx={${num(shape.cx)}} cy={${num(shape.cy)}} r={${num(shape.r)}} />`;
  }
  return `<Rect x={${num(shape.x)}} y={${num(shape.y)}} width={${num(shape.width)}} height={${num(shape.height)}} rx={${num(shape.rx)}} />`;
}

const COMPONENT = { path: "Path", circle: "Circle", rect: "Rect" } as const;

export function emitReactNativeBarrel(icons: Icon[]): string {
  return [
    ...icons.map((icon) => `export { ${icon.component} } from "./${icon.name}-icon";`),
    'export { JvdmIcon, iconPoints, type IconProps, type IconSize } from "./svg";',
    "",
  ].join("\n");
}

export function emitReactNativeIcon(icon: Icon): string {
  const used = [...new Set(icon.shapes.map((shape) => COMPONENT[shape.kind]))].sort();

  return [
    `import { ${used.join(", ")} } from "react-native-svg";`,
    "",
    'import { JvdmIcon, type IconProps } from "../svg";',
    "",
    `export function ${icon.component}(props: IconProps) {`,
    "  return (",
    "    <JvdmIcon {...props}>",
    ...icon.shapes.map((shape) => `      ${element(shape)}`),
    "    </JvdmIcon>",
    "  );",
    "}",
    "",
  ].join("\n");
}
