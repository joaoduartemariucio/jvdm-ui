import SwiftUI

private struct JvdmModalPresentation<Title: View, Body_: View>: ViewModifier {
    @Environment(\.jvdmTheme) private var theme

    @Binding var isPresented: Bool
    let size: ModalSize
    let closeLabel: String
    let label: String
    let title: () -> Title?
    let dialogBody: () -> Body_

    func body(content: Content) -> some View {
        content.sheet(isPresented: $isPresented) {
            DialogSurface(
                closeLabel: closeLabel,
                label: label,
                onClose: { isPresented = false },
                title: title,
                content: dialogBody
            )
            .frame(maxWidth: size.maxWidth)
            .presentationCornerRadius(theme.radius(.xl))
            .presentationDragIndicator(.visible)
        }
    }
}

extension View {
    public func jvdmModal<Title: View, Content: View>(
        isPresented: Binding<Bool>,
        size: ModalSize = .md,
        closeLabel: String = ModalLocales.close,
        label: String = ModalLocales.label,
        @ViewBuilder title: @escaping () -> Title?,
        @ViewBuilder content: @escaping () -> Content
    ) -> some View {
        modifier(
            JvdmModalPresentation(
                isPresented: isPresented,
                size: size,
                closeLabel: closeLabel,
                label: label,
                title: title,
                dialogBody: content
            )
        )
    }
}
