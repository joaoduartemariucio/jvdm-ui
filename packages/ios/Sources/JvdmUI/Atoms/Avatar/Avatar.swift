import SwiftUI

public enum AvatarSize: String, CaseIterable, Sendable {
    case sm
    case md
    case lg

    public var points: CGFloat {
        switch self {
        case .sm: return 32
        case .md: return 40
        case .lg: return 48
        }
    }

    public var text: JvdmTextStep {
        switch self {
        case .sm: return .xs
        case .md: return .sm
        case .lg: return .base
        }
    }
}

public struct Avatar: View {
    @Environment(\.jvdmTheme) private var theme

    let name: String
    let size: AvatarSize
    let label: String

    public init(name: String, size: AvatarSize = .md, label: String? = nil) {
        self.name = name
        self.size = size
        self.label = label ?? name
    }

    public var body: some View {
        Text(AvatarInitials.of(name))
            .font(theme.font(size.text, .medium))
            .foregroundStyle(theme.color(.inkMuted))
            .frame(width: size.points, height: size.points)
            .background(theme.color(.raised))
            .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
            .accessibilityLabel(label)
    }
}
