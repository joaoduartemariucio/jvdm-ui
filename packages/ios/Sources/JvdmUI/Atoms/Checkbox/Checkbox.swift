import SwiftUI

public struct Checkbox<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    @Binding private var checked: Bool
    private let content: Content?

    public init(checked: Binding<Bool>, @ViewBuilder label: () -> Content) {
        self._checked = checked
        self.content = label()
    }

    public var body: some View {
        Button {
            checked.toggle()
        } label: {
            HStack(spacing: theme.spacing(3)) {
                box
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
        .accessibilityAddTraits(checked ? [.isButton, .isSelected] : .isButton)
    }

    private var box: some View {
        RoundedRectangle(cornerRadius: theme.radius(.xs), style: .continuous)
            .fill(checked ? theme.color(.accent) : theme.color(.field))
            .overlay(
                RoundedRectangle(cornerRadius: theme.radius(.xs), style: .continuous)
                    .strokeBorder(theme.color(checked ? .accent : .lineStrong), lineWidth: 1)
            )
            .overlay(check)
            .frame(width: theme.spacing(5), height: theme.spacing(5))
    }

    @ViewBuilder private var check: some View {
        if checked {
            CheckIcon(size: .sm)
                .foregroundStyle(theme.color(.onAccent))
        }
    }
}

extension Checkbox where Content == Text {
    public init(_ label: String, checked: Binding<Bool>) {
        self.init(checked: checked) { Text(label) }
    }
}
