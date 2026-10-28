import SwiftUI

public struct AccessIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(4.0, 8.0))
        path.addLine(to: g.point(4.0, 5.5))
        path.addCurve(
            to: g.point(5.5, 4.0),
            control1: g.point(4.0, 4.671573),
            control2: g.point(4.671573, 4.0)
        )
        path.addLine(to: g.point(8.0, 4.0))
        path.move(to: g.point(16.0, 4.0))
        path.addLine(to: g.point(18.5, 4.0))
        path.addCurve(
            to: g.point(20.0, 5.5),
            control1: g.point(19.328427, 4.0),
            control2: g.point(20.0, 4.671573)
        )
        path.addLine(to: g.point(20.0, 8.0))
        path.move(to: g.point(20.0, 16.0))
        path.addLine(to: g.point(20.0, 18.5))
        path.addCurve(
            to: g.point(18.5, 20.0),
            control1: g.point(20.0, 19.328427),
            control2: g.point(19.328427, 20.0)
        )
        path.addLine(to: g.point(16.0, 20.0))
        path.move(to: g.point(8.0, 20.0))
        path.addLine(to: g.point(5.5, 20.0))
        path.addCurve(
            to: g.point(4.0, 18.5),
            control1: g.point(4.671573, 20.0),
            control2: g.point(4.0, 19.328427)
        )
        path.addLine(to: g.point(4.0, 16.0))
        path.move(to: g.point(4.0, 12.0))
        path.addLine(to: g.point(20.0, 12.0))
    }
}

public struct AccessIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(AccessIconShape(), size: size)
    }
}
