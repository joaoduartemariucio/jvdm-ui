import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

enum JvdmCardPadding {
  none('none', 0),
  sm('sm', 4),
  md('md', 5),
  lg('lg', 6);

  const JvdmCardPadding(this.token, this.steps);

  final String token;
  final int steps;
}

class JvdmCard extends StatelessWidget {
  const JvdmCard({
    required this.child,
    this.padding = JvdmCardPadding.md,
    super.key,
  });

  final Widget child;
  final JvdmCardPadding padding;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Container(
      padding: EdgeInsets.all(tokens.spacing(padding.steps.toDouble())),
      decoration: BoxDecoration(
        color: tokens.color(JvdmColorToken.surface),
        border: Border.all(color: tokens.color(JvdmColorToken.line)),
        borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.md)),
      ),
      child: child,
    );
  }
}
