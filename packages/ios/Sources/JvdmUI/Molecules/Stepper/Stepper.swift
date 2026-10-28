import SwiftUI

public struct StepItem: Identifiable, Sendable, Equatable {
    public let id: String
    public let label: String
    public let description: String?

    public init(id: String, label: String, description: String? = nil) {
        self.id = id
        self.label = label
        self.description = description
    }
}

public enum StepState: String, CaseIterable, Sendable {
    case done
    case current
    case todo

    public static func of(_ index: Int, current: Int) -> StepState {
        if index < current { return .done }
        if index == current { return .current }
        return .todo
    }

    public var dot: JvdmColorToken {
        switch self {
        case .done, .current: return .accent
        case .todo: return .raised
        }
    }

    public var label: JvdmColorToken {
        switch self {
        case .done, .current: return .ink
        case .todo: return .inkMuted
        }
    }
}

public struct JvdmStepper: View {
    @Environment(\.jvdmTheme) private var theme

    let steps: [StepItem]
    let current: Int

    public init(steps: [StepItem], current: Int) {
        self.steps = steps
        self.current = current
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: theme.spacing(4)) {
            ForEach(Array(steps.enumerated()), id: \.element.id) { index, step in
                let state = StepState.of(index, current: current)

                HStack(alignment: .top, spacing: theme.spacing(3)) {
                    Circle()
                        .fill(theme.color(state.dot))
                        .frame(width: theme.spacing(2.5), height: theme.spacing(2.5))
                        .padding(.top, theme.spacing(1))

                    VStack(alignment: .leading, spacing: theme.spacing(0.5)) {
                        Text(step.label)
                            .font(theme.font(.sm, .medium))
                            .foregroundStyle(theme.color(state.label))
                        if let description = step.description {
                            Text(description)
                                .font(theme.font(.xs))
                                .foregroundStyle(theme.color(.inkMuted))
                        }
                    }
                }
            }
        }
    }
}
