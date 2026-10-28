import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmStep {
  const JvdmStep({required this.id, required this.label, this.description});

  final String id;
  final String label;
  final String? description;
}

enum JvdmStepState {
  done('done', JvdmColorToken.accent, JvdmColorToken.ink),
  current('current', JvdmColorToken.accent, JvdmColorToken.ink),
  todo('todo', JvdmColorToken.raised, JvdmColorToken.inkMuted);

  const JvdmStepState(this.token, this.dot, this.label);

  final String token;
  final JvdmColorToken dot;
  final JvdmColorToken label;

  static JvdmStepState of(int index, int current) {
    if (index < current) {
      return JvdmStepState.done;
    }
    if (index == current) {
      return JvdmStepState.current;
    }
    return JvdmStepState.todo;
  }
}

class JvdmStepper extends StatelessWidget {
  const JvdmStepper({required this.steps, required this.current, super.key});

  final List<JvdmStep> steps;
  final int current;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final double dot = tokens.spacing(2.5);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        for (int index = 0; index < steps.length; index += 1) ...<Widget>[
          if (index > 0) SizedBox(height: tokens.spacing(4)),
          Builder(
            builder: (BuildContext context) {
              final JvdmStepState state = JvdmStepState.of(index, current);
              final JvdmStep step = steps[index];

              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.only(top: tokens.spacing(1)),
                    child: Container(
                      width: dot,
                      height: dot,
                      decoration: BoxDecoration(
                        color: tokens.color(state.dot),
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                  SizedBox(width: tokens.spacing(3)),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          step.label,
                          style: tokens.textStyle(
                            JvdmTextStep.sm,
                            weight: JvdmWeightStep.medium,
                            color: state.label,
                          ),
                        ),
                        if (step.description != null)
                          Text(
                            step.description!,
                            style: tokens.textStyle(
                              JvdmTextStep.xs,
                              color: JvdmColorToken.inkMuted,
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
              );
            },
          ),
        ],
      ],
    );
  }
}
