import SwiftUI

public enum NoticeTone: String, CaseIterable, Sendable {
    case info
    case ok
    case warn
    case danger

    public var foreground: JvdmColorToken {
        switch self {
        case .info: return .info
        case .ok: return .ok
        case .warn: return .warn
        case .danger: return .danger
        }
    }

    public var background: JvdmColorToken {
        switch self {
        case .info: return .infoSoft
        case .ok: return .okSoft
        case .warn: return .warnSoft
        case .danger: return .dangerSoft
        }
    }

    public static let borderOpacity: Double = 0.4
}
