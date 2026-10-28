import SwiftUI

public struct PageHeader<Title: View, Subtitle: View, Actions: View>: View {
    @Environment(\.jvdmTheme) private var theme

    private let title: Title
    private let subtitle: Subtitle
    private let actions: Actions

    public init(
        @ViewBuilder title: () -> Title,
        @ViewBuilder subtitle: () -> Subtitle,
        @ViewBuilder actions: () -> Actions
    ) {
        self.title = title()
        self.subtitle = subtitle()
        self.actions = actions()
    }

    public var body: some View {
        HStack(alignment: .bottom, spacing: theme.spacing(4)) {
            VStack(alignment: .leading, spacing: theme.spacing(1)) {
                title
                    .font(theme.font(.xl, .bold))
                    .lineLimit(1)
                subtitle
                    .font(theme.font(.sm))
                    .foregroundStyle(theme.color(.inkMuted))
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            HStack(spacing: theme.spacing(3)) {
                actions
            }
        }
    }
}

extension PageHeader where Title == Text, Subtitle == EmptyView, Actions == EmptyView {
    public init(_ title: String) {
        self.init { Text(title) } subtitle: { EmptyView() } actions: { EmptyView() }
    }
}
