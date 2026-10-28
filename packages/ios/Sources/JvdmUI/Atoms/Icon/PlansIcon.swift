import SwiftUI

public struct PlansIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addRoundedRect(
            in: g.rect(2.5, 5.0, 19.0, 14.0),
            cornerSize: g.corner(2.5)
        )
        path.move(to: g.point(2.5, 10.0))
        path.addLine(to: g.point(21.5, 10.0))
    }
}

public struct PlansIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(PlansIconShape(), size: size)
    }
}
