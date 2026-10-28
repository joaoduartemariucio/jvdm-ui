import Testing
import SwiftUI

@testable import JvdmUI

@Suite("Button scales")
struct ButtonScaleTests {
    private let theme = JvdmTheme(scheme: .light)

    @Test("carries the four variants the contract names, in order")
    func variants() {
        #expect(ButtonVariant.allCases.map(\.rawValue) == ["primary", "secondary", "ghost", "danger"])
    }

    @Test("carries the five sizes, with the contract spelling of icon-sm")
    func sizes() {
        #expect(ButtonSize.allCases.map(\.rawValue) == ["sm", "md", "lg", "icon", "icon-sm"])
    }

    @Test("only the primary variant paints a background")
    func backgrounds() {
        #expect(ButtonVariant.primary.background == .accent)
        for variant in ButtonVariant.allCases where variant != .primary {
            #expect(variant.background == nil)
        }
    }

    @Test("every variant reads against the surface it sits on")
    func foregrounds() {
        for variant in ButtonVariant.allCases {
            let background = variant.background.map { theme.value($0) } ?? theme.value(.surface)
            #expect(theme.value(variant.foreground) != background)
        }
    }

    @Test("padding is whole steps and the icon sizes are square")
    func padding() {
        #expect(ButtonSize.sm.horizontal == 3)
        #expect(ButtonSize.md.vertical == 3)
        #expect(ButtonSize.lg.vertical == 4)
        #expect(ButtonSize.icon.square == 40)
        #expect(ButtonSize.iconSm.square == 32)
        #expect(ButtonSize.md.square == nil)
    }

    @Test("only the primary variant sets a heavier weight")
    func weights() {
        #expect(ButtonVariant.primary.weight == .medium)
        #expect(ButtonVariant.secondary.weight == .normal)
    }
}

@Suite("Controls")
struct ControlTests {
    private let theme = JvdmTheme(scheme: .light)

    @Test("the two control sizes pad in whole steps")
    func sizes() {
        #expect(ControlSize.allCases.map(\.rawValue) == ["sm", "md"])
        #expect(theme.spacing(ControlSize.sm.horizontal) == 12)
        #expect(theme.spacing(ControlSize.md.horizontal) == 16)
        #expect(theme.spacing(ControlSize.sm.vertical) == 8)
        #expect(theme.spacing(ControlSize.md.vertical) == 12)
    }

    @Test("an icon button narrows to the two square sizes")
    func iconButtonSizes() {
        #expect(IconButtonSize.allCases.map(\.rawValue) == ["icon", "icon-sm"])
        #expect(IconButtonSize.icon.button == .icon)
        #expect(IconButtonSize.iconSm.button == .iconSm)
    }

    @Test("every link tone pairs a text and an underline token")
    func linkTones() {
        #expect(LinkTone.allCases.map(\.rawValue) == ["accent", "ink", "muted"])
        for tone in LinkTone.allCases {
            #expect(theme.value(tone.color) != theme.value(tone.underline))
        }
    }
}

@Suite("Switch")
struct SwitchTests {
    private let theme = JvdmTheme(scheme: .light)

    @Test("the thumb travels the track minus its own width and both insets")
    func travel() {
        #expect(SwitchStyle.trackWidth == 40)
        #expect(SwitchStyle.trackHeight == 24)
        #expect(SwitchStyle.thumbSize == 16)
        #expect(SwitchStyle.travel == 16)
    }

    @Test("on and off draw from different tokens")
    func tokens() {
        #expect(SwitchStyle.track(true) == .accent)
        #expect(SwitchStyle.track(false) == .raised)
        #expect(theme.value(SwitchStyle.thumb(true)) != theme.value(SwitchStyle.thumb(false)))
    }

    @Test("the thumb reads against its track in both states")
    func contrast() {
        for checked in [true, false] {
            #expect(theme.value(SwitchStyle.thumb(checked)) != theme.value(SwitchStyle.track(checked)))
        }
    }
}
