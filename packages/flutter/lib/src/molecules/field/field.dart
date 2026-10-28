import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmField extends StatelessWidget {
  const JvdmField({
    required this.label,
    required this.child,
    this.error,
    this.action,
    super.key,
  });

  final String label;
  final Widget child;
  final String? error;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      label: label,
      container: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text(
                label,
                style: tokens.textStyle(
                  JvdmTextStep.xs,
                  weight: JvdmWeightStep.medium,
                  color: JvdmColorToken.inkSoft,
                ),
              ),
              if (action != null) action!,
            ],
          ),
          SizedBox(height: tokens.spacing(2)),
          child,
          if (error != null) ...<Widget>[
            SizedBox(height: tokens.spacing(2)),
            Text(
              error!,
              style: tokens.textStyle(
                JvdmTextStep.xxs,
                color: JvdmColorToken.danger,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
