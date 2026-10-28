import SwiftUI

public enum ControlSize: String, CaseIterable, Sendable {
    case sm
    case md

    public var horizontal: Double {
        self == .sm ? 3 : 4
    }

    public var vertical: Double {
        self == .sm ? 2 : 3
    }
}

public struct ControlStyle: ViewModifier {
    @Environment(\.jvdmTheme) private var theme

    let size: ControlSize
    let invalid: Bool

    public init(size: ControlSize = .md, invalid: Bool = false) {
        self.size = size
        self.invalid = invalid
    }

    public func body(content: Content) -> some View {
        content
            .font(theme.font(.sm))
            .foregroundStyle(theme.color(.ink))
            .padding(.horizontal, theme.spacing(size.horizontal))
            .padding(.vertical, theme.spacing(size.vertical))
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(theme.color(.field))
            .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous)
                    .strokeBorder(theme.color(invalid ? .danger : .lineStrong), lineWidth: 1)
            )
    }
}

extension View {
    public func jvdmControl(size: ControlSize = .md, invalid: Bool = false) -> some View {
        modifier(ControlStyle(size: size, invalid: invalid))
    }
}
