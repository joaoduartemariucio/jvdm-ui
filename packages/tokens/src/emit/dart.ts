import { argb, double } from "./format";
import { resolve, type ResolvedColor, type ResolvedPair, type TokenModel } from "./model";
import { identifier } from "./name";
import type { Srgb } from "../color";
import type { TokenSource } from "../types";

const PREAMBLE = `class JvdmOklch {
  const JvdmOklch(this.l, this.c, this.h, [this.alpha = 1.0]);

  final double l;
  final double c;
  final double h;
  final double alpha;
}

class JvdmRgb {
  const JvdmRgb(this.red, this.green, this.blue, [this.alpha = 1.0]);

  final double red;
  final double green;
  final double blue;
  final double alpha;
}

class JvdmColorValue {
  const JvdmColorValue(this.oklch, this.srgb, this.displayP3, this.argb);

  final JvdmOklch oklch;
  final JvdmRgb srgb;
  final JvdmRgb displayP3;
  final int argb;
}

class JvdmColorPair {
  const JvdmColorPair(this.light, this.dark);

  final JvdmColorValue light;
  final JvdmColorValue dark;
}

class JvdmTextSize {
  const JvdmTextSize(this.size, this.lineHeight);

  final double size;
  final double lineHeight;
}

class JvdmBezier {
  const JvdmBezier(this.x1, this.y1, this.x2, this.y2);

  final double x1;
  final double y1;
  final double x2;
  final double y2;
}

class JvdmShadowLayer {
  const JvdmShadowLayer(this.x, this.y, this.blur, this.spread, this.color);

  final double x;
  final double y;
  final double blur;
  final double spread;
  final JvdmColorPair color;
}`;

const rgb = ({ r, g, b, alpha }: Srgb): string =>
  `JvdmRgb(${double(r / 255)}, ${double(g / 255)}, ${double(b / 255)}, ${double(alpha)})`;

const value = (color: ResolvedColor): string =>
  [
    "JvdmColorValue(",
    `JvdmOklch(${double(color.oklch.l)}, ${double(color.oklch.c)}, ${double(color.oklch.h)}, ${double(color.oklch.alpha ?? 1)}), `,
    `${rgb(color.srgb)}, `,
    `${rgb(color.displayP3)}, `,
    `${argb(color.srgb)})`,
  ].join("");

const pair = (resolved: ResolvedPair): string =>
  `JvdmColorPair(\n    ${value(resolved.light)},\n    ${value(resolved.dark)},\n  )`;

function enumeration(name: string, tokens: string[]): string {
  const cases = tokens.map(
    (token, index) =>
      `  ${identifier(token)}('${token}')${index === tokens.length - 1 ? ";" : ","}`,
  );
  return [
    `enum ${name} {`,
    ...cases,
    "",
    `  const ${name}(this.token);`,
    "",
    "  final String token;",
    "}",
  ].join("\n");
}

function constant(name: string, type: string, entries: string[]): string {
  return [`const Map<${type}> ${name} = <${type}>{`, ...entries, "};"].join("\n");
}

function tokens(model: TokenModel): string {
  const shadow = model.shadow.map(({ step, layers }) => {
    const body = layers.map(
      (layer) =>
        `    JvdmShadowLayer(${double(layer.x)}, ${double(layer.y)}, ${double(layer.blur)}, ${double(layer.spread)}, ${pair(layer.color)}),`,
    );
    return `  JvdmShadowStep.${identifier(step)}: <JvdmShadowLayer>[\n${body.join("\n")}\n  ],`;
  });

  return [
    `const List<String> jvdmFontSans = <String>[${model.font[0].stack.map((family) => `'${family}'`).join(", ")}];`,
    `const List<String> jvdmFontMono = <String>[${model.font[1].stack.map((family) => `'${family}'`).join(", ")}];`,
    "",
    `const double jvdmSpacing = ${double(model.spacing)};`,
    "",
    constant(
      "jvdmColors",
      "JvdmColorToken, JvdmColorPair",
      model.colors.map(
        ({ token, value: resolved }) => `  JvdmColorToken.${identifier(token)}: ${pair(resolved)},`,
      ),
    ),
    "",
    constant(
      "jvdmText",
      "JvdmTextStep, JvdmTextSize",
      model.text.map(
        ({ step, size, lineHeight }) =>
          `  JvdmTextStep.${identifier(step)}: JvdmTextSize(${double(size)}, ${double(lineHeight)}),`,
      ),
    ),
    "",
    constant(
      "jvdmTracking",
      "JvdmTrackingStep, double",
      model.tracking.map(
        ({ step, em }) => `  JvdmTrackingStep.${identifier(step)}: ${double(em)},`,
      ),
    ),
    "",
    constant(
      "jvdmWeight",
      "JvdmWeightStep, int",
      model.weight.map(
        ({ step, value: weight }) => `  JvdmWeightStep.${identifier(step)}: ${weight},`,
      ),
    ),
    "",
    constant(
      "jvdmRadius",
      "JvdmRadiusStep, double",
      model.radius.map(({ step, px }) => `  JvdmRadiusStep.${identifier(step)}: ${double(px)},`),
    ),
    "",
    constant(
      "jvdmEase",
      "JvdmEaseStep, JvdmBezier",
      model.ease.map(
        ({ step, bezier }) =>
          `  JvdmEaseStep.${identifier(step)}: JvdmBezier(${double(bezier[0])}, ${double(bezier[1])}, ${double(bezier[2])}, ${double(bezier[3])}),`,
      ),
    ),
    "",
    constant(
      "jvdmDuration",
      "JvdmDurationStep, Duration",
      model.duration.map(
        ({ step, ms }) => `  JvdmDurationStep.${identifier(step)}: Duration(milliseconds: ${ms}),`,
      ),
    ),
    "",
    constant("jvdmShadow", "JvdmShadowStep, List<JvdmShadowLayer>", shadow),
  ].join("\n");
}

export function emitDart(source: TokenSource): string {
  const model = resolve(source);

  return [
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
