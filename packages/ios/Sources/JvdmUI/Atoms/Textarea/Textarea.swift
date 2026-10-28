import SwiftUI

public struct Textarea: View {
    @Environment(\.jvdmTheme) private var theme

    let size: ControlSize
    let invalid: Bool
    @Binding private var text: String

    public init(text: Binding<String>, size: ControlSize = .md, invalid: Bool = false) {
        self._text = text
        self.size = size
        self.invalid = invalid
    }

    public var body: some View {
        TextEditor(text: $text)
            .scrollContentBackground(.hidden)
            .frame(minHeight: theme.spacing(20))
            .jvdmControl(size: size, invalid: invalid)
    }
}
