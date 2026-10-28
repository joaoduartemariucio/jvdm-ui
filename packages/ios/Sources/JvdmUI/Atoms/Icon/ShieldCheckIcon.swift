import SwiftUI

public struct ShieldCheckIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(12.0, 2.8))
        path.addLine(to: g.point(4.5, 5.9))
        path.addLine(to: g.point(4.5, 11.5))
        path.addCurve(
            to: g.point(12.0, 21.2),
            control1: g.point(4.5, 15.9),
            control2: g.point(7.6, 20.0)
        )
        path.addCurve(
            to: g.point(19.5, 11.5),
            control1: g.point(16.4, 20.0),
            control2: g.point(19.5, 15.9)
        )
        path.addLine(to: g.point(19.5, 5.9))
        path.closeSubpath()
        path.move(to: g.point(9.0, 11.8))
        path.addLine(to: g.point(11.2, 14.0))
        path.addLine(to: g.point(15.2, 10.0))
    }
}

public struct ShieldCheckIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(ShieldCheckIconShape(), size: size)
    }
}
