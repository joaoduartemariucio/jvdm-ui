import SwiftUI

public struct SunIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addEllipse(in: g.rect(8.0, 8.0, 8.0, 8.0))
        path.move(to: g.point(12.0, 2.5))
        path.addLine(to: g.point(12.0, 4.5))
        path.move(to: g.point(12.0, 19.5))
        path.addLine(to: g.point(12.0, 21.5))
        path.move(to: g.point(4.6, 4.6))
        path.addLine(to: g.point(6.0, 6.0))
        path.move(to: g.point(18.0, 18.0))
        path.addLine(to: g.point(19.4, 19.4))
        path.move(to: g.point(2.5, 12.0))
        path.addLine(to: g.point(4.5, 12.0))
        path.move(to: g.point(19.5, 12.0))
        path.addLine(to: g.point(21.5, 12.0))
        path.move(to: g.point(4.6, 19.4))
        path.addLine(to: g.point(6.0, 18.0))
        path.move(to: g.point(18.0, 6.0))
        path.addLine(to: g.point(19.4, 4.6))
    }
}

public struct SunIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(SunIconShape(), size: size)
    }
}
