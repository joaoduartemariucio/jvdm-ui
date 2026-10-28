import SwiftUI

public struct CopyIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addRoundedRect(
            in: g.rect(9.0, 9.0, 11.0, 11.0),
            cornerSize: g.corner(2.0)
        )
        path.move(to: g.point(5.0, 15.0))
        path.addLine(to: g.point(5.0, 6.0))
        path.addCurve(
            to: g.point(7.0, 4.0),
            control1: g.point(5.0, 4.895431),
            control2: g.point(5.895431, 4.0)
        )
        path.addLine(to: g.point(15.0, 4.0))
    }
}

public struct CopyIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(CopyIconShape(), size: size)
    }
}
