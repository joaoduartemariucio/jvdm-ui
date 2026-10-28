import SwiftUI

public struct Input: View {
    let title: String
    let size: ControlSize
    let invalid: Bool
    @Binding private var text: String

    public init(
        _ title: String = "",
        text: Binding<String>,
        size: ControlSize = .md,
        invalid: Bool = false
    ) {
        self.title = title
        self._text = text
        self.size = size
        self.invalid = invalid
    }

    public var body: some View {
        TextField(title, text: $text)
            .textFieldStyle(.plain)
            .jvdmControl(size: size, invalid: invalid)
    }
}
