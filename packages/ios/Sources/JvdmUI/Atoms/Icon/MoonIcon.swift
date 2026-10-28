import SwiftUI

public struct MoonIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(20.0, 14.2))
        path.addCurve(
            to: g.point(11.860347, 12.139653),
            control1: g.point(17.114287, 15.059762),
            control2: g.point(13.989493, 14.268799)
        )
        path.addCurve(
            to: g.point(9.8, 4.0),
            control1: g.point(9.731201, 10.010507),
            control2: g.point(8.940238, 6.885713)
        )
        path.addCurve(
            to: g.point(3.979544, 12.648868),
            control1: g.point(6.041077, 5.119923),
            control2: g.point(3.601556, 8.744914)
        )
        path.addCurve(
            to: g.point(11.351132, 20.020456),
            control1: g.point(4.357533, 16.552821),
            control2: g.point(7.447179, 19.642467)
        )
        path.addCurve(
            to: g.point(20.0, 14.2),
            control1: g.point(15.255086, 20.398444),
            control2: g.point(18.880077, 17.958923)
        )
        path.closeSubpath()
    }
}

public struct MoonIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(MoonIconShape(), size: size)
    }
}
