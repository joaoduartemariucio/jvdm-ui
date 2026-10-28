import SwiftUI

public struct JvdmButton<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    let variant: ButtonVariant
    let size: ButtonSize
    private let action: () -> Void
    private let content: Content

    public init(
        variant: ButtonVariant = .secondary,
        size: ButtonSize = .md,
        action: @escaping () -> Void,
        @ViewBuilder content: () -> Content
    ) {
        self.variant = variant
        self.size = size
        self.action = action
        self.content = content()
    }

    public var body: some View {
        Button(action: action) {
            HStack(spacing: theme.spacing(2)) {
                content
            }
            .font(theme.font(size.text, variant.weight))
            .foregroundStyle(theme.color(variant.foreground))
            .padding(.horizontal, theme.spacing(size.horizontal))
            .padding(.vertical, theme.spacing(size.vertical))
            .frame(width: size.square.map { CGFloat($0) }, height: size.square.map { CGFloat($0) })
            .background(variant.background.map { theme.color($0) } ?? Color.clear)
            .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous)
                    .strokeBorder(
                        variant.border.map { theme.color($0) } ?? Color.clear,
                        lineWidth: variant.border == nil ? 0 : 1
                    )
            )
        }
        .buttonStyle(.plain)
        .opacity(isEnabled ? 1 : 0.5)
    }
}

extension JvdmButton where Content == Text {
    public init(
        _ title: String,
        variant: ButtonVariant = .secondary,
        size: ButtonSize = .md,
        action: @escaping () -> Void
    ) {
        self.init(variant: variant, size: size, action: action) { Text(title) }
    }
}
