import SwiftUI

extension JvdmRgb {
    public var color: Color {
        Color(.displayP3, red: red, green: green, blue: blue, opacity: alpha)
    }
}

extension JvdmColorValue {
    public var color: Color { displayP3.color }
}

public struct JvdmTheme: Sendable, Equatable {
    public let scheme: ColorScheme

    public init(scheme: ColorScheme) {
        self.scheme = scheme
    }

    public func value(_ token: JvdmColorToken) -> JvdmColorValue {
        guard let pair = JvdmTokens.colors[token] else {
            preconditionFailure("missing color token \(token.rawValue)")
        }
        return scheme == .dark ? pair.dark : pair.light
    }

    public func color(_ token: JvdmColorToken) -> Color {
        value(token).color
    }

    public func radius(_ step: JvdmRadiusStep) -> CGFloat {
        CGFloat(JvdmTokens.radius[step] ?? 0)
    }

    public func spacing(_ steps: Double) -> CGFloat {
        CGFloat(JvdmTokens.spacing * steps)
    }

    public func size(_ step: JvdmTextStep) -> CGFloat {
        CGFloat(JvdmTokens.text[step]?.size ?? 0)
    }

    public func lineSpacing(_ step: JvdmTextStep) -> CGFloat {
        guard let text = JvdmTokens.text[step] else { return 0 }
        return CGFloat(text.size * (text.lineHeight - 1))
    }

    public func tracking(_ step: JvdmTrackingStep, _ textStep: JvdmTextStep) -> CGFloat {
        CGFloat((JvdmTokens.tracking[step] ?? 0) * (JvdmTokens.text[textStep]?.size ?? 0))
    }

    public func weight(_ step: JvdmWeightStep) -> Font.Weight {
        switch step {
        case .normal: return .regular
        case .medium: return .medium
        case .bold: return .bold
        }
    }

    public func font(_ step: JvdmTextStep, _ weight: JvdmWeightStep = .normal) -> Font {
        .system(size: size(step), weight: self.weight(weight))
    }

    public func mono(_ step: JvdmTextStep, _ weight: JvdmWeightStep = .normal) -> Font {
        .system(size: size(step), weight: self.weight(weight), design: .monospaced)
    }

    public func duration(_ step: JvdmDurationStep) -> TimeInterval {
        JvdmTokens.duration[step] ?? 0
    }

    public func ease(_ step: JvdmEaseStep) -> Animation {
        guard let bezier = JvdmTokens.ease[step] else { return .linear }
        return .timingCurve(bezier.x1, bezier.y1, bezier.x2, bezier.y2, duration: duration(.base))
    }
}

private struct JvdmThemeKey: EnvironmentKey {
    static let defaultValue = JvdmTheme(scheme: .light)
}

extension EnvironmentValues {
    public var jvdmTheme: JvdmTheme {
        get { self[JvdmThemeKey.self] }
        set { self[JvdmThemeKey.self] = newValue }
    }
}

private struct JvdmThemeProvider: ViewModifier {
    @Environment(\.colorScheme) private var scheme

    func body(content: Content) -> some View {
        content
            .environment(\.jvdmTheme, JvdmTheme(scheme: scheme))
            .background(JvdmTheme(scheme: scheme).color(.app))
            .foregroundStyle(JvdmTheme(scheme: scheme).color(.ink))
    }
}

extension View {
    public func jvdmTheme() -> some View {
        modifier(JvdmThemeProvider())
    }
}
