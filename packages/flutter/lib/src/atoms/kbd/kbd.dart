import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmKbd extends StatelessWidget {
  const JvdmKbd({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Container(
      alignment: Alignment.center,
      constraints: BoxConstraints(minWidth: tokens.spacing(6)),
      padding: EdgeInsets.symmetric(
        horizontal: tokens.spacing(1),
        vertical: tokens.spacing(0.5),
      ),
      decoration: BoxDecoration(
        color: tokens.color(JvdmColorToken.raised),
        border: Border.all(color: tokens.color(JvdmColorToken.lineStrong)),
        borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.xs)),
      ),
      child: DefaultTextStyle.merge(
        style: tokens
            .textStyle(JvdmTextStep.xxs, color: JvdmColorToken.inkSoft)
            .copyWith(fontFamily: jvdmFontMono.first),
        child: child,
      ),
    );
  }
}
