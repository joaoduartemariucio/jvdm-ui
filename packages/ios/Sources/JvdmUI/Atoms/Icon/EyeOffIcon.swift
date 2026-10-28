import SwiftUI

public struct EyeOffIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(9.9, 5.8))
        path.addCurve(
            to: g.point(12.0, 5.5),
            control1: g.point(10.586267, 5.620231),
            control2: g.point(11.290849, 5.519577)
        )
        path.addCurve(
            to: g.point(21.5, 12.0),
            control1: g.point(18.0, 5.5),
            control2: g.point(21.5, 12.0)
        )
        path.addCurve(
            to: g.point(18.2, 16.1),
            control1: g.point(20.619508, 13.529689),
            control2: g.point(19.506168, 14.912928)
        )
        path.move(to: g.point(6.4, 7.6))
        path.addCurve(
            to: g.point(2.5, 12.0),
            control1: g.point(4.854311, 8.829019),
            control2: g.point(3.534577, 10.31795)
        )
        path.addCurve(
            to: g.point(12.0, 18.5),
            control1: g.point(2.5, 12.0),
            control2: g.point(6.0, 18.5)
        )
        path.addCurve(
            to: g.point(15.7, 17.8),
            control1: g.point(13.267686, 18.515889),
            control2: g.point(14.52573, 18.27788)
        )
        path.move(to: g.point(10.0, 10.0))
        path.addCurve(
            to: g.point(10.0, 14.0),
            control1: g.point(8.895431, 11.104569),
            control2: g.point(8.895431, 12.895431)
        )
        path.addCurve(
            to: g.point(14.0, 14.0),
            control1: g.point(11.104569, 15.104569),
            control2: g.point(12.895431, 15.104569)
        )
        path.move(to: g.point(4.0, 4.0))
        path.addLine(to: g.point(20.0, 20.0))
    }
}

public struct EyeOffIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(EyeOffIconShape(), size: size)
    }
}
