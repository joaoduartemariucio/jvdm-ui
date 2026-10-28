import SwiftUI

public struct BoxIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(20.5, 8.2))
        path.addLine(to: g.point(20.5, 15.8))
        path.addCurve(
            to: g.point(19.7, 17.2),
            control1: g.point(20.505163, 16.376748),
            control2: g.point(20.199512, 16.911637)
        )
        path.addLine(to: g.point(12.8, 21.0))
        path.addCurve(
            to: g.point(11.2, 21.0),
            control1: g.point(12.304958, 21.285812),
            control2: g.point(11.695042, 21.285812)
        )
        path.addLine(to: g.point(4.3, 17.2))
        path.addCurve(
            to: g.point(3.5, 15.8),
            control1: g.point(3.800488, 16.911637),
            control2: g.point(3.494837, 16.376748)
        )
        path.addLine(to: g.point(3.5, 8.2))
        path.move(to: g.point(3.9, 7.3))
        path.addLine(to: g.point(11.2, 3.3))
        path.addCurve(
            to: g.point(12.8, 3.3),
            control1: g.point(11.695042, 3.014188),
            control2: g.point(12.304958, 3.014188)
        )
        path.addLine(to: g.point(20.1, 7.3))
        path.addCurve(
            to: g.point(20.573217, 8.15),
            control1: g.point(20.394217, 7.482339),
            control2: g.point(20.573217, 7.803862)
        )
        path.addCurve(
            to: g.point(20.1, 9.0),
            control1: g.point(20.573217, 8.496138),
            control2: g.point(20.394217, 8.817661)
        )
        path.addLine(to: g.point(12.8, 13.0))
        path.addCurve(
            to: g.point(11.2, 13.0),
            control1: g.point(12.304958, 13.285812),
            control2: g.point(11.695042, 13.285812)
        )
        path.addLine(to: g.point(3.9, 9.0))
        path.addCurve(
            to: g.point(3.426783, 8.15),
            control1: g.point(3.605783, 8.817661),
            control2: g.point(3.426783, 8.496138)
        )
        path.addCurve(
            to: g.point(3.9, 7.3),
            control1: g.point(3.426783, 7.803862),
            control2: g.point(3.605783, 7.482339)
        )
        path.closeSubpath()
        path.move(to: g.point(12.0, 12.8))
        path.addLine(to: g.point(12.0, 20.8))
    }
}

public struct BoxIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(BoxIconShape(), size: size)
    }
}
