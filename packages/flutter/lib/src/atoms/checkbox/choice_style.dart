import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

const double jvdmChoiceBox = 5;

const double jvdmChoiceDot = 2.5;

BoxDecoration jvdmChoiceDecoration(
  JvdmTokens tokens, {
  required bool selected,
  required BorderRadius borderRadius,
}) {
  return BoxDecoration(
    color: tokens.color(
      selected ? JvdmColorToken.accent : JvdmColorToken.field,
    ),
    border: Border.all(
      color: tokens.color(
        selected ? JvdmColorToken.accent : JvdmColorToken.lineStrong,
      ),
    ),
    borderRadius: borderRadius,
  );
}

TextStyle jvdmChoiceLabel(JvdmTokens tokens) {
  return tokens.textStyle(JvdmTextStep.sm, color: JvdmColorToken.inkSoft);
}
