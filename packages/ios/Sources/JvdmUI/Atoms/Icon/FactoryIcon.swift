import SwiftUI

public struct FactoryIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(2.5, 20.5))
        path.addLine(to: g.point(2.5, 11.0))
        path.addLine(to: g.point(8.5, 14.5))
        path.addLine(to: g.point(8.5, 11.0))
        path.addLine(to: g.point(14.5, 14.5))
        path.addLine(to: g.point(14.5, 6.5))
        path.addCurve(
            to: g.point(15.5, 5.5),
            control1: g.point(14.5, 5.947715),
            control2: g.point(14.947715, 5.5)
        )
        path.addLine(to: g.point(18.5, 5.5))
        path.addCurve(
            to: g.point(19.5, 6.5),
            control1: g.point(19.052285, 5.5),
            control2: g.point(19.5, 5.947715)
        )
        path.addLine(to: g.point(19.5, 20.5))
        path.closeSubpath()
        path.move(to: g.point(2.0, 20.5))
        path.addLine(to: g.point(22.0, 20.5))
    }
}

public struct FactoryIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(FactoryIconShape(), size: size)
    }
}
