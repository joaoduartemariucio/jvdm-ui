import SwiftUI

public struct CloseIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(6.0, 6.0))
        path.addLine(to: g.point(18.0, 18.0))
        path.move(to: g.point(18.0, 6.0))
        path.addLine(to: g.point(6.0, 18.0))
    }
}

public struct CloseIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(CloseIconShape(), size: size)
    }
}
