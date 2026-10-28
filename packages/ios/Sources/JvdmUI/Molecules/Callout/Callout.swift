import SwiftUI

public struct Callout<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let tone: NoticeTone
    let title: String
    private let content: Content

    public init(title: String, tone: NoticeTone = .info, @ViewBuilder content: () -> Content) {
        self.title = title
        self.tone = tone
        self.content = content()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: theme.spacing(1)) {
            Text(title)
                .font(theme.font(.sm, .medium))
            content
                .font(theme.font(.sm))
                .opacity(0.8)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .foregroundStyle(theme.color(tone.foreground))
        .padding(.horizontal, theme.spacing(4))
        .padding(.vertical, theme.spacing(3))
        .background(theme.color(tone.background))
        .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous)
                .strokeBorder(
                    theme.color(tone.foreground).opacity(NoticeTone.borderOpacity),
                    lineWidth: 1
                )
        )
    }
}
