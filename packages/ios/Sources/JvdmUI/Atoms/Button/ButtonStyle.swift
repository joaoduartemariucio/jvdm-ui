import SwiftUI

public enum ButtonVariant: String, CaseIterable, Sendable {
    case primary
    case secondary
    case ghost
    case danger

    public var background: JvdmColorToken? {
        switch self {
        case .primary: return .accent
        case .secondary, .ghost, .danger: return nil
        }
    }

    public var foreground: JvdmColorToken {
        switch self {
        case .primary: return .onAccent
        case .secondary: return .ink
        case .ghost: return .inkMuted
        case .danger: return .danger
        }
    }

    public var border: JvdmColorToken? {
        switch self {
        case .primary, .ghost: return nil
        case .secondary: return .lineStrong
        case .danger: return .danger
        }
    }

    public var weight: JvdmWeightStep {
        self == .primary ? .medium : .normal
    }
}

public enum ButtonSize: String, CaseIterable, Sendable {
    case sm
    case md
    case lg
    case icon
    case iconSm = "icon-sm"

    public var horizontal: Double {
        switch self {
        case .sm: return 3
        case .md, .lg: return 4
        case .icon, .iconSm: return 0
        }
    }

    public var vertical: Double {
        switch self {
        case .sm: return 2
        case .md: return 3
        case .lg: return 4
        case .icon, .iconSm: return 0
        }
    }

    public var square: Double? {
        switch self {
        case .icon: return 40
        case .iconSm: return 32
        case .sm, .md, .lg: return nil
        }
    }

    public var text: JvdmTextStep {
        switch self {
        case .sm: return .xs
        case .md, .icon, .iconSm: return .sm
        case .lg: return .base
        }
    }
}
