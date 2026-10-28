import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

enum JvdmControlSize {
  sm('sm', 3, 2),
  md('md', 4, 3);

  const JvdmControlSize(this.token, this.horizontal, this.vertical);

  final String token;
  final int horizontal;
  final int vertical;
}

BoxDecoration jvdmControlDecoration(JvdmTokens tokens,
    {required bool invalid}) {
  return BoxDecoration(
    color: tokens.color(JvdmColorToken.field),
    border: Border.all(
      color: tokens.color(
        invalid ? JvdmColorToken.danger : JvdmColorToken.lineStrong,
      ),
    ),
    borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.md)),
  );
}

EdgeInsets jvdmControlPadding(JvdmTokens tokens, JvdmControlSize size) {
  return EdgeInsets.symmetric(
    horizontal: tokens.spacing(size.horizontal.toDouble()),
    vertical: tokens.spacing(size.vertical.toDouble()),
  );
}
