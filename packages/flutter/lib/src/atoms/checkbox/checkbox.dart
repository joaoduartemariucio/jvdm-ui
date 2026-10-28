import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import '../../tokens/icon.dart';
import '../icon/check.dart';
import 'choice_style.dart';

export 'choice_style.dart';

class JvdmCheckbox extends StatelessWidget {
  const JvdmCheckbox({
    this.label,
    this.checked = false,
    this.disabled = false,
    this.onCheckedChange,
    super.key,
  });

  final Widget? label;
  final bool checked;
  final bool disabled;
  final ValueChanged<bool>? onCheckedChange;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final double box = tokens.spacing(jvdmChoiceBox);

    return Semantics(
      checked: checked,
      enabled: !disabled,
      child: Opacity(
        opacity: disabled ? 0.5 : 1,
        child: GestureDetector(
          onTap: disabled ? null : () => onCheckedChange?.call(!checked),
          child: ConstrainedBox(
            constraints: BoxConstraints(minHeight: tokens.spacing(10)),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Container(
                  width: box,
                  height: box,
                  alignment: Alignment.center,
                  decoration: jvdmChoiceDecoration(
                    tokens,
                    selected: checked,
                    borderRadius: BorderRadius.circular(
                      tokens.radius(JvdmRadiusStep.xs),
                    ),
                  ),
                  child: checked
                      ? JvdmCheckIcon(
                          size: JvdmIconSize.sm,
                          color: tokens.color(JvdmColorToken.onAccent),
                        )
                      : null,
                ),
                if (label != null) ...<Widget>[
                  SizedBox(width: tokens.spacing(3)),
                  DefaultTextStyle.merge(
                    style: jvdmChoiceLabel(tokens),
                    child: label!,
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
