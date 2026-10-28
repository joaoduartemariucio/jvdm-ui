import SwiftUI

public struct LoadError: View {
    @Environment(\.jvdmTheme) private var theme

    let message: String
    let retryLabel: String
    private let onRetry: (() -> Void)?

    public init(
        message: String,
        retryLabel: String = LoadErrorLocales.retry,
        onRetry: (() -> Void)? = nil
    ) {
        self.message = message
        self.retryLabel = retryLabel
        self.onRetry = onRetry
    }

    public var body: some View {
        VStack(spacing: theme.spacing(3)) {
            Text(message)
                .font(theme.font(.sm))
                .foregroundStyle(theme.color(.danger))
                .multilineTextAlignment(.center)

            if let onRetry {
                JvdmButton(retryLabel, variant: .secondary, action: onRetry)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, theme.spacing(16))
    }
}
