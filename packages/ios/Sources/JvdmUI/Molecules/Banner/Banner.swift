import SwiftUI

public struct Banner<Content: View, Action: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let tone: NoticeTone
    let title: String
    private let content: Content
    private let action: Action

    public init(
        title: String,
        tone: NoticeTone = .info,
        @ViewBuilder content: () -> Content,
        @ViewBuilder action: () -> Action
    ) {
        self.title = title
        self.tone = tone
        self.content = content()
        self.action = action()
    }

    public var body: some View {
        HStack(alignment: .center, spacing: theme.spacing(4)) {
            VStack(alignment: .leading, spacing: theme.spacing(1)) {
                Text(title)
                    .font(theme.font(.sm, .medium))
                content
                    .font(theme.font(.xs))
                    .opacity(0.8)
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            action
        }
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

extension Banner where Content == EmptyView, Action == EmptyView {
    public init(_ title: String, tone: NoticeTone = .info) {
        self.init(title: title, tone: tone) { EmptyView() } action: { EmptyView() }
    }
}
