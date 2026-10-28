import SwiftUI

public struct CheckIconShape: JvdmIconShape {
    public init() {}

    public func trace(into path: inout Path, with g: JvdmIconGeometry) {
        path.move(to: g.point(5.0, 12.5))
        path.addLine(to: g.point(9.5, 17.0))
        path.addLine(to: g.point(19.0, 7.5))
    }
}

public struct CheckIcon: View {
    private let size: JvdmIconSize

    public init(size: JvdmIconSize = .md) {
        self.size = size
    }

    public var body: some View {
        JvdmIcon(CheckIconShape(), size: size)
    }
}
