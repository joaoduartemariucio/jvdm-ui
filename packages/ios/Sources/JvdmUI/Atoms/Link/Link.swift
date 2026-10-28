import SwiftUI

public enum LinkTone: String, CaseIterable, Sendable {
    case accent
    case ink
    case muted

    public var color: JvdmColorToken {
        switch self {
        case .accent: return .accentInk
        case .ink: return .ink
        case .muted: return .inkMuted
        }
    }

    public var underline: JvdmColorToken {
        switch self {
        case .accent: return .accent
        case .ink: return .lineStrong
        case .muted: return .line
        }
    }
}

public struct JvdmLink: View {
    @Environment(\.jvdmTheme) private var theme

    let title: String
    let tone: LinkTone
    let destination: URL

    public init(_ title: String, destination: URL, tone: LinkTone = .accent) {
        self.title = title
        self.destination = destination
        self.tone = tone
    }

    public var body: some View {
        Link(destination: destination) {
            Text(title)
                .foregroundStyle(theme.color(tone.color))
                .underline(true, color: theme.color(tone.underline))
        }
    }
}
