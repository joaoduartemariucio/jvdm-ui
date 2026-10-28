import SwiftUI

public struct LogoutIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(9.0, 4.5))
        path.addLine(to: g.point(6.0, 4.5))
        path.addCurve(
            to: g.point(4.5, 6.0),
            control1: g.point(5.171573, 4.5),
            control2: g.point(4.5, 5.171573)
        )
        path.addLine(to: g.point(4.5, 18.0))
        path.addCurve(
            to: g.point(6.0, 19.5),
            control1: g.point(4.5, 18.828427),
            control2: g.point(5.171573, 19.5)
        )
        path.addLine(to: g.point(9.0, 19.5))
        path.move(to: g.point(15.5, 15.5))
        path.addLine(to: g.point(19.5, 12.0))
        path.addLine(to: g.point(15.5, 8.5))
        path.move(to: g.point(19.0, 12.0))
        path.addLine(to: g.point(9.5, 12.0))
    }
}

public struct LogoutIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(LogoutIconShape(), size: size)
    }
}
