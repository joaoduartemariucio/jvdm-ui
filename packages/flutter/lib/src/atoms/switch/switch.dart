import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import '../checkbox/checkbox.dart';
import 'switch_style.dart';

export 'switch_style.dart';

class JvdmSwitch extends StatelessWidget {
  const JvdmSwitch({
    required this.checked,
    required this.onCheckedChange,
    this.label,
    this.disabled = false,
    super.key,
  });

  final bool checked;
  final ValueChanged<bool> onCheckedChange;
  final Widget? label;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      toggled: checked,
      enabled: !disabled,
      child: Opacity(
        opacity: disabled ? 0.5 : 1,
        child: GestureDetector(
          onTap: disabled ? null : () => onCheckedChange(!checked),
          child: ConstrainedBox(
            constraints: BoxConstraints(minHeight: tokens.spacing(10)),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                AnimatedContainer(
                  duration: tokens.duration(JvdmDurationStep.fast),
                  curve: tokens.curve(JvdmEaseStep.out),
                  width: jvdmSwitchTrackWidth,
                  height: jvdmSwitchTrackHeight,
                  alignment:
                      checked ? Alignment.centerRight : Alignment.centerLeft,
                  padding: const EdgeInsets.symmetric(
                    horizontal: jvdmSwitchInset,
                  ),
                  decoration: BoxDecoration(
                    color: tokens.color(jvdmSwitchTrack(checked)),
                    borderRadius: BorderRadius.circular(
                      jvdmSwitchTrackHeight / 2,
                    ),
                  ),
                  child: Container(
                    width: jvdmSwitchThumb,
                    height: jvdmSwitchThumb,
                    decoration: BoxDecoration(
                      color: tokens.color(jvdmSwitchThumbColor(checked)),
                      shape: BoxShape.circle,
                    ),
                  ),
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
