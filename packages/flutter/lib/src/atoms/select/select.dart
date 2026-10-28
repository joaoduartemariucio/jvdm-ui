import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import '../../tokens/icon.dart';
import '../icon/chevron.dart';
import '../input/input.dart';

class JvdmSelectOption {
  const JvdmSelectOption({required this.value, required this.label});

  final String value;
  final String label;
}

class JvdmSelect extends StatelessWidget {
  const JvdmSelect({
    required this.options,
    this.value,
    this.placeholder,
    this.size = JvdmControlSize.md,
    this.invalid = false,
    this.onTap,
    super.key,
  });

  final List<JvdmSelectOption> options;
  final String? value;
  final String? placeholder;
  final JvdmControlSize size;
  final bool invalid;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final JvdmSelectOption? selected = options
        .where((JvdmSelectOption option) => option.value == value)
        .firstOrNull;

    return Semantics(
      value: selected?.label ?? placeholder ?? '',
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          decoration: jvdmControlDecoration(tokens, invalid: invalid),
          padding: jvdmControlPadding(tokens, size),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text(
                selected?.label ?? placeholder ?? '',
                style: tokens.textStyle(
                  JvdmTextStep.sm,
                  color: selected == null
                      ? JvdmColorToken.inkDim
                      : JvdmColorToken.ink,
                ),
              ),
              JvdmChevronIcon(
                size: JvdmIconSize.sm,
                color: tokens.color(JvdmColorToken.inkMuted),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
