import SwiftUI

public struct SwitchStyle: Sendable, Equatable {
    public static let trackWidth: Double = 40
    public static let trackHeight: Double = 24
    public static let thumbSize: Double = 16
    public static let inset: Double = 4

    public static var travel: Double {
        trackWidth - thumbSize - inset * 2
    }

    public static func track(_ checked: Bool) -> JvdmColorToken {
        checked ? .accent : .raised
    }

    public static func thumb(_ checked: Bool) -> JvdmColorToken {
        checked ? .onAccent : .ink
    }
}
