import Testing
import Foundation

@testable import JvdmUI

@Suite("Theme mode")
struct ThemeModeTests {
    private func store() -> (JvdmThemeStore, UserDefaults) {
        let defaults = UserDefaults(suiteName: "jvdm-ui.tests.\(UUID().uuidString)")!
        return (JvdmThemeStore(defaults: defaults), defaults)
    }

    @Test("the key is the one the web writes")
    func keyMatchesWeb() {
        #expect(JvdmThemeStore.storageKey == "jvdm-ui.theme")
    }

    @Test("nothing stored means follow the system")
    func emptyIsSystem() {
        let (subject, _) = store()
        #expect(subject.mode == .system)
    }

    @Test("light and dark round-trip")
    func roundTrip() {
        let (subject, _) = store()
        subject.set(.light)
        #expect(subject.mode == .light)
        subject.set(.dark)
        #expect(subject.mode == .dark)
    }

    @Test("system removes the key rather than storing a third value")
    func systemClearsTheKey() {
        let (subject, defaults) = store()
        subject.set(.dark)
        subject.set(.system)
        #expect(defaults.string(forKey: JvdmThemeStore.storageKey) == nil)
        #expect(subject.mode == .system)
    }

    @Test("a value the web never writes reads as system")
    func unknownIsSystem() {
        let (subject, defaults) = store()
        defaults.set("sepia", forKey: JvdmThemeStore.storageKey)
        #expect(subject.mode == .system)
    }
}
