import SwiftUI

public struct Empty<Description: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let title: String
    private let description: Description

    public init(title: String, @ViewBuilder description: () -> Description) {
        self.title = title
        self.description = description()
    }

    public var body: some View {
        VStack(spacing: theme.spacing(2)) {
            Text(title)
                .font(theme.font(.sm, .medium))
                .foregroundStyle(theme.color(.inkSoft))
            description
                .font(theme.font(.sm))
                .foregroundStyle(theme.color(.inkMuted))
        }
        .multilineTextAlignment(.center)
        .frame(maxWidth: .infinity)
        .padding(.vertical, theme.spacing(16))
    }
}

extension Empty where Description == EmptyView {
    public init(_ title: String) {
        self.init(title: title) { EmptyView() }
    }
}
