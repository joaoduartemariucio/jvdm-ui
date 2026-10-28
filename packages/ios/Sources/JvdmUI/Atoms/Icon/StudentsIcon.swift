import SwiftUI

public struct StudentsIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addEllipse(in: g.rect(5.8, 4.8, 6.4, 6.4))
        path.move(to: g.point(3.5, 19.0))
        path.addCurve(
            to: g.point(9.0, 14.4),
            control1: g.point(3.5, 16.0),
            control2: g.point(6.0, 14.4)
        )
        path.addCurve(
            to: g.point(14.5, 19.0),
            control1: g.point(12.0, 14.4),
            control2: g.point(14.5, 16.0)
        )
        path.move(to: g.point(16.5, 6.6))
        path.addCurve(
            to: g.point(18.422967, 9.4),
            control1: g.point(17.658526, 7.045632),
            control2: g.point(18.422967, 8.158722)
        )
        path.addCurve(
            to: g.point(16.5, 12.2),
            control1: g.point(18.422967, 10.641278),
            control2: g.point(17.658526, 11.754368)
        )
        path.move(to: g.point(18.0, 14.6))
        path.addCurve(
            to: g.point(21.2, 19.0),
            control1: g.point(20.0, 15.2),
            control2: g.point(21.2, 16.6)
        )
    }
}

public struct StudentsIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(StudentsIconShape(), size: size)
    }
}
