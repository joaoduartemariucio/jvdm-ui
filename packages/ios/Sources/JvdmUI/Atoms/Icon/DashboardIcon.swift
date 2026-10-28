import SwiftUI

public struct DashboardIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addRoundedRect(
            in: g.rect(3.0, 3.0, 7.0, 7.0),
            cornerSize: g.corner(1.5)
        )
        path.addRoundedRect(
            in: g.rect(14.0, 3.0, 7.0, 7.0),
            cornerSize: g.corner(1.5)
        )
        path.addRoundedRect(
            in: g.rect(3.0, 14.0, 7.0, 7.0),
            cornerSize: g.corner(1.5)
        )
        path.addRoundedRect(
            in: g.rect(14.0, 14.0, 7.0, 7.0),
            cornerSize: g.corner(1.5)
        )
    }
}

public struct DashboardIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(DashboardIconShape(), size: size)
    }
}
