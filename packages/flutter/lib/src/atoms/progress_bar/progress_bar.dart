import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

enum JvdmProgressTone {
  accent('accent', JvdmColorToken.accent),
  ok('ok', JvdmColorToken.ok),
  warn('warn', JvdmColorToken.warn),
  danger('danger', JvdmColorToken.danger);

  const JvdmProgressTone(this.token, this.fill);

  final String token;
  final JvdmColorToken fill;
}

enum JvdmProgressSize {
  md('md', 2),
  xs('xs', 1);

  const JvdmProgressSize(this.token, this.steps);

  final String token;
  final int steps;
}

double jvdmProgressRatio(double value) => value.clamp(0.0, 1.0);

class JvdmProgressBar extends StatelessWidget {
  const JvdmProgressBar({
    required this.value,
    this.tone = JvdmProgressTone.accent,
    this.size = JvdmProgressSize.md,
    this.dim = false,
    this.label,
    super.key,
  });

  final double value;
  final JvdmProgressTone tone;
  final JvdmProgressSize size;
  final bool dim;
  final String? label;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final double height = tokens.spacing(size.steps.toDouble());
    final double ratio = jvdmProgressRatio(value);

    return Semantics(
      label: label,
      value: '${(ratio * 100).round()}',
      child: Opacity(
        opacity: dim ? 0.5 : 1,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(height / 2),
          child: SizedBox(
            height: height,
            child: Stack(
              fit: StackFit.expand,
              children: <Widget>[
                ColoredBox(color: tokens.color(JvdmColorToken.raised)),
                FractionallySizedBox(
                  alignment: Alignment.centerLeft,
                  widthFactor: ratio,
                  child: ColoredBox(color: tokens.color(tone.fill)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
