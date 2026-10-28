import SwiftUI

public struct Crumb: Identifiable, Sendable, Equatable {
    public let id: String
    public let title: String
    public let href: String?

    public init(id: String, title: String, href: String? = nil) {
        self.id = id
        self.title = title
        self.href = href
    }
}

public struct Breadcrumb: View {
    @Environment(\.jvdmTheme) private var theme

    let items: [Crumb]
    let label: String

    public init(items: [Crumb], label: String = BreadcrumbLocales.label) {
        self.items = items
        self.label = label
    }

    public var body: some View {
        HStack(spacing: theme.spacing(1)) {
            ForEach(Array(items.enumerated()), id: \.element.id) { index, item in
                if index > 0 {
                    ChevronIcon(size: .sm)
                        .foregroundStyle(theme.color(.inkDim))
                        .rotationEffect(.degrees(-90))
                }

                Text(item.title)
                    .font(theme.font(.xs, index == items.count - 1 ? .medium : .normal))
                    .foregroundStyle(theme.color(index == items.count - 1 ? .ink : .inkMuted))
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(label)
    }
}
