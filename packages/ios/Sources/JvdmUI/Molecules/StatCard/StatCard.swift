import SwiftUI

public struct StatCard: View {
    @Environment(\.jvdmTheme) private var theme

    let label: String
    let value: String
    let hint: String?
    let color: JvdmColorToken?
    let attention: Bool

    public init(
        label: String,
        value: String,
        hint: String? = nil,
        color: JvdmColorToken? = nil,
        attention: Bool = false
    ) {
        self.label = label
        self.value = value
        self.hint = hint
        self.color = color
        self.attention = attention
    }

    public var body: some View {
        Card(padding: .sm) {
            VStack(alignment: .leading, spacing: theme.spacing(1)) {
                JvdmLabel(label)
                Text(value)
                    .font(theme.font(StatCardStyle.step(for: value), .bold))
                    .foregroundStyle(theme.color(color ?? .ink))
                    .lineLimit(1)
                if let hint {
                    Text(hint)
                        .font(theme.font(.xs))
                        .foregroundStyle(theme.color(.inkMuted))
                        .lineLimit(1)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .overlay(attentionRing)
    }

    @ViewBuilder private var attentionRing: some View {
        if attention {
            RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous)
                .strokeBorder(theme.color(.dangerSoft), lineWidth: theme.spacing(1))
        }
    }
}
