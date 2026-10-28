import SwiftUI

public struct ConfirmDialogContent<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let title: String
    let description: String?
    let confirmLabel: String
    let cancelLabel: String
    let pending: Bool
    private let content: Content
    private let onConfirm: () -> Void
    private let onCancel: () -> Void

    public init(
        title: String,
        description: String? = nil,
        confirmLabel: String,
        cancelLabel: String,
        pending: Bool = false,
        onConfirm: @escaping () -> Void,
        onCancel: @escaping () -> Void,
        @ViewBuilder content: () -> Content
    ) {
        self.title = title
        self.description = description
        self.confirmLabel = confirmLabel
        self.cancelLabel = cancelLabel
        self.pending = pending
        self.onConfirm = onConfirm
        self.onCancel = onCancel
        self.content = content()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: theme.spacing(4)) {
            VStack(alignment: .leading, spacing: theme.spacing(2)) {
                Text(title)
                    .font(theme.font(.lg, .bold))
                    .foregroundStyle(theme.color(.ink))
                if let description {
                    Text(description)
                        .font(theme.font(.sm))
                        .foregroundStyle(theme.color(.inkMuted))
                }
            }

            content

            HStack(spacing: theme.spacing(3)) {
                Spacer(minLength: 0)
                JvdmButton(cancelLabel, action: onCancel)
                    .disabled(pending)
                JvdmButton(confirmLabel, variant: .danger, action: onConfirm)
                    .disabled(pending)
            }
        }
        .padding(theme.spacing(5))
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(theme.color(.surface))
    }
}

private struct JvdmConfirmPresentation<Body_: View>: ViewModifier {
    @Environment(\.jvdmTheme) private var theme

    @Binding var isPresented: Bool
    let dialog: () -> Body_

    func body(content: Content) -> some View {
        content.sheet(isPresented: $isPresented) {
            dialog()
                .presentationDetents([.medium])
                .presentationCornerRadius(theme.radius(.xl))
        }
    }
}

extension View {
    public func jvdmConfirmDialog<Content: View>(
        isPresented: Binding<Bool>,
        @ViewBuilder dialog: @escaping () -> Content
    ) -> some View {
        modifier(JvdmConfirmPresentation(isPresented: isPresented, dialog: dialog))
    }
}
