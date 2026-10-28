import SwiftUI

public struct PencilIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(4.0, 20.0))
        path.addLine(to: g.point(8.0, 20.0))
        path.addLine(to: g.point(18.0, 10.0))
        path.addCurve(
            to: g.point(18.0, 6.0),
            control1: g.point(19.104569, 8.895431),
            control2: g.point(19.104569, 7.104569)
        )
        path.addCurve(
            to: g.point(14.0, 6.0),
            control1: g.point(16.895431, 4.895431),
            control2: g.point(15.104569, 4.895431)
        )
        path.addLine(to: g.point(4.0, 16.0))
        path.addLine(to: g.point(4.0, 20.0))
        path.closeSubpath()
        path.move(to: g.point(13.5, 6.5))
        path.addLine(to: g.point(17.5, 10.5))
    }
}

public struct PencilIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(PencilIconShape(), size: size)
    }
}
