import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';
import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import '../badge/badge.dart';
import '../icon/close.dart';
import 'locales.dart';

export 'locales.dart';

class JvdmTag extends StatelessWidget {
  const JvdmTag({
    required this.child,
    this.tone = BadgeTone.neutral,
    this.onRemove,
    this.removeLabel = JvdmTagLocales.remove,
    this.disabled = false,
    super.key,
  });

  final Widget child;
  final BadgeTone tone;
  final VoidCallback? onRemove;
  final String removeLabel;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Opacity(
      opacity: disabled ? 0.5 : 1,
      child: Container(
        padding: EdgeInsets.only(
          left: tokens.spacing(2),
          right: tokens.spacing(onRemove == null ? 2 : 1),
          top: tokens.spacing(0.5),
          bottom: tokens.spacing(0.5),
        ),
        decoration: BoxDecoration(
          color: tokens.color(tone.background),
          borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.sm)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Flexible(
              child: DefaultTextStyle.merge(
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: tokens.textStyle(
                  JvdmTextStep.xs,
                  weight: JvdmWeightStep.medium,
                  color: tone.foreground,
                ),
                child: child,
              ),
            ),
            if (onRemove != null) ...<Widget>[
              SizedBox(width: tokens.spacing(1)),
              Semantics(
                button: true,
                label: removeLabel,
                child: GestureDetector(
                  onTap: disabled ? null : onRemove,
                  child: Opacity(
                    opacity: 0.7,
                    child: Padding(
                      padding: EdgeInsets.all(tokens.spacing(0.5)),
                      child: JvdmCloseIcon(
                        size: JvdmIconSize.sm,
                        color: tokens.color(tone.foreground),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
