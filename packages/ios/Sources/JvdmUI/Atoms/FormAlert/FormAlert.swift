import SwiftUI

public struct FormAlert<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    private let content: Content

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    public var body: some View {
        content
            .font(theme.font(.sm))
            .foregroundStyle(theme.color(.danger))
            .padding(.horizontal, theme.spacing(3))
            .padding(.vertical, theme.spacing(2))
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(theme.color(.dangerSoft))
            .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
            .accessibilityAddTraits(.isStaticText)
    }
}

extension FormAlert where Content == Text {
    public init(_ message: String) {
        self.init { Text(message) }
    }
}
