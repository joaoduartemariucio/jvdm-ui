import SwiftUI

public enum ProgressTone: String, CaseIterable, Sendable {
    case accent
    case ok
    case warn
    case danger

    public var fill: JvdmColorToken {
        switch self {
        case .accent: return .accent
        case .ok: return .ok
        case .warn: return .warn
        case .danger: return .danger
        }
    }
}

public enum ProgressSize: String, CaseIterable, Sendable {
    case md
    case xs

    public var steps: Double {
        self == .md ? 2 : 1
    }
}

public struct ProgressBar: View {
    @Environment(\.jvdmTheme) private var theme

    let value: Double
    let tone: ProgressTone
    let size: ProgressSize
    let dim: Bool
    let label: String?

    public init(
        value: Double,
        tone: ProgressTone = .accent,
        size: ProgressSize = .md,
        dim: Bool = false,
        label: String? = nil
    ) {
        self.value = value
        self.tone = tone
        self.size = size
        self.dim = dim
        self.label = label
    }

    public static func ratio(_ value: Double) -> Double {
        min(1, max(0, value))
    }

    public var body: some View {
        GeometryReader { proxy in
            ZStack(alignment: .leading) {
                Capsule().fill(theme.color(.raised))
                Capsule()
                    .fill(theme.color(tone.fill))
                    .frame(width: proxy.size.width * Self.ratio(value))
            }
        }
        .frame(height: theme.spacing(size.steps))
        .opacity(dim ? 0.5 : 1)
        .accessibilityLabel(label ?? "")
        .accessibilityValue(Text(String(Int(Self.ratio(value) * 100))))
    }
}
