import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import '../checkbox/checkbox.dart';

class JvdmRadio extends StatelessWidget {
  const JvdmRadio({
    this.label,
    this.selected = false,
    this.disabled = false,
    this.onSelect,
    super.key,
  });

  final Widget? label;
  final bool selected;
  final bool disabled;
  final VoidCallback? onSelect;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final double box = tokens.spacing(jvdmChoiceBox);
    final double dot = tokens.spacing(jvdmChoiceDot);

    return Semantics(
      checked: selected,
      inMutuallyExclusiveGroup: true,
      enabled: !disabled,
      child: Opacity(
        opacity: disabled ? 0.5 : 1,
        child: GestureDetector(
          onTap: disabled ? null : onSelect,
          child: ConstrainedBox(
            constraints: BoxConstraints(minHeight: tokens.spacing(10)),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Container(
                  width: box,
                  height: box,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: tokens.color(JvdmColorToken.field),
                    border: Border.all(
                      color: tokens.color(
                        selected
                            ? JvdmColorToken.accent
                            : JvdmColorToken.lineStrong,
                      ),
                    ),
                    shape: BoxShape.circle,
                  ),
                  child: selected
                      ? Container(
                          width: dot,
                          height: dot,
                          decoration: BoxDecoration(
                            color: tokens.color(JvdmColorToken.accent),
                            shape: BoxShape.circle,
                          ),
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
