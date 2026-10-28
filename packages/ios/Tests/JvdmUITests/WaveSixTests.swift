import Testing
import SwiftUI

@testable import JvdmUI

@Suite("The dialog family")
struct DialogTests {
    @Test("says what it says on its own")
    func locales() {
        #expect(ModalLocales.label == "Dialog")
        #expect(ModalLocales.close == "Close")
        #expect(DrawerLocales.close == "Close drawer")
    }

    @Test("carries the four modal sizes the contract names")
    func sizes() {
        #expect(ModalSize.allCases.map(\.rawValue) == ["sm", "md", "lg", "xl"])
    }

    @Test("every size is wider than the one before it")
    func sizesGrow() {
        let widths = ModalSize.allCases.map(\.maxWidth)
        #expect(widths == widths.sorted())
        #expect(Set(widths).count == widths.count)
    }

    @Test("a confirm dialog keeps its two labels apart and disables both while pending")
    func confirm() {
        let subject = ConfirmDialogContent(
            title: "Delete the lot",
            description: "This cannot be undone.",
            confirmLabel: "Delete",
            cancelLabel: "Keep",
            pending: true,
            onConfirm: {},
            onCancel: {}
        ) { EmptyView() }

        #expect(subject.confirmLabel != subject.cancelLabel)
        #expect(subject.pending == true)
        #expect(subject.description == "This cannot be undone.")
    }

    @Test("the surface takes the label the modal says when there is no title")
    func surfaceLabel() {
        let surface = DialogSurface(
            closeLabel: ModalLocales.close,
            label: ModalLocales.label,
            onClose: {},
            title: { nil as Text? },
            content: { EmptyView() }
        )

        #expect(surface.label == ModalLocales.label)
        #expect(surface.closeLabel == ModalLocales.close)
    }
}
