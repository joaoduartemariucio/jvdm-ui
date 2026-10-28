import SwiftUI

public struct FunnelIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(3.0, 5.0))
        path.addLine(to: g.point(21.0, 5.0))
        path.addLine(to: g.point(14.0, 13.0))
        path.addLine(to: g.point(14.0, 19.0))
        path.addLine(to: g.point(10.0, 21.0))
        path.addLine(to: g.point(10.0, 13.0))
        path.closeSubpath()
    }
}

public struct FunnelIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(FunnelIconShape(), size: size)
    }
}
