import 'package:flutter/material.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import 'control_style.dart';

export 'control_style.dart';

class JvdmInput extends StatelessWidget {
  const JvdmInput({
    this.controller,
    this.placeholder,
    this.size = JvdmControlSize.md,
    this.invalid = false,
    this.onChanged,
    this.maxLines = 1,
    super.key,
  });

  final TextEditingController? controller;
  final String? placeholder;
  final JvdmControlSize size;
  final bool invalid;
  final ValueChanged<String>? onChanged;
  final int? maxLines;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Container(
      decoration: jvdmControlDecoration(tokens, invalid: invalid),
      padding: jvdmControlPadding(tokens, size),
      child: TextField(
        controller: controller,
        maxLines: maxLines,
        onChanged: onChanged,
        style: tokens.textStyle(JvdmTextStep.sm, color: JvdmColorToken.ink),
        decoration: InputDecoration.collapsed(
          hintText: placeholder,
          hintStyle: tokens.textStyle(
            JvdmTextStep.sm,
            color: JvdmColorToken.inkDim,
          ),
        ),
      ),
    );
  }
}
