import SwiftUI

private struct JvdmDrawerPresentation<Title: View, Body_: View>: ViewModifier {
    @Environment(\.jvdmTheme) private var theme

    @Binding var isPresented: Bool
    let closeLabel: String
    let title: () -> Title?
    let drawerBody: () -> Body_

    func body(content: Content) -> some View {
        content.sheet(isPresented: $isPresented) {
            DialogSurface(
                closeLabel: closeLabel,
                label: closeLabel,
                onClose: { isPresented = false },
                title: title,
                content: drawerBody
            )
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            .presentationDetents([.large])
            .presentationCornerRadius(theme.radius(.xl))
        }
    }
}

extension View {
    public func jvdmDrawer<Title: View, Content: View>(
        isPresented: Binding<Bool>,
        closeLabel: String = DrawerLocales.close,
        @ViewBuilder title: @escaping () -> Title?,
        @ViewBuilder content: @escaping () -> Content
    ) -> some View {
        modifier(
            JvdmDrawerPresentation(
                isPresented: isPresented,
                closeLabel: closeLabel,
                title: title,
                drawerBody: content
            )
        )
    }
}
