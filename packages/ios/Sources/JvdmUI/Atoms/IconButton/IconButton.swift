import SwiftUI

public enum IconButtonSize: String, CaseIterable, Sendable {
    case icon
    case iconSm = "icon-sm"

    public var button: ButtonSize {
        self == .icon ? .icon : .iconSm
    }
}

public struct IconButton<Content: View>: View {
    let label: String
    let variant: ButtonVariant
    let size: IconButtonSize
    private let action: () -> Void
    private let content: Content

    public init(
        label: String,
        variant: ButtonVariant = .ghost,
        size: IconButtonSize = .icon,
        action: @escaping () -> Void,
        @ViewBuilder content: () -> Content
    ) {
        self.label = label
        self.variant = variant
        self.size = size
        self.action = action
        self.content = content()
    }

    public var body: some View {
        JvdmButton(variant: variant, size: size.button, action: action) { content }
            .accessibilityLabel(label)
    }
}
