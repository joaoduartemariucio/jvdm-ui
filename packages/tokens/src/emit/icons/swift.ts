import type { Icon, IconShape, Segment } from "../../icons";
import { double } from "../format";

const point = (value: { x: number; y: number }): string =>
  `g.point(${double(value.x)}, ${double(value.y)})`;

const rect = (x: number, y: number, width: number, height: number): string =>
  `g.rect(${double(x)}, ${double(y)}, ${double(width)}, ${double(height)})`;

function segment(value: Segment): string {
  if (value.kind === "move") return `path.move(to: ${point(value.to)})`;
  if (value.kind === "line") return `path.addLine(to: ${point(value.to)})`;
  if (value.kind === "close") return "path.closeSubpath()";
  return [
    `path.addCurve(`,
    `    to: ${point(value.to)},`,
    `    control1: ${point(value.control1)},`,
    `    control2: ${point(value.control2)}`,
    `)`,
  ].join("\n        ");
}

function shape(value: IconShape): string[] {
  if (value.kind === "path") return value.segments.map(segment);

  if (value.kind === "circle") {
    return [
      `path.addEllipse(in: ${rect(value.cx - value.r, value.cy - value.r, value.r * 2, value.r * 2)})`,
    ];
  }

  return [
    [
      "path.addRoundedRect(",
      `    in: ${rect(value.x, value.y, value.width, value.height)},`,
      `    cornerSize: g.corner(${double(value.rx)})`,
      ")",
    ].join("\n        "),
  ];
}

export function emitSwiftIcon(icon: Icon): string {
  const body = icon.shapes.flatMap(shape).map((line) => `        ${line}`);

  return [
    "import SwiftUI",
    "",
    `public struct ${icon.component}Shape: JvdmIconShape {`,
    "    public init() {}",
    "",
    "    public func trace(into path: inout Path, with g: JvdmIconGeometry) {",
    ...body,
    "    }",
    "}",
    "",
    `public struct ${icon.component}: View {`,
    "    private let size: JvdmIconSize",
    "",
    "    public init(size: JvdmIconSize = .md) {",
    "        self.size = size",
    "    }",
    "",
    "    public var body: some View {",
    `        JvdmIcon(${icon.component}Shape(), size: size)`,
    "    }",
    "}",
    "",
  ].join("\n");
}
