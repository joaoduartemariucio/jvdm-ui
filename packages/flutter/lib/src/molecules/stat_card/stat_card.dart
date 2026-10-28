import 'package:flutter/widgets.dart';

import '../../atoms/card/card.dart';
import '../../atoms/label/label.dart';
import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

JvdmTextStep jvdmStatCardStep(String value) {
  if (value.length <= 7) {
    return JvdmTextStep.xxl;
  }
  if (value.length <= 12) {
    return JvdmTextStep.lg;
  }
  return JvdmTextStep.sm;
}

class JvdmStatCard extends StatelessWidget {
  const JvdmStatCard({
    required this.label,
    required this.value,
    this.hint,
    this.color,
    this.attention = false,
    super.key,
  });

  final String label;
  final String value;
  final String? hint;
  final JvdmColorToken? color;
  final bool attention;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    final Widget card = JvdmCard(
      padding: JvdmCardPadding.sm,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          JvdmLabel(child: Text(label)),
          SizedBox(height: tokens.spacing(1)),
          Text(
            value,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: tokens.textStyle(
              jvdmStatCardStep(value),
              weight: JvdmWeightStep.bold,
              color: color ?? JvdmColorToken.ink,
            ),
          ),
          if (hint != null) ...<Widget>[
            SizedBox(height: tokens.spacing(1)),
            Text(
              hint!,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: tokens.textStyle(
                JvdmTextStep.xs,
                color: JvdmColorToken.inkMuted,
              ),
            ),
          ],
        ],
      ),
    );

    if (!attention) {
      return card;
    }

    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border.all(
          color: tokens.color(JvdmColorToken.dangerSoft),
          width: tokens.spacing(1),
        ),
        borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.md)),
      ),
      child: card,
    );
  }
}
