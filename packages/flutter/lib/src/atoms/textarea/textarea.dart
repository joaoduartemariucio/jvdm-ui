import 'package:flutter/material.dart';

import '../input/input.dart';

class JvdmTextarea extends StatelessWidget {
  const JvdmTextarea({
    this.controller,
    this.placeholder,
    this.rows = 4,
    this.size = JvdmControlSize.md,
    this.invalid = false,
    this.onChanged,
    super.key,
  });

  final TextEditingController? controller;
  final String? placeholder;
  final int rows;
  final JvdmControlSize size;
  final bool invalid;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    return JvdmInput(
      controller: controller,
      placeholder: placeholder,
      size: size,
      invalid: invalid,
      onChanged: onChanged,
      maxLines: rows,
    );
  }
}
