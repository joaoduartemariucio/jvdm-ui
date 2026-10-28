import SwiftUI

public struct FaceIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addEllipse(in: g.rect(8.4, 5.9, 7.2, 7.2))
        path.move(to: g.point(4.5, 20.0))
        path.addCurve(
            to: g.point(12.0, 14.4),
            control1: g.point(4.5, 16.4),
            control2: g.point(7.9, 14.4)
        )
        path.addCurve(
            to: g.point(19.5, 20.0),
            control1: g.point(16.1, 14.4),
            control2: g.point(19.5, 16.4)
        )
    }
}

public struct FaceIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(FaceIconShape(), size: size)
    }
}
