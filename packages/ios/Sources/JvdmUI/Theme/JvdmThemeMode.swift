import Foundation

public enum JvdmThemeMode: String, CaseIterable, Sendable {
    case light
    case dark
    case system
}

public struct JvdmThemeStore {
    public static let storageKey = "jvdm-ui.theme"

    private let defaults: UserDefaults

    public init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
    }

    public var mode: JvdmThemeMode {
        switch defaults.string(forKey: Self.storageKey) {
        case JvdmThemeMode.light.rawValue: return .light
        case JvdmThemeMode.dark.rawValue: return .dark
        default: return .system
        }
    }

    public func set(_ mode: JvdmThemeMode) {
        switch mode {
        case .system:
            defaults.removeObject(forKey: Self.storageKey)
        case .light, .dark:
            defaults.set(mode.rawValue, forKey: Self.storageKey)
        }
    }
}
