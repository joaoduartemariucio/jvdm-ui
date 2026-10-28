import { argb } from "./format";
import { resolve, type ResolvedColor, type ResolvedPair, type TokenModel } from "./model";
import { constantName } from "./name";
import type { Srgb } from "../color";
import { num } from "../number";
import type { TokenSource } from "../types";

const float = (value: number): string => `${num(value)}f`;

const PREAMBLE = `public data class JvdmOklch(
    public val l: Float,
    public val c: Float,
    public val h: Float,
    public val alpha: Float = 1f,
)

public data class JvdmRgb(
    public val red: Float,
    public val green: Float,
    public val blue: Float,
    public val alpha: Float = 1f,
)

public data class JvdmColorValue(
    public val oklch: JvdmOklch,
    public val srgb: JvdmRgb,
    public val displayP3: JvdmRgb,
    public val argb: Long,
)

public data class JvdmColorPair(
    public val light: JvdmColorValue,
    public val dark: JvdmColorValue,
)

public data class JvdmTextSize(
    public val size: Float,
    public val lineHeight: Float,
)

public data class JvdmBezier(
    public val x1: Float,
    public val y1: Float,
    public val x2: Float,
    public val y2: Float,
)

public data class JvdmShadowLayer(
    public val x: Float,
    public val y: Float,
    public val blur: Float,
    public val spread: Float,
    public val color: JvdmColorPair,
)`;

const rgb = ({ r, g, b, alpha }: Srgb): string =>
  `JvdmRgb(${float(r / 255)}, ${float(g / 255)}, ${float(b / 255)}, ${float(alpha)})`;

const value = (color: ResolvedColor): string =>
  [
    "JvdmColorValue(",
    `JvdmOklch(${float(color.oklch.l)}, ${float(color.oklch.c)}, ${float(color.oklch.h)}, ${float(color.oklch.alpha ?? 1)}), `,
    `${rgb(color.srgb)}, `,
    `${rgb(color.displayP3)}, `,
    `${argb(color.srgb)}L)`,
  ].join("");

const pair = (resolved: ResolvedPair): string =>
  `JvdmColorPair(\n            ${value(resolved.light)},\n            ${value(resolved.dark)},\n        )`;

function enumeration(name: string, tokens: string[]): string {
  const cases = tokens.map((token) => `    ${constantName(token)}("${token}"),`);
  return [
    `public enum class ${name}(public val token: String) {`,
    ...cases,
    "    ;",
    "",
    "    public companion object {",
    `        public fun of(token: String): ${name} = entries.first { it.token == token }`,
    "    }",
    "}",
  ].join("\n");
}

function tokens(model: TokenModel): string {
  const entry = (name: string, token: string, body: string) =>
    `        ${name}.${constantName(token)} to ${body},`;

  const shadow = model.shadow.map(({ step, layers }) => {
    const body = layers.map(
      (layer) =>
        `            JvdmShadowLayer(${float(layer.x)}, ${float(layer.y)}, ${float(layer.blur)}, ${float(layer.spread)}, ${pair(layer.color)}),`,
    );
    return `        JvdmShadowStep.${constantName(step)} to listOf(\n${body.join("\n")}\n        ),`;
  });

  return [
    "public object JvdmTokens {",
    `    public val fontSans: List<String> = listOf(${model.font[0].stack.map((family) => `"${family}"`).join(", ")})`,
    `    public val fontMono: List<String> = listOf(${model.font[1].stack.map((family) => `"${family}"`).join(", ")})`,
    "",
    `    public val spacing: Float = ${float(model.spacing)}`,
    "",
    "    public val colors: Map<JvdmColorToken, JvdmColorPair> = mapOf(",
    ...model.colors.map(({ token, value: resolved }) =>
      entry("JvdmColorToken", token, pair(resolved)),
    ),
    "    )",
    "",
    "    public val text: Map<JvdmTextStep, JvdmTextSize> = mapOf(",
    ...model.text.map(({ step, size, lineHeight }) =>
      entry("JvdmTextStep", step, `JvdmTextSize(${float(size)}, ${float(lineHeight)})`),
    ),
    "    )",
    "",
    "    public val tracking: Map<JvdmTrackingStep, Float> = mapOf(",
    ...model.tracking.map(({ step, em }) => entry("JvdmTrackingStep", step, float(em))),
    "    )",
    "",
    "    public val weight: Map<JvdmWeightStep, Int> = mapOf(",
    ...model.weight.map(({ step, value: weight }) => entry("JvdmWeightStep", step, String(weight))),
    "    )",
    "",
    "    public val radius: Map<JvdmRadiusStep, Float> = mapOf(",
    ...model.radius.map(({ step, px }) => entry("JvdmRadiusStep", step, float(px))),
    "    )",
    "",
    "    public val ease: Map<JvdmEaseStep, JvdmBezier> = mapOf(",
    ...model.ease.map(({ step, bezier }) =>
      entry(
        "JvdmEaseStep",
        step,
        `JvdmBezier(${float(bezier[0])}, ${float(bezier[1])}, ${float(bezier[2])}, ${float(bezier[3])})`,
      ),
    ),
    "    )",
    "",
    "    public val duration: Map<JvdmDurationStep, Int> = mapOf(",
    ...model.duration.map(({ step, ms }) => entry("JvdmDurationStep", step, String(ms))),
    "    )",
    "",
    "    public val shadow: Map<JvdmShadowStep, List<JvdmShadowLayer>> = mapOf(",
    ...shadow,
    "    )",
    "}",
  ].join("\n");
}

export function emitKotlin(source: TokenSource): string {
  const model = resolve(source);

  return [
    "package com.jvdm.ui.tokens",
    "",
    PREAMBLE,
    "",
    enumeration(
      "JvdmColorToken",
      model.colors.map(({ token }) => token),
    ),
    "",
    enumeration(
      "JvdmTextStep",
      model.text.map(({ step }) => step),
    ),
    "",
    enumeration(
      "JvdmTrackingStep",
      model.tracking.map(({ step }) => step),
    ),
    "",
    enumeration(
      "JvdmWeightStep",
      model.weight.map(({ step }) => step),
    ),
    "",
    enumeration(
      "JvdmRadiusStep",
      model.radius.map(({ step }) => step),
    ),
    "",
    enumeration(
      "JvdmEaseStep",
      model.ease.map(({ step }) => step),
    ),
    "",
    enumeration(
      "JvdmDurationStep",
      model.duration.map(({ step }) => step),
    ),
    "",
    enumeration(
      "JvdmShadowStep",
      model.shadow.map(({ step }) => step),
    ),
    "",
    tokens(model),
    "",
  ].join("\n");
}
