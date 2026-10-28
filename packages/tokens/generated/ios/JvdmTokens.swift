import Foundation

public struct JvdmOklch: Sendable, Equatable {
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
}

public enum JvdmColorToken: String, CaseIterable, Sendable {
    case app = "app"
    case rail = "rail"
    case panel = "panel"
    case surface = "surface"
    case field = "field"
    case raised = "raised"
    case line = "line"
    case lineStrong = "line-strong"
    case ink = "ink"
    case inkSoft = "ink-soft"
    case inkMuted = "ink-muted"
    case inkDim = "ink-dim"
    case accent = "accent"
    case accentInk = "accent-ink"
    case accentSoft = "accent-soft"
    case onAccent = "on-accent"
    case ok = "ok"
    case okSoft = "ok-soft"
    case warn = "warn"
    case warnSoft = "warn-soft"
    case danger = "danger"
    case dangerSoft = "danger-soft"
    case info = "info"
    case infoSoft = "info-soft"
}

public enum JvdmTextStep: String, CaseIterable, Sendable {
    case xxs = "2xs"
    case xs = "xs"
    case sm = "sm"
    case base = "base"
    case lg = "lg"
    case xl = "xl"
    case xxl = "2xl"
    case display = "display"
}

public enum JvdmTrackingStep: String, CaseIterable, Sendable {
    case caps = "caps"
    case code = "code"
    case tight = "tight"
    case display = "display"
}

public enum JvdmWeightStep: String, CaseIterable, Sendable {
    case normal = "normal"
    case medium = "medium"
    case bold = "bold"
}

public enum JvdmRadiusStep: String, CaseIterable, Sendable {
    case xs = "xs"
    case sm = "sm"
    case md = "md"
    case lg = "lg"
    case xl = "xl"
}

public enum JvdmEaseStep: String, CaseIterable, Sendable {
    case out = "out"
    case inOut = "in-out"
    case over = "over"
}

public enum JvdmDurationStep: String, CaseIterable, Sendable {
    case instant = "instant"
    case fast = "fast"
    case base = "base"
    case slow = "slow"
}

public enum JvdmShadowStep: String, CaseIterable, Sendable {
    case raised = "raised"
    case popover = "popover"
    case modal = "modal"
}

public enum JvdmTokens {
    public static let fontSans: [String] = ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"]
    public static let fontMono: [String] = ["ui-monospace", "SF Mono", "JetBrains Mono", "Menlo", "Consolas", "monospace"]

    public static let spacing: Double = 4.0

    public static let colors: [JvdmColorToken: JvdmColorPair] = [
        .app: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.965, c: 0.012, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.972549, green: 0.952941, blue: 0.921569, alpha: 1.0), displayP3: JvdmRgb(red: 0.968627, green: 0.952941, blue: 0.92549, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.18, c: 0.015, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.082353, green: 0.066667, blue: 0.039216, alpha: 1.0), displayP3: JvdmRgb(red: 0.082353, green: 0.066667, blue: 0.043137, alpha: 1.0))
        ),
        .rail: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.945, c: 0.014, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.94902, green: 0.92549, blue: 0.890196, alpha: 1.0), displayP3: JvdmRgb(red: 0.945098, green: 0.92549, blue: 0.894118, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.15, c: 0.018, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.058824, green: 0.039216, blue: 0.015686, alpha: 1.0), displayP3: JvdmRgb(red: 0.058824, green: 0.039216, blue: 0.019608, alpha: 1.0))
        ),
        .panel: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.95, c: 0.01, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.94902, green: 0.933333, blue: 0.905882, alpha: 1.0), displayP3: JvdmRgb(red: 0.945098, green: 0.933333, blue: 0.909804, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.17, c: 0.016, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.07451, green: 0.058824, blue: 0.031373, alpha: 1.0), displayP3: JvdmRgb(red: 0.07451, green: 0.058824, blue: 0.031373, alpha: 1.0))
        ),
        .surface: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.99, c: 0.008, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 1.0, green: 0.984314, blue: 0.964706, alpha: 1.0), displayP3: JvdmRgb(red: 0.996078, green: 0.984314, blue: 0.964706, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.23, c: 0.015, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.129412, green: 0.109804, blue: 0.082353, alpha: 1.0), displayP3: JvdmRgb(red: 0.12549, green: 0.109804, blue: 0.086275, alpha: 1.0))
        ),
        .field: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.98, c: 0.008, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.984314, green: 0.972549, blue: 0.952941, alpha: 1.0), displayP3: JvdmRgb(red: 0.984314, green: 0.972549, blue: 0.952941, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.215, c: 0.015, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.113725, green: 0.098039, blue: 0.070588, alpha: 1.0), displayP3: JvdmRgb(red: 0.113725, green: 0.098039, blue: 0.070588, alpha: 1.0))
        ),
        .raised: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.93, c: 0.012, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.92549, green: 0.905882, blue: 0.87451, alpha: 1.0), displayP3: JvdmRgb(red: 0.921569, green: 0.905882, blue: 0.878431, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.3, c: 0.02, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.2, green: 0.176471, blue: 0.137255, alpha: 1.0), displayP3: JvdmRgb(red: 0.196078, green: 0.176471, blue: 0.141176, alpha: 1.0))
        ),
        .line: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.89, c: 0.015, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.878431, green: 0.854902, blue: 0.815686, alpha: 1.0), displayP3: JvdmRgb(red: 0.87451, green: 0.854902, blue: 0.819608, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.275, c: 0.018, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.176471, green: 0.152941, blue: 0.117647, alpha: 1.0), displayP3: JvdmRgb(red: 0.172549, green: 0.152941, blue: 0.121569, alpha: 1.0))
        ),
        .lineStrong: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.82, c: 0.018, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.796078, green: 0.764706, blue: 0.717647, alpha: 1.0), displayP3: JvdmRgb(red: 0.788235, green: 0.764706, blue: 0.72549, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.35, c: 0.02, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.25098, green: 0.223529, blue: 0.184314, alpha: 1.0), displayP3: JvdmRgb(red: 0.247059, green: 0.227451, blue: 0.188235, alpha: 1.0))
        ),
        .ink: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.23, c: 0.02, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.133333, green: 0.109804, blue: 0.070588, alpha: 1.0), displayP3: JvdmRgb(red: 0.129412, green: 0.109804, blue: 0.07451, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.95, c: 0.01, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.94902, green: 0.933333, blue: 0.905882, alpha: 1.0), displayP3: JvdmRgb(red: 0.945098, green: 0.933333, blue: 0.909804, alpha: 1.0))
        ),
        .inkSoft: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.36, c: 0.018, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.258824, green: 0.235294, blue: 0.2, alpha: 1.0), displayP3: JvdmRgb(red: 0.254902, green: 0.235294, blue: 0.203922, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.82, c: 0.016, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.792157, green: 0.764706, blue: 0.72549, alpha: 1.0), displayP3: JvdmRgb(red: 0.788235, green: 0.764706, blue: 0.729412, alpha: 1.0))
        ),
        .inkMuted: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.51, c: 0.014, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.419608, green: 0.396078, blue: 0.364706, alpha: 1.0), displayP3: JvdmRgb(red: 0.415686, green: 0.396078, blue: 0.368627, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.65, c: 0.012, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.576471, green: 0.556863, blue: 0.529412, alpha: 1.0), displayP3: JvdmRgb(red: 0.572549, green: 0.560784, blue: 0.533333, alpha: 1.0))
        ),
        .inkDim: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.56, c: 0.012, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.470588, green: 0.454902, blue: 0.427451, alpha: 1.0), displayP3: JvdmRgb(red: 0.470588, green: 0.454902, blue: 0.427451, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.57, c: 0.012, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.482353, green: 0.466667, blue: 0.439216, alpha: 1.0), displayP3: JvdmRgb(red: 0.478431, green: 0.466667, blue: 0.439216, alpha: 1.0))
        ),
        .accent: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.25, c: 0.025, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.156863, green: 0.12549, blue: 0.078431, alpha: 1.0), displayP3: JvdmRgb(red: 0.152941, green: 0.129412, blue: 0.082353, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.94, c: 0.015, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.945098, green: 0.917647, blue: 0.878431, alpha: 1.0), displayP3: JvdmRgb(red: 0.941176, green: 0.917647, blue: 0.882353, alpha: 1.0))
        ),
        .accentInk: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.33, c: 0.022, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.235294, green: 0.203922, blue: 0.160784, alpha: 1.0), displayP3: JvdmRgb(red: 0.227451, green: 0.203922, blue: 0.164706, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.87, c: 0.018, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.858824, green: 0.827451, blue: 0.780392, alpha: 1.0), displayP3: JvdmRgb(red: 0.85098, green: 0.827451, blue: 0.788235, alpha: 1.0))
        ),
        .accentSoft: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.92, c: 0.025, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.933333, green: 0.890196, blue: 0.827451, alpha: 1.0), displayP3: JvdmRgb(red: 0.92549, green: 0.890196, blue: 0.831373, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.29, c: 0.02, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.192157, green: 0.164706, blue: 0.12549, alpha: 1.0), displayP3: JvdmRgb(red: 0.188235, green: 0.164706, blue: 0.129412, alpha: 1.0))
        ),
        .onAccent: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.99, c: 0.008, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 1.0, green: 0.984314, blue: 0.964706, alpha: 1.0), displayP3: JvdmRgb(red: 0.996078, green: 0.984314, blue: 0.964706, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.16, c: 0.018, h: 78.0, alpha: 1.0), srgb: JvdmRgb(red: 0.070588, green: 0.047059, blue: 0.019608, alpha: 1.0), displayP3: JvdmRgb(red: 0.066667, green: 0.05098, blue: 0.023529, alpha: 1.0))
        ),
        .ok: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.5, c: 0.13, h: 155.0, alpha: 1.0), srgb: JvdmRgb(red: 0.0, green: 0.470588, blue: 0.25098, alpha: 1.0), displayP3: JvdmRgb(red: 0.184314, green: 0.462745, blue: 0.27451, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.78, c: 0.12, h: 155.0, alpha: 1.0), srgb: JvdmRgb(red: 0.45098, green: 0.807843, blue: 0.584314, alpha: 1.0), displayP3: JvdmRgb(red: 0.537255, green: 0.8, blue: 0.603922, alpha: 1.0))
        ),
        .okSoft: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.94, c: 0.04, h: 155.0, alpha: 1.0), srgb: JvdmRgb(red: 0.843137, green: 0.956863, blue: 0.878431, alpha: 1.0), displayP3: JvdmRgb(red: 0.866667, green: 0.952941, blue: 0.882353, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.29, c: 0.05, h: 155.0, alpha: 1.0), srgb: JvdmRgb(red: 0.078431, green: 0.2, blue: 0.12549, alpha: 1.0), displayP3: JvdmRgb(red: 0.109804, green: 0.196078, blue: 0.133333, alpha: 1.0))
        ),
        .warn: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.58, c: 0.14, h: 62.0, alpha: 1.0), srgb: JvdmRgb(red: 0.701961, green: 0.388235, blue: 0.0, alpha: 1.0), displayP3: JvdmRgb(red: 0.658824, green: 0.403922, blue: 0.105882, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.78, c: 0.14, h: 62.0, alpha: 1.0), srgb: JvdmRgb(red: 0.964706, green: 0.631373, blue: 0.309804, alpha: 1.0), displayP3: JvdmRgb(red: 0.917647, green: 0.647059, blue: 0.372549, alpha: 1.0))
        ),
        .warnSoft: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.94, c: 0.05, h: 62.0, alpha: 1.0), srgb: JvdmRgb(red: 1.0, green: 0.898039, blue: 0.792157, alpha: 1.0), displayP3: JvdmRgb(red: 1.0, green: 0.901961, blue: 0.803922, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.31, c: 0.06, h: 62.0, alpha: 1.0), srgb: JvdmRgb(red: 0.27451, green: 0.160784, blue: 0.043137, alpha: 1.0), displayP3: JvdmRgb(red: 0.254902, green: 0.164706, blue: 0.066667, alpha: 1.0))
        ),
        .danger: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.51, c: 0.21, h: 22.0, alpha: 1.0), srgb: JvdmRgb(red: 0.760784, green: 0.0, blue: 0.156863, alpha: 1.0), displayP3: JvdmRgb(red: 0.694118, green: 0.12549, blue: 0.184314, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.7, c: 0.18, h: 22.0, alpha: 1.0), srgb: JvdmRgb(red: 0.980392, green: 0.407843, blue: 0.415686, alpha: 1.0), displayP3: JvdmRgb(red: 0.913725, green: 0.443137, blue: 0.431373, alpha: 1.0))
        ),
        .dangerSoft: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.94, c: 0.05, h: 22.0, alpha: 1.0), srgb: JvdmRgb(red: 1.0, green: 0.87451, blue: 0.862745, alpha: 1.0), displayP3: JvdmRgb(red: 1.0, green: 0.878431, blue: 0.866667, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.29, c: 0.07, h: 22.0, alpha: 1.0), srgb: JvdmRgb(red: 0.282353, green: 0.105882, blue: 0.105882, alpha: 1.0), displayP3: JvdmRgb(red: 0.262745, green: 0.113725, blue: 0.109804, alpha: 1.0))
        ),
        .info: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.5, c: 0.14, h: 250.0, alpha: 1.0), srgb: JvdmRgb(red: 0.015686, green: 0.396078, blue: 0.686275, alpha: 1.0), displayP3: JvdmRgb(red: 0.168627, green: 0.392157, blue: 0.662745, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.72, c: 0.11, h: 245.0, alpha: 1.0), srgb: JvdmRgb(red: 0.4, green: 0.670588, blue: 0.898039, alpha: 1.0), displayP3: JvdmRgb(red: 0.462745, green: 0.666667, blue: 0.878431, alpha: 1.0))
        ),
        .infoSoft: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.94, c: 0.035, h: 250.0, alpha: 1.0), srgb: JvdmRgb(red: 0.854902, green: 0.933333, blue: 1.0, alpha: 1.0), displayP3: JvdmRgb(red: 0.870588, green: 0.929412, blue: 1.0, alpha: 1.0)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.29, c: 0.055, h: 245.0, alpha: 1.0), srgb: JvdmRgb(red: 0.062745, green: 0.180392, blue: 0.270588, alpha: 1.0), displayP3: JvdmRgb(red: 0.094118, green: 0.176471, blue: 0.262745, alpha: 1.0))
        ),
    ]

    public static let text: [JvdmTextStep: JvdmTextSize] = [
        .xxs: JvdmTextSize(size: 11.0, lineHeight: 1.45),
        .xs: JvdmTextSize(size: 12.0, lineHeight: 1.45),
        .sm: JvdmTextSize(size: 13.0, lineHeight: 1.5),
        .base: JvdmTextSize(size: 15.0, lineHeight: 1.55),
        .lg: JvdmTextSize(size: 18.0, lineHeight: 1.45),
        .xl: JvdmTextSize(size: 23.0, lineHeight: 1.3),
        .xxl: JvdmTextSize(size: 29.0, lineHeight: 1.2),
        .display: JvdmTextSize(size: 58.0, lineHeight: 0.98),
    ]

    public static let tracking: [JvdmTrackingStep: Double] = [
        .caps: 0.06,
        .code: 0.4,
        .tight: -0.015,
        .display: -0.025,
    ]

    public static let weight: [JvdmWeightStep: Int] = [
        .normal: 400,
        .medium: 500,
        .bold: 700,
    ]

    public static let radius: [JvdmRadiusStep: Double] = [
        .xs: 3.0,
        .sm: 5.0,
        .md: 8.0,
        .lg: 12.0,
        .xl: 20.0,
    ]

    public static let ease: [JvdmEaseStep: JvdmBezier] = [
        .out: JvdmBezier(x1: 0.16, y1: 1.0, x2: 0.3, y2: 1.0),
        .inOut: JvdmBezier(x1: 0.65, y1: 0.0, x2: 0.35, y2: 1.0),
        .over: JvdmBezier(x1: 0.34, y1: 1.42, x2: 0.64, y2: 1.0),
    ]

    public static let duration: [JvdmDurationStep: TimeInterval] = [
        .instant: 0.09,
        .fast: 0.16,
        .base: 0.24,
        .slow: 0.42,
    ]

    public static let shadow: [JvdmShadowStep: [JvdmShadowLayer]] = [
        .raised: [
            JvdmShadowLayer(x: 0.0, y: 1.0, blur: 1.0, spread: 0.0, color: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.23, c: 0.02, h: 78.0, alpha: 0.05), srgb: JvdmRgb(red: 0.133333, green: 0.109804, blue: 0.070588, alpha: 0.05), displayP3: JvdmRgb(red: 0.129412, green: 0.109804, blue: 0.07451, alpha: 0.05)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.0, c: 0.0, h: 0.0, alpha: 0.36), srgb: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.36), displayP3: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.36))
        )),
            JvdmShadowLayer(x: 0.0, y: 2.0, blur: 4.0, spread: -1.0, color: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.23, c: 0.02, h: 78.0, alpha: 0.06), srgb: JvdmRgb(red: 0.133333, green: 0.109804, blue: 0.070588, alpha: 0.06), displayP3: JvdmRgb(red: 0.129412, green: 0.109804, blue: 0.07451, alpha: 0.06)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.0, c: 0.0, h: 0.0, alpha: 0.4), srgb: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.4), displayP3: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.4))
        )),
        ],
        .popover: [
            JvdmShadowLayer(x: 0.0, y: 2.0, blur: 4.0, spread: -2.0, color: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.23, c: 0.02, h: 78.0, alpha: 0.06), srgb: JvdmRgb(red: 0.133333, green: 0.109804, blue: 0.070588, alpha: 0.06), displayP3: JvdmRgb(red: 0.129412, green: 0.109804, blue: 0.07451, alpha: 0.06)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.0, c: 0.0, h: 0.0, alpha: 0.4), srgb: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.4), displayP3: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.4))
        )),
            JvdmShadowLayer(x: 0.0, y: 10.0, blur: 24.0, spread: -6.0, color: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.23, c: 0.02, h: 78.0, alpha: 0.12), srgb: JvdmRgb(red: 0.133333, green: 0.109804, blue: 0.070588, alpha: 0.12), displayP3: JvdmRgb(red: 0.129412, green: 0.109804, blue: 0.07451, alpha: 0.12)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.0, c: 0.0, h: 0.0, alpha: 0.52), srgb: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.52), displayP3: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.52))
        )),
        ],
        .modal: [
            JvdmShadowLayer(x: 0.0, y: 4.0, blur: 10.0, spread: -4.0, color: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.23, c: 0.02, h: 78.0, alpha: 0.08), srgb: JvdmRgb(red: 0.133333, green: 0.109804, blue: 0.070588, alpha: 0.08), displayP3: JvdmRgb(red: 0.129412, green: 0.109804, blue: 0.07451, alpha: 0.08)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.0, c: 0.0, h: 0.0, alpha: 0.44), srgb: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.44), displayP3: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.44))
        )),
            JvdmShadowLayer(x: 0.0, y: 28.0, blur: 64.0, spread: -16.0, color: JvdmColorPair(
            light: JvdmColorValue(oklch: JvdmOklch(l: 0.23, c: 0.02, h: 78.0, alpha: 0.18), srgb: JvdmRgb(red: 0.133333, green: 0.109804, blue: 0.070588, alpha: 0.18), displayP3: JvdmRgb(red: 0.129412, green: 0.109804, blue: 0.07451, alpha: 0.18)),
            dark: JvdmColorValue(oklch: JvdmOklch(l: 0.0, c: 0.0, h: 0.0, alpha: 0.64), srgb: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.64), displayP3: JvdmRgb(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.64))
        )),
        ],
    ]
}
