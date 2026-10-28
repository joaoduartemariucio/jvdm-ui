import type { Icon, IconShape } from "../../icons";
import { num } from "../../number";

function element(shape: IconShape): string {
  if (shape.kind === "path") return `<path d="${shape.d}" />`;
  if (shape.kind === "circle") {
    return `<circle cx="${num(shape.cx)}" cy="${num(shape.cy)}" r="${num(shape.r)}" />`;
  }
  return `<rect x="${num(shape.x)}" y="${num(shape.y)}" width="${num(shape.width)}" height="${num(shape.height)}" rx="${num(shape.rx)}" />`;
}

export function emitWebIcon(icon: Icon): string {
  return [
    'import { Svg, type Props } from "../svg";',
    "",
    `export function ${icon.component}(p: Props) {`,
    "  return (",
    "    <Svg {...p}>",
    ...icon.shapes.map((shape) => `      ${element(shape)}`),
    "    </Svg>",
    "  );",
    "}",
    "",
  ].join("\n");
}

export function emitWebBarrel(icons: Icon[]): string {
  return [
    ...icons.map((icon) => `export { ${icon.component} } from "./${icon.name}-icon";`),
    'export { type IconSize, type Props, Svg } from "./svg";',
    "",
  ].join("\n");
}
