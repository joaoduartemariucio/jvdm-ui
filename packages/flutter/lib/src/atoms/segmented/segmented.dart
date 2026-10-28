import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmSegmentedOption {
  const JvdmSegmentedOption({
    required this.value,
    required this.label,
    this.disabled = false,
  });

  final String value;
  final String label;
  final bool disabled;
}

class JvdmSegmented extends StatelessWidget {
  const JvdmSegmented({
    required this.options,
    required this.value,
    required this.onValueChange,
    this.label,
    super.key,
  });

  final List<JvdmSegmentedOption> options;
  final String value;
  final ValueChanged<String> onValueChange;
  final String? label;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      label: label,
      container: true,
      child: Container(
        padding: EdgeInsets.all(tokens.spacing(0.5)),
        decoration: BoxDecoration(
          color: tokens.color(JvdmColorToken.raised),
          borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.md)),
        ),
        child: Row(
          children: <Widget>[
            for (final JvdmSegmentedOption option in options)
              Expanded(
                child: Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: tokens.spacing(0.25),
                  ),
                  child: _segment(tokens, option),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _segment(JvdmTokens tokens, JvdmSegmentedOption option) {
    final bool selected = option.value == value;

    return Semantics(
      selected: selected,
      button: true,
      enabled: !option.disabled,
      child: GestureDetector(
        onTap: option.disabled ? null : () => onValueChange(option.value),
        child: Container(
          constraints: BoxConstraints(minHeight: tokens.spacing(9)),
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: selected ? tokens.color(JvdmColorToken.surface) : null,
            borderRadius:
                BorderRadius.circular(tokens.radius(JvdmRadiusStep.sm)),
          ),
          child: Text(
            option.label,
            style: tokens.textStyle(
              JvdmTextStep.sm,
              weight: selected ? JvdmWeightStep.medium : JvdmWeightStep.normal,
              color: selected ? JvdmColorToken.ink : JvdmColorToken.inkMuted,
            ),
          ),
        ),
      ),
    );
  }
}
