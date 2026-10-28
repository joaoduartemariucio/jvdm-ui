import SwiftUI

public struct JvdmDivider<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let vertical: Bool
    private let content: Content?

    public init(vertical: Bool = false, @ViewBuilder content: () -> Content) {
        self.vertical = vertical
        self.content = content()
    }

    public var body: some View {
        if vertical {
            rule.frame(width: 1)
        } else if let content {
            HStack(spacing: theme.spacing(3)) {
                rule.frame(height: 1)
                content
                    .font(theme.font(.xxs, .medium))
                    .tracking(theme.tracking(.caps, .xxs))
                    .foregroundStyle(theme.color(.inkDim))
                    .textCase(.uppercase)
                rule.frame(height: 1)
            }
        } else {
            rule.frame(height: 1)
        }
    }

    private var rule: some View {
        theme.color(.line)
    }
}

extension JvdmDivider where Content == EmptyView {
    public init(vertical: Bool = false) {
        self.init(vertical: vertical) { EmptyView() }
    }
}
