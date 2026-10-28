import SwiftUI

public struct AlertIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(12.0, 8.5))
        path.addLine(to: g.point(12.0, 13.5))
        path.move(to: g.point(12.0, 16.7))
        path.addLine(to: g.point(12.01, 16.7))
        path.move(to: g.point(10.3, 3.9))
        path.addLine(to: g.point(2.6, 17.4))
        path.addCurve(
            to: g.point(2.575226, 19.362798),
            control1: g.point(2.228236, 17.999002),
            control2: g.point(2.218699, 18.754604)
        )
        path.addCurve(
            to: g.point(4.3, 20.3),
            control1: g.point(2.931754, 19.970992),
            control2: g.point(3.595726, 20.331779)
        )
        path.addLine(to: g.point(19.7, 20.3))
        path.addCurve(
            to: g.point(21.424774, 19.362798),
            control1: g.point(20.404274, 20.331779),
            control2: g.point(21.068246, 19.970992)
        )
        path.addCurve(
            to: g.point(21.4, 17.4),
            control1: g.point(21.781301, 18.754604),
            control2: g.point(21.771764, 17.999002)
        )
        path.addLine(to: g.point(13.7, 3.9))
        path.addCurve(
            to: g.point(12.0, 2.848528),
            control1: g.point(13.378389, 3.255663),
            control2: g.point(12.720141, 2.848528)
        )
        path.addCurve(
            to: g.point(10.3, 3.9),
            control1: g.point(11.279859, 2.848528),
            control2: g.point(10.621611, 3.255663)
        )
        path.closeSubpath()
    }
}

public struct AlertIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(AlertIconShape(), size: size)
    }
}
