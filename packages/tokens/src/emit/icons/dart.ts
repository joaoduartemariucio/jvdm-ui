import type { Icon, IconShape, Segment } from "../../icons";
import { double } from "../format";

function segment(value: Segment): string {
  if (value.kind === "move") return `..moveTo(${double(value.to.x)}, ${double(value.to.y)})`;
  if (value.kind === "line") return `..lineTo(${double(value.to.x)}, ${double(value.to.y)})`;
  if (value.kind === "close") return "..close()";
  return `..cubicTo(${double(value.control1.x)}, ${double(value.control1.y)}, ${double(value.control2.x)}, ${double(value.control2.y)}, ${double(value.to.x)}, ${double(value.to.y)})`;
}

function shape(value: IconShape): string[] {
  if (value.kind === "path") return value.segments.map(segment);

  if (value.kind === "circle") {
    return [
      `..addOval(Rect.fromCircle(center: const Offset(${double(value.cx)}, ${double(value.cy)}), radius: ${double(value.r)}))`,
    ];
  }

  return [
    `..addRRect(RRect.fromLTRBR(${double(value.x)}, ${double(value.y)}, ${double(value.x + value.width)}, ${double(value.y + value.height)}, const Radius.circular(${double(value.rx)})))`,
  ];
}

export const dartFileName = (name: string): string => `${name.replace(/-/g, "_")}.dart`;

export function emitDartBarrel(icons: Icon[]): string {
  return [
    ...icons.map((icon) => `export '${dartFileName(icon.name)}';`),
    "export '../../tokens/icon.dart';",
    "",
  ].join("\n");
}

export function emitDartIcon(icon: Icon): string {
  const body = icon.shapes.flatMap(shape).map((line) => `    ${line}`);

  return [
    "import 'package:flutter/widgets.dart';",
    "",
    "import '../../tokens/icon.dart';",
    "",
    `class Jvdm${icon.component} extends JvdmIconData {`,
    `  const Jvdm${icon.component}();`,
    "",
    "  @override",
    `  String get name => '${icon.name}';`,
    "",
    "  @override",
    "  Path trace() {",
    "    return Path()",
    ...body.map((line, index) => (index === body.length - 1 ? `${line};` : line)),
    "  }",
    "}",
    "",
  ].join("\n");
}
