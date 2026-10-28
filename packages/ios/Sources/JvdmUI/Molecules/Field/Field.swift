import SwiftUI

public struct Field<Content: View, Action: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let label: String
    let error: String?
    private let content: Content
    private let action: Action

    public init(
        label: String,
        error: String? = nil,
        @ViewBuilder content: () -> Content,
        @ViewBuilder action: () -> Action
    ) {
        self.label = label
        self.error = error
        self.content = content()
        self.action = action()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: theme.spacing(2)) {
            HStack(alignment: .firstTextBaseline, spacing: theme.spacing(3)) {
                Text(label)
                    .font(theme.font(.xs, .medium))
                    .foregroundStyle(theme.color(.inkSoft))
                Spacer(minLength: 0)
                action
            }

            content

            if let error {
                Text(error)
                    .font(theme.font(.xxs))
                    .foregroundStyle(theme.color(.danger))
            }
        }
        .accessibilityElement(children: .contain)
        .accessibilityLabel(label)
    }
}

extension Field where Action == EmptyView {
    public init(label: String, error: String? = nil, @ViewBuilder content: () -> Content) {
        self.init(label: label, error: error, content: content) { EmptyView() }
    }
}
