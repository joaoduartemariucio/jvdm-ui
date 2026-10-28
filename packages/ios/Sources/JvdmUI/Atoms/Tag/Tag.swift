import SwiftUI

public struct Tag<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let tone: BadgeTone
    let removeLabel: String
    let disabled: Bool
    private let content: Content
    private let onRemove: (() -> Void)?

    public init(
        tone: BadgeTone = .neutral,
        removeLabel: String = TagLocales.remove,
        disabled: Bool = false,
        onRemove: (() -> Void)? = nil,
        @ViewBuilder content: () -> Content
    ) {
        self.tone = tone
        self.removeLabel = removeLabel
        self.disabled = disabled
        self.onRemove = onRemove
        self.content = content()
    }

    public var body: some View {
        HStack(spacing: theme.spacing(1)) {
            content
                .lineLimit(1)
            if let onRemove {
                Button(action: onRemove) {
                    CloseIcon(size: .sm)
                        .padding(theme.spacing(0.5))
                }
                .buttonStyle(.plain)
                .disabled(disabled)
                .opacity(0.7)
                .accessibilityLabel(removeLabel)
            }
        }
        .font(theme.font(.xs, .medium))
        .foregroundStyle(theme.color(tone.foreground))
        .padding(.leading, theme.spacing(2))
        .padding(.trailing, theme.spacing(onRemove == nil ? 2 : 1))
        .padding(.vertical, theme.spacing(0.5))
        .background(theme.color(tone.background))
        .clipShape(RoundedRectangle(cornerRadius: theme.radius(.sm), style: .continuous))
        .opacity(disabled ? 0.5 : 1)
    }
}

extension Tag where Content == Text {
    public init(
        _ title: String,
        tone: BadgeTone = .neutral,
        removeLabel: String = TagLocales.remove,
        disabled: Bool = false,
        onRemove: (() -> Void)? = nil
    ) {
        self.init(
            tone: tone,
            removeLabel: removeLabel,
            disabled: disabled,
            onRemove: onRemove
        ) { Text(title) }
    }
}
