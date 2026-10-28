import SwiftUI

public struct Select<Value: Hashable, Content: View>: View {
    let size: ControlSize
    let invalid: Bool
    @Binding private var selection: Value
    private let content: Content

    public init(
        selection: Binding<Value>,
        size: ControlSize = .md,
        invalid: Bool = false,
        @ViewBuilder content: () -> Content
    ) {
        self._selection = selection
        self.size = size
        self.invalid = invalid
        self.content = content()
    }

    public var body: some View {
        Picker(selection: $selection) {
            content
        } label: {
            EmptyView()
        }
        .pickerStyle(.menu)
        .labelsHidden()
        .jvdmControl(size: size, invalid: invalid)
    }
}
