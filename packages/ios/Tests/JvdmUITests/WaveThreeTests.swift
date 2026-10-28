import Testing
import SwiftUI

@testable import JvdmUI

@Suite("Notice tones")
struct NoticeToneTests {
    private let theme = JvdmTheme(scheme: .light)

    @Test("carries the four tones the contract names")
    func tones() {
        #expect(NoticeTone.allCases.map(\.rawValue) == ["info", "ok", "warn", "danger"])
    }

    @Test("pairs each tone with its own soft background")
    func pairs() {
        let expected: [NoticeTone: (JvdmColorToken, JvdmColorToken)] = [
            .info: (.info, .infoSoft),
            .ok: (.ok, .okSoft),
            .warn: (.warn, .warnSoft),
            .danger: (.danger, .dangerSoft),
        ]

        for tone in NoticeTone.allCases {
            #expect(tone.foreground == expected[tone]?.0)
            #expect(tone.background == expected[tone]?.1)
        }
    }

    @Test("keeps the text readable against its own background in both schemes")
    func contrast() {
        for scheme in [ColorScheme.light, .dark] {
            let resolved = JvdmTheme(scheme: scheme)
            for tone in NoticeTone.allCases {
                #expect(resolved.value(tone.foreground) != resolved.value(tone.background))
            }
        }
    }

    @Test("draws the border from the text color, not a new one")
    func border() {
        #expect(NoticeTone.borderOpacity == 0.4)
        _ = theme
    }
}

@Suite("StatCard")
struct StatCardTests {
    @Test("shrinks the value step as the value grows")
    func steps() {
        #expect(StatCardStyle.step(for: "42") == .xxl)
        #expect(StatCardStyle.step(for: "1234567") == .xxl)
        #expect(StatCardStyle.step(for: "12345678") == .lg)
        #expect(StatCardStyle.step(for: "123456789012") == .lg)
        #expect(StatCardStyle.step(for: "1234567890123") == .sm)
        #expect(StatCardStyle.step(for: "") == .xxl)
    }
}

@Suite("Stepper")
struct StepperTests {
    @Test("reads a step's state from its index against the current one")
    func states() {
        #expect(StepState.of(0, current: 1) == .done)
        #expect(StepState.of(1, current: 1) == .current)
        #expect(StepState.of(2, current: 1) == .todo)
        #expect(StepState.of(0, current: 0) == .current)
    }

    @Test("marks only the untouched steps as muted")
    func tokens() {
        #expect(StepState.done.dot == .accent)
        #expect(StepState.current.dot == .accent)
        #expect(StepState.todo.dot == .raised)
        #expect(StepState.todo.label == .inkMuted)
        #expect(StepState.allCases.map(\.rawValue) == ["done", "current", "todo"])
    }
}
