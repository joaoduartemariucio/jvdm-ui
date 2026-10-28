import SwiftUI

public struct Skeleton: View {
    @Environment(\.jvdmTheme) private var theme
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    @State private var dim = false

    public init() {}

    public var body: some View {
        theme.color(.raised)
            .opacity(dim ? 0.5 : 1)
            .clipShape(RoundedRectangle(cornerRadius: theme.radius(.sm), style: .continuous))
            .onAppear {
                guard !reduceMotion else { return }
                withAnimation(theme.ease(.inOut).repeatForever(autoreverses: true)) {
                    dim = true
                }
            }
            .accessibilityHidden(true)
    }
}
