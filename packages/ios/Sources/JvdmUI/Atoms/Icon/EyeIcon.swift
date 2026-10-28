import SwiftUI

public struct EyeIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(2.5, 12.0))
        path.addCurve(
            to: g.point(12.0, 5.5),
            control1: g.point(2.5, 12.0),
            control2: g.point(6.0, 5.5)
        )
        path.addCurve(
            to: g.point(21.5, 12.0),
            control1: g.point(18.0, 5.5),
            control2: g.point(21.5, 12.0)
        )
        path.addCurve(
            to: g.point(12.0, 18.5),
            control1: g.point(21.5, 12.0),
            control2: g.point(18.0, 18.5)
        )
        path.addCurve(
            to: g.point(2.5, 12.0),
            control1: g.point(6.0, 18.5),
            control2: g.point(2.5, 12.0)
        )
        path.closeSubpath()
        path.addEllipse(in: g.rect(9.0, 9.0, 6.0, 6.0))
    }
}

public struct EyeIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(EyeIconShape(), size: size)
    }
}
