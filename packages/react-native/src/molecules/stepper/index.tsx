import { Text, View } from "react-native";

import { useJvdmTokens } from "../../tokens";
import { STEP_TOKENS, stepState, type Step } from "./stepper-style";

export { STEP_STATES, STEP_TOKENS, stepState, type Step, type StepState } from "./stepper-style";

export function Stepper({ steps, current }: { steps: readonly Step[]; current: number }) {
  const tokens = useJvdmTokens();
  const dot = tokens.spacing(2.5);

  return (
    <View style={{ gap: tokens.spacing(4) }}>
      {steps.map((step, index) => {
        const paint = STEP_TOKENS[stepState(index, current)];

        return (
          <View key={step.id} style={{ flexDirection: "row", gap: tokens.spacing(3) }}>
            <View
              style={{
                backgroundColor: tokens.color(paint.dot),
                borderRadius: dot / 2,
                height: dot,
                marginTop: tokens.spacing(1),
                width: dot,
              }}
            />
            <View style={{ flex: 1, gap: tokens.spacing(0.5) }}>
              <Text
                style={{
                  color: tokens.color(paint.label),
                  fontSize: tokens.fontSize("sm"),
                  fontWeight: tokens.fontWeight("medium"),
                }}
              >
                {step.label}
              </Text>
              {step.description === undefined ? null : (
                <Text style={{ color: tokens.color("ink-muted"), fontSize: tokens.fontSize("xs") }}>
                  {step.description}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
