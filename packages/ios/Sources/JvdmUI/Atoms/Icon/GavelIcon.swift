import SwiftUI

public struct GavelIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(13.4, 6.6))
        path.addLine(to: g.point(17.4, 10.6))
        path.move(to: g.point(15.9, 2.9))
        path.addCurve(
            to: g.point(18.7, 2.9),
            control1: g.point(16.677687, 2.137714),
            control2: g.point(17.922313, 2.137714)
        )
        path.addLine(to: g.point(21.1, 5.3))
        path.addCurve(
            to: g.point(21.1, 8.1),
            control1: g.point(21.862286, 6.077687),
            control2: g.point(21.862286, 7.322313)
        )
        path.addLine(to: g.point(19.1, 10.1))
        path.addCurve(
            to: g.point(16.3, 10.1),
            control1: g.point(18.322313, 10.862286),
            control2: g.point(17.077687, 10.862286)
        )
        path.addLine(to: g.point(13.9, 7.7))
        path.addCurve(
            to: g.point(13.9, 4.9),
            control1: g.point(13.137714, 6.922313),
            control2: g.point(13.137714, 5.677687)
        )
        path.closeSubpath()
        path.move(to: g.point(14.2, 9.8))
        path.addLine(to: g.point(6.6, 17.4))
        path.addCurve(
            to: g.point(6.6, 20.2),
            control1: g.point(5.837714, 18.177687),
            control2: g.point(5.837714, 19.422313)
        )
        path.addCurve(
            to: g.point(9.4, 20.2),
            control1: g.point(7.377687, 20.962286),
            control2: g.point(8.622313, 20.962286)
        )
        path.addLine(to: g.point(17.0, 12.6))
        path.move(to: g.point(3.5, 21.5))
        path.addLine(to: g.point(10.5, 21.5))
    }
}

public struct GavelIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(GavelIconShape(), size: size)
    }
}
