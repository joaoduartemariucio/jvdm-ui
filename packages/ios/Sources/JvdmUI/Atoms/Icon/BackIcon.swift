import SwiftUI

public struct BackIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(14.0, 6.0))
        path.addLine(to: g.point(8.0, 12.0))
        path.addLine(to: g.point(14.0, 18.0))
    }
}

public struct BackIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(BackIconShape(), size: size)
    }
}
