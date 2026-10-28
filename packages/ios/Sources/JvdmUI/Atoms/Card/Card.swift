import SwiftUI

public enum CardPadding: String, CaseIterable, Sendable {
    case none
    case sm
    case md
    case lg

    public var steps: Double {
        switch self {
        case .none: return 0
        case .sm: return 4
        case .md: return 5
        case .lg: return 6
        }
    }
}

public struct Card<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let padding: CardPadding
    private let content: Content

    public init(padding: CardPadding = .md, @ViewBuilder content: () -> Content) {
        self.padding = padding
        self.content = content()
    }

    public var body: some View {
        content
            .padding(theme.spacing(padding.steps))
            .background(theme.color(.surface))
            .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous)
                    .strokeBorder(theme.color(.line), lineWidth: 1)
            )
    }
}
