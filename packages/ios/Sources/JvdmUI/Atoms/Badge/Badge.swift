import SwiftUI

public enum BadgeTone: String, CaseIterable, Sendable {
    case neutral
    case accent
    case ok
    case warn
    case danger
    case info

    public var background: JvdmColorToken {
        switch self {
        case .neutral: return .raised
        case .accent: return .accentSoft
        case .ok: return .okSoft
        case .warn: return .warnSoft
        case .danger: return .dangerSoft
        case .info: return .infoSoft
        }
    }

    public var foreground: JvdmColorToken {
        switch self {
        case .neutral: return .inkSoft
        case .accent: return .accentInk
        case .ok: return .ok
        case .warn: return .warn
        case .danger: return .danger
        case .info: return .info
        }
    }
}

public struct Badge<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let tone: BadgeTone
    private let content: Content

    public init(tone: BadgeTone = .neutral, @ViewBuilder content: () -> Content) {
        self.tone = tone
        self.content = content()
    }

    public var body: some View {
        HStack(spacing: theme.spacing(1)) {
            content
        }
        .font(theme.font(.xxs, .medium))
        .foregroundStyle(theme.color(tone.foreground))
        .padding(.horizontal, theme.spacing(2))
        .padding(.vertical, theme.spacing(0.5))
        .background(theme.color(tone.background))
        .clipShape(RoundedRectangle(cornerRadius: theme.radius(.xs), style: .continuous))
    }
}

extension Badge where Content == Text {
    public init(_ label: String, tone: BadgeTone = .neutral) {
        self.init(tone: tone) { Text(label) }
    }
}
