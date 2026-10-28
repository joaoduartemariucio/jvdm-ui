import SwiftUI

public struct BadgeStyle: Sendable, Equatable {
    public let background: JvdmColorToken
    public let foreground: JvdmColorToken
    public let radius: JvdmRadiusStep
    public let text: JvdmTextStep
    public let weight: JvdmWeightStep

    public static func resolve(tone: BadgeTone) -> BadgeStyle {
        BadgeStyle(
            background: tone.background,
            foreground: tone.foreground,
            radius: .xs,
            text: .xxs,
            weight: .medium
        )
    }
}

