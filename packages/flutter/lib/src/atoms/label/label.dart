import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

enum JvdmLabelTone {
  muted('muted', JvdmColorToken.inkMuted),
  dim('dim', JvdmColorToken.inkDim),
  accent('accent', JvdmColorToken.accentInk);

  const JvdmLabelTone(this.token, this.color);

  final String token;
  final JvdmColorToken color;
}

class JvdmLabel extends StatelessWidget {
  const JvdmLabel({
    required this.child,
    this.tone = JvdmLabelTone.muted,
    super.key,
  });

  final Widget child;
  final JvdmLabelTone tone;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return DefaultTextStyle.merge(
      style: tokens.textStyle(
        JvdmTextStep.xxs,
        color: tone.color,
        tracking: JvdmTrackingStep.caps,
      ),
      child: child,
    );
  }
}
