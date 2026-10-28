import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmFormAlert extends StatelessWidget {
  const JvdmFormAlert({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      liveRegion: true,
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.symmetric(
          horizontal: tokens.spacing(3),
          vertical: tokens.spacing(2),
        ),
        decoration: BoxDecoration(
          color: tokens.color(JvdmColorToken.dangerSoft),
          borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.md)),
        ),
        child: DefaultTextStyle.merge(
          style: tokens.textStyle(
            JvdmTextStep.sm,
            color: JvdmColorToken.danger,
          ),
          child: child,
        ),
      ),
    );
  }
}
