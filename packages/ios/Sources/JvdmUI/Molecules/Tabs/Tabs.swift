import SwiftUI

public struct TabItem<Content: View>: Identifiable {
    public let id: String
    public let title: String
    public let disabled: Bool
    public let content: Content

    public init(
        value: String,
        title: String,
        disabled: Bool = false,
        @ViewBuilder content: () -> Content
    ) {
        self.id = value
        self.title = title
        self.disabled = disabled
        self.content = content()
    }
}

public struct Tabs<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let items: [TabItem<Content>]
    let value: String
    let label: String
    private let onValueChange: (String) -> Void

    public init(
        items: [TabItem<Content>],
        value: String,
        label: String = TabsLocales.label,
        onValueChange: @escaping (String) -> Void
    ) {
        self.items = items
        self.value = value
        self.label = label
        self.onValueChange = onValueChange
    }

    private var active: TabItem<Content>? {
        items.first { $0.id == value } ?? items.first
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: theme.spacing(4)) {
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: theme.spacing(1)) {
                    ForEach(items) { item in
                        tab(item)
                    }
                }
            }
            .overlay(alignment: .bottom) {
                theme.color(.line).frame(height: 1)
            }
            .accessibilityLabel(label)

            if let active {
                active.content
            }
        }
    }

    @ViewBuilder private func tab(_ item: TabItem<Content>) -> some View {
        let selected = item.id == active?.id

        Button {
            onValueChange(item.id)
        } label: {
            Text(item.title)
                .font(theme.font(.sm, selected ? .medium : .normal))
                .foregroundStyle(theme.color(selected ? .ink : .inkMuted))
                .frame(minHeight: theme.spacing(10))
                .padding(.horizontal, theme.spacing(3))
                .overlay(alignment: .bottom) {
                    theme.color(selected ? .accent : .line)
                        .frame(height: theme.spacing(0.5))
                        .opacity(selected ? 1 : 0)
                }
        }
        .buttonStyle(.plain)
        .disabled(item.disabled)
        .accessibilityAddTraits(selected ? [.isButton, .isSelected] : .isButton)
    }
}
