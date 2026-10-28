import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmDivider extends StatelessWidget {
  const JvdmDivider({this.child, this.vertical = false, super.key});

  final Widget? child;
  final bool vertical;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final Color line = tokens.color(JvdmColorToken.line);

    if (vertical) {
      return ExcludeSemantics(
        child: Container(width: 1, color: line),
      );
    }

    if (child == null) {
      return ExcludeSemantics(
        child: Container(height: 1, color: line),
      );
    }

    return Row(
      children: <Widget>[
        Expanded(child: Container(height: 1, color: line)),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: tokens.spacing(3)),
          child: DefaultTextStyle.merge(
            style: tokens.textStyle(
              JvdmTextStep.xxs,
              weight: JvdmWeightStep.medium,
              color: JvdmColorToken.inkDim,
              tracking: JvdmTrackingStep.caps,
            ),
            child: child!,
          ),
        ),
        Expanded(child: Container(height: 1, color: line)),
      ],
    );
  }
}
