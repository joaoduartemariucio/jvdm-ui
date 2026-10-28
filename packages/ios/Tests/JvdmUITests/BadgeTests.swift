import Testing
import SwiftUI

@testable import JvdmUI

@Suite("Badge")
struct BadgeTests {
    @Test("carries the six tones the contract names")
    func toneCount() {
        #expect(BadgeTone.allCases.map(\.rawValue) == [
            "neutral", "accent", "ok", "warn", "danger", "info",
        ])
    }

    @Test("every tone draws both colors from the palette")
    func tonesUseTokens() {
        let theme = JvdmTheme(scheme: .light)
        for tone in BadgeTone.allCases {
            let style = BadgeStyle.resolve(tone: tone)
            #expect(theme.value(style.background) != theme.value(style.foreground))
        }
    }

    @Test("the tone pairs match the web table")
    func tonePairsMatchWeb() {
        let expected: [BadgeTone: (JvdmColorToken, JvdmColorToken)] = [
            .neutral: (.raised, .inkSoft),
            .accent: (.accentSoft, .accentInk),
            .ok: (.okSoft, .ok),
            .warn: (.warnSoft, .warn),
            .danger: (.dangerSoft, .danger),
            .info: (.infoSoft, .info),
        ]

        for tone in BadgeTone.allCases {
            let style = BadgeStyle.resolve(tone: tone)
            #expect(style.background == expected[tone]?.0)
            #expect(style.foreground == expected[tone]?.1)
        }
    }

    @Test("the scales it uses are the ones R5 names")
    func stylesStayOnTheScale() {
        let style = BadgeStyle.resolve(tone: .neutral)
        #expect(style.radius == .xs)
        #expect(style.text == .xxs)
        #expect(style.weight == .medium)
    }

    @Test("the default tone is neutral")
    func defaultTone() {
        #expect(Badge("Ready").tone == .neutral)
        #expect(Badge("Ready", tone: .danger).tone == .danger)
    }
}
