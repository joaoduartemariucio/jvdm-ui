import SwiftUI

public struct DialogSurface<Title: View, Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let closeLabel: String
    let label: String
    private let title: Title?
    private let content: Content
    private let onClose: () -> Void

    public init(
        closeLabel: String,
        label: String,
        onClose: @escaping () -> Void,
        @ViewBuilder title: () -> Title?,
        @ViewBuilder content: () -> Content
    ) {
        self.closeLabel = closeLabel
        self.label = label
        self.onClose = onClose
        self.title = title()
        self.content = content()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: theme.spacing(0)) {
            if let title {
                HStack(spacing: theme.spacing(4)) {
                    title
                        .font(theme.font(.lg, .bold))
                        .foregroundStyle(theme.color(.ink))
                    Spacer(minLength: 0)
                    IconButton(label: closeLabel, action: onClose) {
                        CloseIcon(size: .md)
                    }
                }
                .padding(.leading, theme.spacing(5))
                .padding(.trailing, theme.spacing(3))
                .padding(.vertical, theme.spacing(3))

                theme.color(.line).frame(height: 1)
            }

            content
                .padding(theme.spacing(5))
        }
        .background(theme.color(.surface))
        .accessibilityLabel(label)
        .accessibilityAddTraits(.isModal)
    }
}
