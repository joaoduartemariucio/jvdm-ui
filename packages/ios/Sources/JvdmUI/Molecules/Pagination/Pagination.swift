import SwiftUI

public struct Pagination: View {
    @Environment(\.jvdmTheme) private var theme

    let page: Int
    let pages: Int
    let previousLabel: String
    let nextLabel: String
    let pageLabel: @Sendable (Int) -> String
    let label: String
    private let onPageChange: (Int) -> Void

    public init(
        page: Int,
        pages: Int,
        previousLabel: String = PaginationLocales.previous,
        nextLabel: String = PaginationLocales.next,
        pageLabel: @escaping @Sendable (Int) -> String = PaginationLocales.page,
        label: String = PaginationLocales.label,
        onPageChange: @escaping (Int) -> Void
    ) {
        self.page = page
        self.pages = pages
        self.previousLabel = previousLabel
        self.nextLabel = nextLabel
        self.pageLabel = pageLabel
        self.label = label
        self.onPageChange = onPageChange
    }

    public static func clamp(_ page: Int, pages: Int) -> Int {
        min(max(page, 1), max(pages, 1))
    }

    private var current: Int { Self.clamp(page, pages: pages) }

    public var body: some View {
        HStack(spacing: theme.spacing(2)) {
            JvdmButton(previousLabel, action: { onPageChange(current - 1) })
                .disabled(current == 1)

            Text(pageLabel(current))
                .font(theme.font(.sm))
                .foregroundStyle(theme.color(.inkMuted))
                .padding(.horizontal, theme.spacing(2))

            JvdmButton(nextLabel, action: { onPageChange(current + 1) })
                .disabled(current == pages)
        }
        .accessibilityElement(children: .contain)
        .accessibilityLabel(label)
    }
}
