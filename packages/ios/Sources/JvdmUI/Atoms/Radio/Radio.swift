import SwiftUI

public struct Radio<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    let selected: Bool
    private let select: () -> Void
    private let content: Content?

    public init(selected: Bool, select: @escaping () -> Void, @ViewBuilder label: () -> Content) {
        self.selected = selected
        self.select = select
        self.content = label()
    }

    public var body: some View {
        Button(action: select) {
            HStack(spacing: theme.spacing(3)) {
                dot
                if let content {
                    content
                        .font(theme.font(.sm))
                        .foregroundStyle(theme.color(.inkSoft))
                }
            }
            .frame(minHeight: theme.spacing(10), alignment: .leading)
        }
        .buttonStyle(.plain)
        .opacity(isEnabled ? 1 : 0.5)
        .accessibilityAddTraits(selected ? [.isButton, .isSelected] : .isButton)
    }

    private var dot: some View {
        Circle()
            .fill(theme.color(.field))
            .overlay(Circle().strokeBorder(theme.color(selected ? .accent : .lineStrong), lineWidth: 1))
            .overlay(inner)
            .frame(width: theme.spacing(5), height: theme.spacing(5))
    }

    @ViewBuilder private var inner: some View {
        if selected {
            Circle()
                .fill(theme.color(.accent))
                .frame(width: theme.spacing(2.5), height: theme.spacing(2.5))
        }
    }
}

extension Radio where Content == Text {
    public init(_ label: String, selected: Bool, select: @escaping () -> Void) {
        self.init(selected: selected, select: select) { Text(label) }
    }
}
