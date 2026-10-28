import SwiftUI

public struct SearchIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addEllipse(in: g.rect(4.5, 4.5, 13.0, 13.0))
        path.move(to: g.point(16.0, 16.0))
        path.addLine(to: g.point(20.5, 20.5))
    }
}

public struct SearchIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(SearchIconShape(), size: size)
    }
}
