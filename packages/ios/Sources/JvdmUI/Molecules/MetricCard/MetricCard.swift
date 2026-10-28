import SwiftUI

public enum MetricTrend: String, CaseIterable, Sendable {
    case neutral
    case up
    case down

    public var color: JvdmColorToken {
        switch self {
        case .neutral: return .inkMuted
        case .up: return .ok
        case .down: return .danger
        }
    }
}

public struct MetricCard<Content: View>: View {
    @Environment(\.jvdmTheme) private var theme

    let label: String
    let value: String
    let change: String?
    let trend: MetricTrend
    let hint: String?
    private let content: Content

    public init(
        label: String,
        value: String,
        change: String? = nil,
        trend: MetricTrend = .neutral,
        hint: String? = nil,
        @ViewBuilder content: () -> Content
    ) {
        self.label = label
        self.value = value
        self.change = change
        self.trend = trend
        self.hint = hint
        self.content = content()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: theme.spacing(0)) {
            HStack(alignment: .top, spacing: theme.spacing(4)) {
                Text(label)
                    .font(theme.font(.xs))
                    .foregroundStyle(theme.color(.inkMuted))
                Spacer(minLength: 0)
                if let change {
                    Text(change)
                        .font(theme.font(.xs, .medium))
                        .foregroundStyle(theme.color(trend.color))
                }
            }

            Text(value)
                .font(theme.font(.xxl, .bold))
                .foregroundStyle(theme.color(.ink))
                .padding(.top, theme.spacing(3))

            if let hint {
                Text(hint)
                    .font(theme.font(.xs))
                    .foregroundStyle(theme.color(.inkDim))
                    .padding(.top, theme.spacing(1))
            }

            content
                .padding(.top, theme.spacing(4))
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(theme.spacing(5))
        .background(theme.color(.surface))
        .clipShape(RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: theme.radius(.md), style: .continuous)
                .strokeBorder(theme.color(.line), lineWidth: 1)
        )
    }
}

extension MetricCard where Content == EmptyView {
    public init(
        label: String,
        value: String,
        change: String? = nil,
        trend: MetricTrend = .neutral,
        hint: String? = nil
    ) {
        self.init(label: label, value: value, change: change, trend: trend, hint: hint) {
            EmptyView()
        }
    }
}
