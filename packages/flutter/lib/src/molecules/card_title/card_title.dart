import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmCardTitle extends StatelessWidget {
  const JvdmCardTitle({required this.child, this.hint, super.key});

  final Widget child;
  final Widget? hint;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.baseline,
      textBaseline: TextBaseline.alphabetic,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        DefaultTextStyle.merge(
          style: tokens.textStyle(
            JvdmTextStep.sm,
            weight: JvdmWeightStep.medium,
            color: JvdmColorToken.ink,
          ),
          child: child,
        ),
        if (hint != null) ...<Widget>[
          SizedBox(width: tokens.spacing(3)),
          DefaultTextStyle.merge(
            style: tokens.textStyle(
              JvdmTextStep.xs,
              color: JvdmColorToken.inkMuted,
            ),
            child: hint!,
          ),
        ],
      ],
    );
  }
}
