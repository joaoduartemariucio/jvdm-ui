import SwiftUI

public struct MailIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addRoundedRect(
            in: g.rect(2.5, 4.5, 19.0, 15.0),
            cornerSize: g.corner(2.5)
        )
        path.move(to: g.point(3.5, 7.0))
        path.addLine(to: g.point(10.9, 12.2))
        path.addCurve(
            to: g.point(13.1, 12.2),
            control1: g.point(11.567465, 12.639561),
            control2: g.point(12.432535, 12.639561)
        )
        path.addLine(to: g.point(20.5, 7.0))
    }
}

public struct MailIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(MailIconShape(), size: size)
    }
}
