import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmPageHeader extends StatelessWidget {
  const JvdmPageHeader({
    required this.title,
    this.subtitle,
    this.children,
    super.key,
  });

  final Widget title;
  final Widget? subtitle;
  final List<Widget>? children;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: <Widget>[
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              DefaultTextStyle.merge(
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: tokens.textStyle(
                  JvdmTextStep.xl,
                  weight: JvdmWeightStep.bold,
                  color: JvdmColorToken.ink,
                ),
                child: title,
              ),
              if (subtitle != null) ...<Widget>[
                SizedBox(height: tokens.spacing(1)),
                DefaultTextStyle.merge(
                  style: tokens.textStyle(
                    JvdmTextStep.sm,
                    color: JvdmColorToken.inkMuted,
                  ),
                  child: subtitle!,
                ),
              ],
            ],
          ),
        ),
        if (children != null) ...<Widget>[
          SizedBox(width: tokens.spacing(4)),
          Wrap(spacing: tokens.spacing(3), children: children!),
        ],
      ],
    );
  }
}
