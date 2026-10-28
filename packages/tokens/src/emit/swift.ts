import { double } from "./format";
import { resolve, type ResolvedColor, type ResolvedPair, type TokenModel } from "./model";
import { identifier } from "./name";
import type { Srgb } from "../color";
import { num } from "../number";
import type { TokenSource } from "../types";

const PREAMBLE = `public struct JvdmOklch: Sendable, Equatable {
    public let l: Double
    public let c: Double
    public let h: Double
    public let alpha: Double

    public init(l: Double, c: Double, h: Double, alpha: Double = 1.0) {
        self.l = l
        self.c = c
        self.h = h
        self.alpha = alpha
    }
}

public struct JvdmRgb: Sendable, Equatable {
    public let red: Double
    public let green: Double
    public let blue: Double
    public let alpha: Double

    public init(red: Double, green: Double, blue: Double, alpha: Double = 1.0) {
        self.red = red
        self.green = green
        self.blue = blue
        self.alpha = alpha
    }
}

public struct JvdmColorValue: Sendable, Equatable {
    public let oklch: JvdmOklch
    public let srgb: JvdmRgb
    public let displayP3: JvdmRgb

    public init(oklch: JvdmOklch, srgb: JvdmRgb, displayP3: JvdmRgb) {
        self.oklch = oklch
        self.srgb = srgb
        self.displayP3 = displayP3
    }
}

public struct JvdmColorPair: Sendable, Equatable {
    public let light: JvdmColorValue
    public let dark: JvdmColorValue

    public init(light: JvdmColorValue, dark: JvdmColorValue) {
        self.light = light
        self.dark = dark
    }
}

public struct JvdmTextSize: Sendable, Equatable {
    public let size: Double
    public let lineHeight: Double

    public init(size: Double, lineHeight: Double) {
        self.size = size
        self.lineHeight = lineHeight
    }
}

public struct JvdmBezier: Sendable, Equatable {
    public let x1: Double
    public let y1: Double
    public let x2: Double
    public let y2: Double

    public init(x1: Double, y1: Double, x2: Double, y2: Double) {
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
    }
}

public struct JvdmShadowLayer: Sendable, Equatable {
    public let x: Double
    public let y: Double
    public let blur: Double
    public let spread: Double
    public let color: JvdmColorPair

    public init(x: Double, y: Double, blur: Double, spread: Double, color: JvdmColorPair) {
        self.x = x
        self.y = y
        self.blur = blur
        self.spread = spread
        self.color = color
    }
}`;

const rgb = ({ r, g, b, alpha }: Srgb): string =>
  `JvdmRgb(red: ${double(r / 255)}, green: ${double(g / 255)}, blue: ${double(b / 255)}, alpha: ${double(alpha)})`;

const value = (color: ResolvedColor): string =>
  [
    "JvdmColorValue(",
    `oklch: JvdmOklch(l: ${double(color.oklch.l)}, c: ${double(color.oklch.c)}, h: ${double(color.oklch.h)}, alpha: ${double(color.oklch.alpha ?? 1)}), `,
    `srgb: ${rgb(color.srgb)}, `,
    `displayP3: ${rgb(color.displayP3)})`,
  ].join("");

const pair = (value_: ResolvedPair): string =>
  `JvdmColorPair(\n            light: ${value(value_.light)},\n            dark: ${value(value_.dark)}\n        )`;

function enumeration(name: string, cases: { token: string }[]): string {
  const lines = cases.map(({ token }) => `    case ${identifier(token)} = "${token}"`);
  return `public enum ${name}: String, CaseIterable, Sendable {\n${lines.join("\n")}\n}`;
}

function tokens(model: TokenModel): string {
  const colors = model.colors.map(
    ({ token, value: resolved }) => `        .${identifier(token)}: ${pair(resolved)},`,
  );

  const text = model.text.map(
    ({ step, size, lineHeight }) =>
      `        .${identifier(step)}: JvdmTextSize(size: ${double(size)}, lineHeight: ${double(lineHeight)}),`,
  );

  const shadow = model.shadow.map(({ step, layers }) => {
    const entries = layers.map(
      (layer) =>
        `            JvdmShadowLayer(x: ${double(layer.x)}, y: ${double(layer.y)}, blur: ${double(layer.blur)}, spread: ${double(layer.spread)}, color: ${pair(layer.color)}),`,
    );
    return `        .${identifier(step)}: [\n${entries.join("\n")}\n        ],`;
  });

  return [
    "public enum JvdmTokens {",
    `    public static let fontSans: [String] = [${model.font[0].stack.map((entry) => `"${entry}"`).join(", ")}]`,
    `    public static let fontMono: [String] = [${model.font[1].stack.map((entry) => `"${entry}"`).join(", ")}]`,
    "",
    `    public static let spacing: Double = ${double(model.spacing)}`,
    "",
    "    public static let colors: [JvdmColorToken: JvdmColorPair] = [",
    ...colors,
    "    ]",
    "",
    "    public static let text: [JvdmTextStep: JvdmTextSize] = [",
    ...text,
    "    ]",
    "",
    "    public static let tracking: [JvdmTrackingStep: Double] = [",
    ...model.tracking.map(({ step, em }) => `        .${identifier(step)}: ${double(em)},`),
    "    ]",
    "",
    "    public static let weight: [JvdmWeightStep: Int] = [",
    ...model.weight.map(({ step, value: weight }) => `        .${identifier(step)}: ${weight},`),
    "    ]",
    "",
    "    public static let radius: [JvdmRadiusStep: Double] = [",
    ...model.radius.map(({ step, px }) => `        .${identifier(step)}: ${double(px)},`),
    "    ]",
    "",
    "    public static let ease: [JvdmEaseStep: JvdmBezier] = [",
    ...model.ease.map(
      ({ step, bezier }) =>
        `        .${identifier(step)}: JvdmBezier(x1: ${double(bezier[0])}, y1: ${double(bezier[1])}, x2: ${double(bezier[2])}, y2: ${double(bezier[3])}),`,
    ),
    "    ]",
    "",
    "    public static let duration: [JvdmDurationStep: TimeInterval] = [",
    ...model.duration.map(({ step, ms }) => `        .${identifier(step)}: ${num(ms / 1000)},`),
    "    ]",
    "",
    "    public static let shadow: [JvdmShadowStep: [JvdmShadowLayer]] = [",
    ...shadow,
    "    ]",
    "}",
  ].join("\n");
}

export function emitSwift(source: TokenSource): string {
  const model = resolve(source);

  return [
    "import Foundation",
    "",
    PREAMBLE,
    "",
    enumeration(
      "JvdmColorToken",
      model.colors.map(({ token }) => ({ token })),
    ),
    "",
    enumeration(
      "JvdmTextStep",
      model.text.map(({ step }) => ({ token: step })),
    ),
    "",
    enumeration(
      "JvdmTrackingStep",
      model.tracking.map(({ step }) => ({ token: step })),
    ),
    "",
    enumeration(
      "JvdmWeightStep",
      model.weight.map(({ step }) => ({ token: step })),
    ),
    "",
    enumeration(
      "JvdmRadiusStep",
      model.radius.map(({ step }) => ({ token: step })),
    ),
    "",
    enumeration(
      "JvdmEaseStep",
      model.ease.map(({ step }) => ({ token: step })),
    ),
    "",
    enumeration(
      "JvdmDurationStep",
      model.duration.map(({ step }) => ({ token: step })),
    ),
    "",
    enumeration(
      "JvdmShadowStep",
      model.shadow.map(({ step }) => ({ token: step })),
    ),
    "",
    tokens(model),
    "",
  ].join("\n");
}
