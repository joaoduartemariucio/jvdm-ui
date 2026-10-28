import SwiftUI

public struct CarIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(3.0, 13.5))
        path.addLine(to: g.point(5.0, 8.0))
        path.addCurve(
            to: g.point(6.9, 6.6),
            control1: g.point(5.261153, 7.169563),
            control2: g.point(6.029474, 6.603431)
        )
        path.addLine(to: g.point(17.1, 6.6))
        path.addCurve(
            to: g.point(19.0, 8.0),
            control1: g.point(17.970526, 6.603431),
            control2: g.point(18.738847, 7.169563)
        )
        path.addLine(to: g.point(21.0, 13.5))
        path.move(to: g.point(2.5, 13.5))
        path.addLine(to: g.point(21.5, 13.5))
        path.addLine(to: g.point(21.5, 17.5))
        path.addCurve(
            to: g.point(20.5, 18.5),
            control1: g.point(21.5, 18.052285),
            control2: g.point(21.052285, 18.5)
        )
        path.addLine(to: g.point(3.5, 18.5))
        path.addCurve(
            to: g.point(2.5, 17.5),
            control1: g.point(2.947715, 18.5),
            control2: g.point(2.5, 18.052285)
        )
        path.closeSubpath()
        path.move(to: g.point(6.0, 18.5))
        path.addLine(to: g.point(6.0, 20.5))
        path.move(to: g.point(18.0, 18.5))
        path.addLine(to: g.point(18.0, 20.5))
        path.move(to: g.point(6.0, 16.0))
        path.addLine(to: g.point(7.5, 16.0))
        path.move(to: g.point(16.5, 16.0))
        path.addLine(to: g.point(18.0, 16.0))
    }
}

public struct CarIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(CarIconShape(), size: size)
    }
}
