import SwiftUI

public struct JvdmSlider: View {
    @Environment(\.jvdmTheme) private var theme

    @Binding private var value: Double
    let range: ClosedRange<Double>
    let step: Double?

    public init(value: Binding<Double>, in range: ClosedRange<Double> = 0...100, step: Double? = nil) {
        self._value = value
        self.range = range
        self.step = step
    }

    public var body: some View {
        slider
            .tint(theme.color(.accent))
            .frame(height: theme.spacing(6))
    }

    @ViewBuilder private var slider: some View {
        if let step {
            Slider(value: $value, in: range, step: step)
        } else {
            Slider(value: $value, in: range)
        }
    }
}
