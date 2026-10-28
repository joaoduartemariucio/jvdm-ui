import SwiftUI

public struct ChevronIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(6.0, 9.0))
        path.addLine(to: g.point(12.0, 15.0))
        path.addLine(to: g.point(18.0, 9.0))
    }
}

public struct ChevronIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(ChevronIconShape(), size: size)
    }
}
