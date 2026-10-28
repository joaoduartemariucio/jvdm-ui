import SwiftUI

public struct TrashIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(5.0, 7.0))
        path.addLine(to: g.point(19.0, 7.0))
        path.move(to: g.point(9.0, 7.0))
        path.addLine(to: g.point(9.0, 5.0))
        path.addCurve(
            to: g.point(10.0, 4.0),
            control1: g.point(9.0, 4.447715),
            control2: g.point(9.447715, 4.0)
        )
        path.addLine(to: g.point(14.0, 4.0))
        path.addCurve(
            to: g.point(15.0, 5.0),
            control1: g.point(14.552285, 4.0),
            control2: g.point(15.0, 4.447715)
        )
        path.addLine(to: g.point(15.0, 7.0))
        path.move(to: g.point(7.0, 7.0))
        path.addLine(to: g.point(8.0, 20.0))
        path.addCurve(
            to: g.point(9.0, 21.0),
            control1: g.point(8.0, 20.552285),
            control2: g.point(8.447715, 21.0)
        )
        path.addLine(to: g.point(15.0, 21.0))
        path.addCurve(
            to: g.point(16.0, 20.0),
            control1: g.point(15.552285, 21.0),
            control2: g.point(16.0, 20.552285)
        )
        path.addLine(to: g.point(17.0, 7.0))
        path.move(to: g.point(10.0, 11.0))
        path.addLine(to: g.point(10.0, 17.0))
        path.move(to: g.point(14.0, 11.0))
        path.addLine(to: g.point(14.0, 17.0))
    }
}

public struct TrashIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(TrashIconShape(), size: size)
    }
}
