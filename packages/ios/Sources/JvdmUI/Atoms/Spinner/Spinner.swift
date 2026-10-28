import SwiftUI

public struct Spinner: View {
    @Environment(\.jvdmTheme) private var theme
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    @State private var turning = false

    let size: JvdmIconSize
    let label: String

    public init(size: JvdmIconSize = .md, label: String = SpinnerLocales.label) {
        self.size = size
        self.label = label
    }

    public var body: some View {
        ZStack {
            Circle()
                .stroke(theme.color(.ink).opacity(0.2), lineWidth: Self.stroke)
            Circle()
                .trim(from: 0, to: 0.25)
                .stroke(
                    theme.color(.ink),
                    style: StrokeStyle(lineWidth: Self.stroke, lineCap: .round)
                )
                .rotationEffect(.degrees(turning ? 360 : 0))
        }
        .frame(width: size.points, height: size.points)
        .onAppear {
            guard !reduceMotion else { return }
            withAnimation(theme.linear(Self.period).repeatForever(autoreverses: false)) {
                turning = true
            }
        }
        .accessibilityLabel(label)
        .accessibilityAddTraits(.updatesFrequently)
    }

    static let stroke: CGFloat = 2.4

    static let period: TimeInterval = 1
}
