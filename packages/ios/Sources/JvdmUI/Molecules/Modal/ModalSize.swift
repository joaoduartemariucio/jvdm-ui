import SwiftUI

public enum ModalSize: String, CaseIterable, Sendable {
    case sm
    case md
    case lg
    case xl

    public var maxWidth: CGFloat {
        switch self {
        case .sm: return 448
        case .md: return 672
        case .lg: return 896
        case .xl: return 1152
        }
    }
}
