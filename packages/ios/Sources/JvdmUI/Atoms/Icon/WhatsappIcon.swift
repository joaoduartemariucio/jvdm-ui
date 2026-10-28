import SwiftUI

public struct WhatsappIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(3.4, 20.6))
        path.addLine(to: g.point(4.7, 16.0))
        path.addCurve(
            to: g.point(6.810225, 5.464889),
            control1: g.point(2.684342, 12.45237),
            control2: g.point(3.583684, 7.962485)
        )
        path.addCurve(
            to: g.point(17.537975, 6.062401),
            control1: g.point(10.036767, 2.967292),
            control2: g.point(14.608751, 3.221942)
        )
        path.addCurve(
            to: g.point(18.465211, 16.766693),
            control1: g.point(20.467198, 8.90286),
            control2: g.point(20.86237, 13.464847)
        )
        path.addCurve(
            to: g.point(8.0, 19.2),
            control1: g.point(16.068051, 20.068538),
            control2: g.point(11.607957, 21.105572)
        )
        path.closeSubpath()
        path.move(to: g.point(9.0, 9.2))
        path.addCurve(
            to: g.point(14.2, 14.7),
            control1: g.point(9.0, 12.2),
            control2: g.point(11.3, 14.6)
        )
        path.addCurve(
            to: g.point(15.6, 13.5),
            control1: g.point(14.9, 14.7),
            control2: g.point(15.5, 14.2)
        )
        path.addLine(to: g.point(13.6, 12.5))
        path.addLine(to: g.point(12.8, 13.4))
        path.addCurve(
            to: g.point(10.6, 11.1),
            control1: g.point(11.835717, 12.893433),
            control2: g.point(11.063231, 12.085834)
        )
        path.addLine(to: g.point(11.5, 10.3))
        path.addLine(to: g.point(10.5, 8.3))
        path.addCurve(
            to: g.point(9.3, 9.7),
            control1: g.point(9.8, 8.4),
            control2: g.point(9.3, 9.0)
        )
        path.closeSubpath()
    }
}

public struct WhatsappIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(WhatsappIconShape(), size: size)
    }
}
