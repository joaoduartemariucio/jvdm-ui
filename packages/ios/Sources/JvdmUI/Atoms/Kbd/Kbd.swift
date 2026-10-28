import SwiftUI

public struct Kbd<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    private let content: Content

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    public var body: some View {
        content
            .font(theme.mono(.xxs))
            .foregroundStyle(theme.color(.inkSoft))
            .padding(.horizontal, theme.spacing(1))
            .padding(.vertical, theme.spacing(0.5))
            .frame(minWidth: theme.spacing(6))
            .background(theme.color(.raised))
            .clipShape(RoundedRectangle(cornerRadius: theme.radius(.xs), style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: theme.radius(.xs), style: .continuous)
                    .strokeBorder(theme.color(.lineStrong), lineWidth: 1)
            )
    }
}

extension Kbd where Content == Text {
    public init(_ key: String) {
        self.init { Text(key) }
    }
}
