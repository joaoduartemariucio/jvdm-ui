import SwiftUI

public struct Switch<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    @Binding private var checked: Bool
    let disabled: Bool
    private let content: Content?

    public init(checked: Binding<Bool>, disabled: Bool = false, @ViewBuilder label: () -> Content) {
        self._checked = checked
        self.disabled = disabled
        self.content = label()
    }

    public var body: some View {
        Button {
            checked.toggle()
        } label: {
            HStack(spacing: theme.spacing(3)) {
                track
                if let content {
                    content
                        .font(theme.font(.sm))
                        .foregroundStyle(theme.color(.inkSoft))
                }
            }
            .frame(minHeight: theme.spacing(10), alignment: .leading)
        }
        .buttonStyle(.plain)
        .disabled(disabled)
        .opacity(disabled ? 0.5 : 1)
        .accessibilityAddTraits(checked ? [.isButton, .isSelected] : .isButton)
    }

    private var track: some View {
        Capsule()
            .fill(theme.color(SwitchStyle.track(checked)))
            .frame(width: SwitchStyle.trackWidth, height: SwitchStyle.trackHeight)
            .overlay(alignment: .leading) {
                Circle()
                    .fill(theme.color(SwitchStyle.thumb(checked)))
                    .frame(width: SwitchStyle.thumbSize, height: SwitchStyle.thumbSize)
                    .offset(x: checked ? SwitchStyle.inset + SwitchStyle.travel : SwitchStyle.inset)
            }
            .animation(theme.ease(.out), value: checked)
    }
}

extension Switch where Content == Text {
    public init(_ label: String, checked: Binding<Bool>, disabled: Bool = false) {
        self.init(checked: checked, disabled: disabled) { Text(label) }
    }
}
