import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import 'notice_tone.dart';

export 'notice_tone.dart';

BoxDecoration jvdmNoticeDecoration(JvdmTokens tokens, JvdmNoticeTone tone) {
  return BoxDecoration(
    color: tokens.color(tone.background),
    border: Border.all(
      color: tokens
          .color(tone.foreground)
          .withValues(alpha: jvdmNoticeBorderOpacity),
    ),
    borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.md)),
  );
}

EdgeInsets jvdmNoticePadding(JvdmTokens tokens) {
  return EdgeInsets.symmetric(
    horizontal: tokens.spacing(4),
    vertical: tokens.spacing(3),
  );
}

class JvdmBanner extends StatelessWidget {
  const JvdmBanner({
    required this.title,
    this.tone = JvdmNoticeTone.info,
    this.child,
    this.action,
    super.key,
  });

  final String title;
  final JvdmNoticeTone tone;
  final Widget? child;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Container(
      decoration: jvdmNoticeDecoration(tokens, tone),
      padding: jvdmNoticePadding(tokens),
      child: Row(
        children: <Widget>[
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  title,
                  style: tokens.textStyle(
                    JvdmTextStep.sm,
                    weight: JvdmWeightStep.medium,
                    color: tone.foreground,
                  ),
                ),
                if (child != null) ...<Widget>[
                  SizedBox(height: tokens.spacing(1)),
                  Opacity(
                    opacity: 0.8,
                    child: DefaultTextStyle.merge(
                      style: tokens.textStyle(
                        JvdmTextStep.xs,
                        color: tone.foreground,
                      ),
                      child: child!,
                    ),
                  ),
                ],
              ],
            ),
          ),
          if (action != null) ...<Widget>[
            SizedBox(width: tokens.spacing(4)),
            action!,
          ],
        ],
      ),
    );
  }
}
