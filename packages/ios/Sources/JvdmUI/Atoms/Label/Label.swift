import SwiftUI

public enum LabelTone: String, CaseIterable, Sendable {
    case muted
    case dim
    case accent

    public var color: JvdmColorToken {
        switch self {
        case .muted: return .inkMuted
        case .dim: return .inkDim
        case .accent: return .accentInk
        }
    }
}

public struct JvdmLabel<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let tone: LabelTone
    private let content: Content

    public init(tone: LabelTone = .muted, @ViewBuilder content: () -> Content) {
        self.tone = tone
        self.content = content()
    }

    public var body: some View {
        content
            .font(theme.font(.xxs))
            .tracking(theme.tracking(.caps, .xxs))
            .foregroundStyle(theme.color(tone.color))
    }
}

extension JvdmLabel where Content == Text {
    public init(_ text: String, tone: LabelTone = .muted) {
        self.init(tone: tone) { Text(text) }
    }
}
