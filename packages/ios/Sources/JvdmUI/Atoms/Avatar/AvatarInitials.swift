import Foundation

public enum AvatarInitials {
    public static func of(_ name: String) -> String {
        let parts = name.split(whereSeparator: \.isWhitespace)
        guard let first = parts.first?.first else { return "" }
        let last = parts.count > 1 ? parts[parts.count - 1].first : nil
        return String([first, last].compactMap { $0 }).uppercased()
    }
}
