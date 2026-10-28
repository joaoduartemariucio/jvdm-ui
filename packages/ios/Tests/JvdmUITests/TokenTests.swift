import Testing
import SwiftUI

@testable import JvdmUI

@Suite("Tokens")
struct TokenTests {
    @Test("every color token resolves in both schemes")
    func everyColorResolves() {
        for token in JvdmColorToken.allCases {
            #expect(JvdmTokens.colors[token] != nil)
        }
        #expect(JvdmColorToken.allCases.count == 24)
    }

    @Test("the scales carry every step")
    func scalesAreComplete() {
        #expect(JvdmTokens.text.count == JvdmTextStep.allCases.count)
        #expect(JvdmTokens.radius.count == JvdmRadiusStep.allCases.count)
        #expect(JvdmTokens.ease.count == JvdmEaseStep.allCases.count)
        #expect(JvdmTokens.duration.count == JvdmDurationStep.allCases.count)
        #expect(JvdmTokens.shadow.count == JvdmShadowStep.allCases.count)
        #expect(JvdmTokens.tracking.count == JvdmTrackingStep.allCases.count)
        #expect(JvdmTokens.weight.count == JvdmWeightStep.allCases.count)
    }

    @Test("the contract name survives the trip into Swift")
    func rawValuesAreContractNames() {
        #expect(JvdmColorToken.lineStrong.rawValue == "line-strong")
        #expect(JvdmColorToken.onAccent.rawValue == "on-accent")
        #expect(JvdmTextStep.xxs.rawValue == "2xs")
        #expect(JvdmTextStep.xxl.rawValue == "2xl")
        #expect(JvdmEaseStep.inOut.rawValue == "in-out")
    }

    @Test("the spacing scale is a 4pt base")
    func spacingBase() {
        let theme = JvdmTheme(scheme: .light)
        #expect(theme.spacing(1) == 4)
        #expect(theme.spacing(0.5) == 2)
        #expect(theme.spacing(2) == 8)
    }

    @Test("light and dark resolve to different values")
    func schemesDiffer() {
        let light = JvdmTheme(scheme: .light)
        let dark = JvdmTheme(scheme: .dark)
        for token in JvdmColorToken.allCases {
            #expect(light.value(token) != dark.value(token))
        }
    }
}
