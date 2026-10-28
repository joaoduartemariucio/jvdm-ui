import SwiftUI

public struct InstagramIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addRoundedRect(
            in: g.rect(3.5, 3.5, 17.0, 17.0),
            cornerSize: g.corner(4.5)
        )
        path.addEllipse(in: g.rect(8.2, 8.2, 7.6, 7.6))
        path.move(to: g.point(17.0, 7.0))
        path.addLine(to: g.point(17.01, 7.0))
    }
}

public struct InstagramIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(InstagramIconShape(), size: size)
    }
}
