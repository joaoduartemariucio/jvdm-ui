import SwiftUI

public enum JvdmIconSize: String, CaseIterable, Sendable {
    case sm
    case md
    case lg
    case xl
    case xxl = "2xl"

    public var points: CGFloat {
        switch self {
        case .sm: return 12
        case .md: return 16
        case .lg: return 20
        case .xl: return 24
        case .xxl: return 32
        }
    }
}

public struct JvdmIconGeometry: Sendable {
    public static let viewBox: CGFloat = 24

    private let scale: CGFloat
    private let origin: CGPoint

    public init(rect: CGRect) {
        scale = min(rect.width, rect.height) / Self.viewBox
        origin = CGPoint(x: rect.minX, y: rect.minY)
    }

    public func point(_ x: CGFloat, _ y: CGFloat) -> CGPoint {
        CGPoint(x: origin.x + x * scale, y: origin.y + y * scale)
    }

    public func rect(_ x: CGFloat, _ y: CGFloat, _ width: CGFloat, _ height: CGFloat) -> CGRect {
        CGRect(
            origin: point(x, y),
            size: CGSize(width: width * scale, height: height * scale)
        )
    }

    public func corner(_ radius: CGFloat) -> CGSize {
        CGSize(width: radius * scale, height: radius * scale)
    }

    public var strokeWidth: CGFloat { 1.6 * scale }
}

public protocol JvdmIconShape: Sendable {
    func trace(into path: inout Path, with g: JvdmIconGeometry)
}

public struct JvdmIconPath<Icon: JvdmIconShape>: Shape {
    private let icon: Icon

    public init(_ icon: Icon) {
        self.icon = icon
    }

    public func path(in rect: CGRect) -> Path {
        var path = Path()
        icon.trace(into: &path, with: JvdmIconGeometry(rect: rect))
        return path
    }
}

public struct JvdmIcon<Icon: JvdmIconShape>: View {
    private let icon: Icon
    private let size: JvdmIconSize

    public init(_ icon: Icon, size: JvdmIconSize = .md) {
        self.icon = icon
        self.size = size
    }

    public var body: some View {
        JvdmIconPath(icon)
            .stroke(
                style: StrokeStyle(
                    lineWidth: JvdmIconGeometry(
                        rect: CGRect(x: 0, y: 0, width: size.points, height: size.points)
                    ).strokeWidth,
                    lineCap: .round,
                    lineJoin: .round
                )
            )
            .frame(width: size.points, height: size.points)
    }
}
