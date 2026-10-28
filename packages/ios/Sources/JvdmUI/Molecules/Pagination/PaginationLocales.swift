import Foundation

public enum PaginationLocales {
    public static let label = "Pagination"
    public static let previous = "Previous"
    public static let next = "Next"
    public static let page: @Sendable (Int) -> String = { "Page \($0)" }
}
