import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import '../banner/banner.dart';

class JvdmCallout extends StatelessWidget {
  const JvdmCallout({
    required this.title,
    required this.child,
    this.tone = JvdmNoticeTone.info,
    super.key,
  });

  final String title;
  final Widget child;
  final JvdmNoticeTone tone;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Container(
      width: double.infinity,
      decoration: jvdmNoticeDecoration(tokens, tone),
      padding: jvdmNoticePadding(tokens),
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
          SizedBox(height: tokens.spacing(1)),
          Opacity(
            opacity: 0.8,
            child: DefaultTextStyle.merge(
              style: tokens.textStyle(JvdmTextStep.sm, color: tone.foreground),
              child: child,
            ),
          ),
        ],
      ),
    );
  }
}
