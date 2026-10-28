import 'package:flutter/material.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

enum BadgeTone {
  neutral(JvdmColorToken.raised, JvdmColorToken.inkSoft),
  accent(JvdmColorToken.accentSoft, JvdmColorToken.accentInk),
  ok(JvdmColorToken.okSoft, JvdmColorToken.ok),
  warn(JvdmColorToken.warnSoft, JvdmColorToken.warn),
  danger(JvdmColorToken.dangerSoft, JvdmColorToken.danger),
  info(JvdmColorToken.infoSoft, JvdmColorToken.info);

  const BadgeTone(this.background, this.foreground);

  final JvdmColorToken background;
  final JvdmColorToken foreground;
}

class JvdmBadge extends StatelessWidget {
  const JvdmBadge(
      {required this.child, this.tone = BadgeTone.neutral, super.key});

  final Widget child;
  final BadgeTone tone;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.color(tone.background),
        borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.xs)),
      ),
      child: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: tokens.spacing(2),
          vertical: tokens.spacing(0.5),
        ),
        child: DefaultTextStyle.merge(
          style: tokens.textStyle(
            JvdmTextStep.xxs,
            weight: JvdmWeightStep.medium,
            color: tone.foreground,
          ),
          child: child,
        ),
      ),
    );
  }
}
