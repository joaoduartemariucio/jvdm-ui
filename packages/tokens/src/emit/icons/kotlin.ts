import { shapeSegments, type Icon, type Segment } from "../../icons";
import { num } from "../../number";

const float = (value: number): string => `${num(value)}f`;

function segment(value: Segment): string {
  if (value.kind === "move") return `moveTo(${float(value.to.x)}, ${float(value.to.y)})`;
  if (value.kind === "line") return `lineTo(${float(value.to.x)}, ${float(value.to.y)})`;
  if (value.kind === "close") return "close()";
  return `curveTo(${[value.control1, value.control2, value.to]
    .flatMap((point) => [float(point.x), float(point.y)])
    .join(", ")})`;
}

export function emitKotlinIcon(icon: Icon): string {
  const body = icon.shapes.flatMap(shapeSegments).map((value) => `        ${segment(value)}`);

  return [
    "package com.jvdm.ui.atoms.icon",
    "",
    "import androidx.compose.runtime.Composable",
    "import androidx.compose.ui.Modifier",
    "import androidx.compose.ui.graphics.vector.ImageVector",
    "import com.jvdm.ui.theme.JvdmIconSize",
    "",
    `public val Jvdm${icon.component}: ImageVector by lazy {`,
    `    jvdmIcon("${icon.name}") {`,
    ...body,
    "    }",
    "}",
    "",
    "@Composable",
    `public fun Jvdm${icon.component}(`,
    "    modifier: Modifier = Modifier,",
    "    size: JvdmIconSize = JvdmIconSize.MD,",
    ") {",
    `    JvdmIcon(Jvdm${icon.component}, modifier = modifier, size = size)`,
    "}",
    "",
  ].join("\n");
}
