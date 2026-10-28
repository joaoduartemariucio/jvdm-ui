import SwiftUI

public struct CardTitle<Content: View, Hint: View>: View {
    @Environment(\.jvdmTheme) private var theme

    private let content: Content
    private let hint: Hint

    public init(@ViewBuilder content: () -> Content, @ViewBuilder hint: () -> Hint) {
        self.content = content()
        self.hint = hint()
    }

    public var body: some View {
        HStack(alignment: .firstTextBaseline, spacing: theme.spacing(3)) {
            content
                .font(theme.font(.sm, .medium))
            Spacer(minLength: 0)
            hint
                .font(theme.font(.xs))
                .foregroundStyle(theme.color(.inkMuted))
        }
    }
}

extension CardTitle where Content == Text, Hint == EmptyView {
    public init(_ title: String) {
        self.init { Text(title) } hint: { EmptyView() }
    }
}
