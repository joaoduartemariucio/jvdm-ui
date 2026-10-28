import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmEmpty extends StatelessWidget {
  const JvdmEmpty({required this.title, this.description, super.key});

  final String title;
  final Widget? description;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Padding(
      padding: EdgeInsets.symmetric(vertical: tokens.spacing(16)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Text(
            title,
            textAlign: TextAlign.center,
            style: tokens.textStyle(
              JvdmTextStep.sm,
              weight: JvdmWeightStep.medium,
              color: JvdmColorToken.inkSoft,
            ),
          ),
          if (description != null) ...<Widget>[
            SizedBox(height: tokens.spacing(2)),
            DefaultTextStyle.merge(
              textAlign: TextAlign.center,
              style: tokens.textStyle(
                JvdmTextStep.sm,
                color: JvdmColorToken.inkMuted,
              ),
              child: description!,
            ),
          ],
        ],
      ),
    );
  }
}
