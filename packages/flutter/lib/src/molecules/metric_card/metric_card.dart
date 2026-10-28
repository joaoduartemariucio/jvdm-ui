import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

enum JvdmMetricTrend {
  neutral('neutral', JvdmColorToken.inkMuted),
  up('up', JvdmColorToken.ok),
  down('down', JvdmColorToken.danger);

  const JvdmMetricTrend(this.token, this.color);

  final String token;
  final JvdmColorToken color;
}

class JvdmMetricCard extends StatelessWidget {
  const JvdmMetricCard({
    required this.label,
    required this.value,
    this.change,
    this.trend = JvdmMetricTrend.neutral,
    this.hint,
    this.child,
    super.key,
  });

  final String label;
  final Widget value;
  final String? change;
  final JvdmMetricTrend trend;
  final String? hint;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Container(
      padding: EdgeInsets.all(tokens.spacing(5)),
      decoration: BoxDecoration(
        color: tokens.color(JvdmColorToken.surface),
        border: Border.all(color: tokens.color(JvdmColorToken.line)),
        borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.md)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text(
                label,
                style: tokens.textStyle(
                  JvdmTextStep.xs,
                  color: JvdmColorToken.inkMuted,
                ),
              ),
              if (change != null)
                Text(
                  change!,
                  style: tokens.textStyle(
                    JvdmTextStep.xs,
                    weight: JvdmWeightStep.medium,
                    color: trend.color,
                  ),
                ),
            ],
          ),
          SizedBox(height: tokens.spacing(3)),
          DefaultTextStyle.merge(
            style: tokens.textStyle(
              JvdmTextStep.xxl,
              weight: JvdmWeightStep.bold,
              color: JvdmColorToken.ink,
            ),
            child: value,
          ),
          if (hint != null) ...<Widget>[
            SizedBox(height: tokens.spacing(1)),
            Text(
              hint!,
              style: tokens.textStyle(
                JvdmTextStep.xs,
                color: JvdmColorToken.inkDim,
              ),
            ),
          ],
          if (child != null) ...<Widget>[
            SizedBox(height: tokens.spacing(4)),
            child!,
          ],
        ],
      ),
    );
  }
}
