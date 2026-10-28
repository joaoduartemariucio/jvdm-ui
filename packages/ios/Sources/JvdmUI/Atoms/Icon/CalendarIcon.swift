import SwiftUI

public struct CalendarIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.addRoundedRect(
            in: g.rect(3.5, 5.0, 17.0, 16.0),
            cornerSize: g.corner(2.5)
        )
        path.move(to: g.point(3.5, 10.0))
        path.addLine(to: g.point(20.5, 10.0))
        path.move(to: g.point(8.0, 3.5))
        path.addLine(to: g.point(8.0, 6.5))
        path.move(to: g.point(16.0, 3.5))
        path.addLine(to: g.point(16.0, 6.5))
    }
}

public struct CalendarIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(CalendarIconShape(), size: size)
    }
}
