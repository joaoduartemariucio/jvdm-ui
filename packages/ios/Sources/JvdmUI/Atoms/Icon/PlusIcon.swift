import SwiftUI

public struct PlusIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(12.0, 5.0))
        path.addLine(to: g.point(12.0, 19.0))
        path.move(to: g.point(5.0, 12.0))
        path.addLine(to: g.point(19.0, 12.0))
    }
}

public struct PlusIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(PlusIconShape(), size: size)
    }
}
