import SwiftUI

public struct SegmentedOption: Identifiable, Sendable, Equatable {
    public let id: String
    public let title: String
    public let disabled: Bool

    public init(value: String, title: String, disabled: Bool = false) {
        self.id = value
        self.title = title
        self.disabled = disabled
    }
}

public struct Segmented: View {
    @Environment(\.jvdmTheme) private var theme

    let options: [SegmentedOption]
    let value: String
    let label: String?
    private let onValueChange: (String) -> Void

    public init(
        options: [SegmentedOption],
        value: String,
        label: String? = nil,
        onValueChange: @escaping (String) -> Void
    ) {
        self.options = options
        self.value = value
        self.label = label
        self.onValueChange = onValueChange
    }

    public var body: some View {
        HStack(spacing: theme.spacing(0.5)) {
            ForEach(options) { option in
                segment(option)
            }
        }
        .padding(theme.spacing(0.5))
        .background(theme.color(.raised))
        .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
        .accessibilityElement(children: .contain)
        .accessibilityLabel(label ?? "")
    }

    @ViewBuilder private func segment(_ option: SegmentedOption) -> some View {
        let selected = option.id == value

        Button {
            onValueChange(option.id)
        } label: {
            Text(option.title)
                .font(theme.font(.sm, selected ? .medium : .normal))
                .foregroundStyle(theme.color(selected ? .ink : .inkMuted))
                .frame(maxWidth: .infinity, minHeight: theme.spacing(9))
                .background(selected ? theme.color(.surface) : Color.clear)
                .clipShape(RoundedRectangle(cornerRadius: theme.radius(.sm), style: .continuous))
        }
        .buttonStyle(.plain)
        .disabled(option.disabled)
        .accessibilityAddTraits(selected ? [.isButton, .isSelected] : .isButton)
    }
}
