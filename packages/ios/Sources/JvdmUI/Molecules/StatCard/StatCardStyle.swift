import SwiftUI

public enum StatCardStyle {
    public static func step(for value: String) -> JvdmTextStep {
        if value.count <= 7 { return .xxl }
        if value.count <= 12 { return .lg }
        return .sm
    }
}
