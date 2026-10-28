import Testing
import SwiftUI

@testable import JvdmUI

@Suite("Avatar")
struct AvatarTests {
    @Test("takes the first and last initial, upper-cased")
    func initials() {
        #expect(AvatarInitials.of("João Vitor Duarte Mariucio") == "JM")
        #expect(AvatarInitials.of("ada") == "A")
        #expect(AvatarInitials.of("  grace   hopper  ") == "GH")
        #expect(AvatarInitials.of("") == "")
        #expect(AvatarInitials.of("   ") == "")
    }

    @Test("sizes sit on the scale the web uses")
    func sizes() {
        #expect(AvatarSize.allCases.map(\.points) == [32, 40, 48])
        #expect(AvatarSize.allCases.map(\.text) == [.xs, .sm, .base])
    }

    @Test("the label falls back to the name")
    func labelFallsBack() {
        #expect(Avatar(name: "Ada Lovelace").label == "Ada Lovelace")
        #expect(Avatar(name: "Ada Lovelace", label: "Author").label == "Author")
    }
}

@Suite("Wave one scales")
struct WaveOneScaleTests {
    private let theme = JvdmTheme(scheme: .light)

    @Test("card padding is whole steps of the spacing scale")
    func cardPadding() {
        #expect(CardPadding.allCases.map(\.steps) == [0, 4, 5, 6])
        #expect(theme.spacing(CardPadding.md.steps) == 20)
    }

    @Test("every label tone draws from the palette")
    func labelTones() {
        #expect(LabelTone.allCases.map(\.color) == [.inkMuted, .inkDim, .accentInk])
        for tone in LabelTone.allCases {
            #expect(theme.value(tone.color) != theme.value(.app))
        }
    }

    @Test("the contract names survive into Swift")
    func contractNames() {
        #expect(CardPadding.allCases.map(\.rawValue) == ["none", "sm", "md", "lg"])
        #expect(LabelTone.allCases.map(\.rawValue) == ["muted", "dim", "accent"])
        #expect(AvatarSize.allCases.map(\.rawValue) == ["sm", "md", "lg"])
    }

    @Test("a divider defaults to horizontal")
    func dividerDefault() {
        #expect(JvdmDivider().vertical == false)
        #expect(JvdmDivider(vertical: true).vertical == true)
    }

    @Test("the mono step reads the same size as the sans step")
    func monoStaysOnScale() {
        #expect(theme.size(.xxs) == 11)
    }
}
