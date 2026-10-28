import SwiftUI

public struct AccordionItem<Title: View, Content: View>: Identifiable {
    public let id: String
    public let defaultOpen: Bool
    public let title: Title
    public let content: Content

    public init(
        id: String,
        defaultOpen: Bool = false,
        @ViewBuilder title: () -> Title,
        @ViewBuilder content: () -> Content
    ) {
        self.id = id
        self.defaultOpen = defaultOpen
        self.title = title()
        self.content = content()
    }
}

public struct Accordion<Title: View, Content: View>: View {
    @Environment(\.jvdmTheme) private var theme
    @State private var open: Set<String> = []

    let items: [AccordionItem<Title, Content>]
    let exclusive: Bool

    public init(items: [AccordionItem<Title, Content>], exclusive: Bool = false) {
        self.items = items
        self.exclusive = exclusive
        _open = State(initialValue: Set(items.filter(\.defaultOpen).map(\.id)))
    }

    public static func toggled(_ open: Set<String>, _ id: String, exclusive: Bool) -> Set<String> {
        if open.contains(id) {
            return open.subtracting([id])
        }
        return exclusive ? [id] : open.union([id])
    }

    public var body: some View {
        VStack(spacing: theme.spacing(0)) {
            ForEach(Array(items.enumerated()), id: \.element.id) { index, item in
                if index > 0 {
                    theme.color(.line).frame(height: 1)
                }
                row(item)
            }
        }
        .background(theme.color(.surface))
        .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous)
                .strokeBorder(theme.color(.line), lineWidth: 1)
        )
    }

    @ViewBuilder private func row(_ item: AccordionItem<Title, Content>) -> some View {
        let isOpen = open.contains(item.id)

        VStack(alignment: .leading, spacing: theme.spacing(0)) {
            Button {
                open = Self.toggled(open, item.id, exclusive: exclusive)
            } label: {
                HStack(spacing: theme.spacing(3)) {
                    item.title
                        .font(theme.font(.sm))
                        .foregroundStyle(theme.color(.ink))
                    Spacer(minLength: 0)
                    ChevronIcon(size: .md)
                        .foregroundStyle(theme.color(.inkMuted))
                        .rotationEffect(.degrees(isOpen ? -180 : 0))
                }
                .frame(minHeight: theme.spacing(12))
                .padding(.horizontal, theme.spacing(4))
            }
            .buttonStyle(.plain)
            .accessibilityAddTraits(isOpen ? [.isButton, .isSelected] : .isButton)

            if isOpen {
                item.content
                    .font(theme.font(.sm))
                    .foregroundStyle(theme.color(.inkSoft))
                    .padding(.horizontal, theme.spacing(4))
                    .padding(.bottom, theme.spacing(4))
            }
        }
        .animation(theme.ease(.out), value: isOpen)
    }
}
