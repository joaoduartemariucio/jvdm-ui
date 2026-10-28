import SwiftUI

public struct BuildingIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(4.5, 20.5))
        path.addLine(to: g.point(4.5, 5.0))
        path.addCurve(
            to: g.point(6.0, 3.5),
            control1: g.point(4.5, 4.171573),
            control2: g.point(5.171573, 3.5)
        )
        path.addLine(to: g.point(13.0, 3.5))
        path.addCurve(
            to: g.point(14.5, 5.0),
            control1: g.point(13.828427, 3.5),
            control2: g.point(14.5, 4.171573)
        )
        path.addLine(to: g.point(14.5, 20.5))
        path.move(to: g.point(14.5, 10.0))
        path.addLine(to: g.point(18.5, 10.0))
        path.addCurve(
            to: g.point(20.0, 11.5),
            control1: g.point(19.328427, 10.0),
            control2: g.point(20.0, 10.671573)
        )
        path.addLine(to: g.point(20.0, 20.5))
        path.move(to: g.point(3.0, 20.5))
        path.addLine(to: g.point(21.0, 20.5))
        path.move(to: g.point(7.5, 7.5))
        path.addLine(to: g.point(11.5, 7.5))
        path.move(to: g.point(7.5, 11.0))
        path.addLine(to: g.point(11.5, 11.0))
        path.move(to: g.point(7.5, 14.5))
        path.addLine(to: g.point(11.5, 14.5))
        path.move(to: g.point(7.5, 18.0))
        path.addLine(to: g.point(11.5, 18.0))
    }
}

public struct BuildingIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(BuildingIconShape(), size: size)
    }
}
