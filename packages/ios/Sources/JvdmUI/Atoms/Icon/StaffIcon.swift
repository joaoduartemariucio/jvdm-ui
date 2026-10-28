import SwiftUI

public struct StaffIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addRoundedRect(
            in: g.rect(2.5, 4.5, 19.0, 15.0),
            cornerSize: g.corner(2.5)
        )
        path.addEllipse(in: g.rect(6.3, 8.3, 4.4, 4.4))
        path.move(to: g.point(5.0, 16.4))
        path.addCurve(
            to: g.point(8.5, 13.8),
            control1: g.point(5.0, 14.7),
            control2: g.point(6.6, 13.8)
        )
        path.addCurve(
            to: g.point(12.0, 16.4),
            control1: g.point(10.4, 13.8),
            control2: g.point(12.0, 14.7)
        )
        path.move(to: g.point(15.0, 10.0))
        path.addLine(to: g.point(19.0, 10.0))
        path.move(to: g.point(15.0, 14.0))
        path.addLine(to: g.point(19.0, 14.0))
    }
}

public struct StaffIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(StaffIconShape(), size: size)
    }
}
