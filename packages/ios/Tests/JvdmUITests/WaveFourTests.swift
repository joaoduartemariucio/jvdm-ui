import Testing
import SwiftUI

@testable import JvdmUI

@Suite("What a component says on its own")
struct LocalesTests {
    @Test("every default string is English and non-empty")
    func defaults() {
        #expect(SpinnerLocales.label == "Loading")
        #expect(TagLocales.remove == "Remove")
        #expect(BreadcrumbLocales.label == "Breadcrumb")
        #expect(LoadErrorLocales.retry == "Try again")
    }

    @Test("a caller can replace every one of them")
    func overridable() {
        #expect(Spinner(label: "Carregando").label == "Carregando")
        #expect(Tag("x", removeLabel: "Remover").removeLabel == "Remover")
        #expect(Breadcrumb(items: [], label: "Trilha").label == "Trilha")
        #expect(LoadError(message: "x", retryLabel: "Tentar de novo").retryLabel == "Tentar de novo")
    }

    @Test("and gets the English default when it does not")
    func fallback() {
        #expect(Spinner().label == SpinnerLocales.label)
        #expect(Tag("x").removeLabel == TagLocales.remove)
        #expect(Breadcrumb(items: []).label == BreadcrumbLocales.label)
        #expect(LoadError(message: "x").retryLabel == LoadErrorLocales.retry)
    }
}

@Suite("ProgressBar")
struct ProgressBarTests {
    @Test("clamps the value to the track")
    func ratio() {
        #expect(ProgressBar.ratio(0.5) == 0.5)
        #expect(ProgressBar.ratio(-1) == 0)
        #expect(ProgressBar.ratio(9) == 1)
        #expect(ProgressBar.ratio(0) == 0)
        #expect(ProgressBar.ratio(1) == 1)
    }

    @Test("carries the four tones and two sizes the contract names")
    func scales() {
        #expect(ProgressTone.allCases.map(\.rawValue) == ["accent", "ok", "warn", "danger"])
        #expect(ProgressSize.allCases.map(\.rawValue) == ["md", "xs"])
        #expect(ProgressSize.md.steps == 2)
        #expect(ProgressSize.xs.steps == 1)
    }

    @Test("every tone draws from the palette")
    func tones() {
        let theme = JvdmTheme(scheme: .light)
        for tone in ProgressTone.allCases {
            #expect(theme.value(tone.fill) != theme.value(.raised))
        }
    }
}

@Suite("MetricCard")
struct MetricCardTests {
    @Test("colors the change by its trend")
    func trends() {
        #expect(MetricTrend.allCases.map(\.rawValue) == ["neutral", "up", "down"])
        #expect(MetricTrend.up.color == .ok)
        #expect(MetricTrend.down.color == .danger)
        #expect(MetricTrend.neutral.color == .inkMuted)
    }
}

@Suite("Spinner")
struct SpinnerTests {
    @Test("turns once per period, on the icon scale")
    func shape() {
        #expect(Spinner.period == 1)
        #expect(Spinner.stroke == 2.4)
        #expect(Spinner(size: .xxl).size.points == 32)
    }
}
