import SwiftUI

public struct PhoneIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(8.4, 3.5))
        path.addLine(to: g.point(5.2, 3.5))
        path.addCurve(
            to: g.point(3.780523, 4.125235),
            control1: g.point(4.659442, 3.496996),
            control2: g.point(4.143196, 3.724386)
        )
        path.addCurve(
            to: g.point(3.3, 5.6),
            control1: g.point(3.41785, 4.526084),
            control2: g.point(3.24309, 5.062438)
        )
        path.addCurve(
            to: g.point(7.4, 15.7),
            control1: g.point(3.7, 9.3),
            control2: g.point(5.1, 12.8)
        )
        path.addCurve(
            to: g.point(13.3, 20.8),
            control1: g.point(8.992867, 17.789672),
            control2: g.point(11.001847, 19.526248)
        )
        path.addCurve(
            to: g.point(14.745401, 20.99006),
            control1: g.point(13.737362, 21.053026),
            control2: g.point(14.257495, 21.12142)
        )
        path.addCurve(
            to: g.point(15.9, 20.1),
            control1: g.point(15.233307, 20.858701),
            control2: g.point(15.648794, 20.538409)
        )
        path.addLine(to: g.point(17.3, 17.8))
        path.addCurve(
            to: g.point(16.7, 15.3),
            control1: g.point(17.779782, 16.937329),
            control2: g.point(17.519051, 15.850951)
        )
        path.addLine(to: g.point(14.5, 13.9))
        path.addLine(to: g.point(12.2, 16.2))
        path.addCurve(
            to: g.point(8.3, 12.3),
            control1: g.point(10.654254, 15.171468),
            control2: g.point(9.328532, 13.845746)
        )
        path.addLine(to: g.point(10.6, 10))
        path.addLine(to: g.point(9.2, 7.8))
        path.addCurve(
            to: g.point(7.6, 6.9),
            control1: g.point(8.856593, 7.24516),
            control2: g.point(8.252493, 6.905354)
        )
        path.closeSubpath()
    }
}

public struct PhoneIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(PhoneIconShape(), size: size)
    }
}
