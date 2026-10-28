import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmEyeOffIcon extends JvdmIconData {
  const JvdmEyeOffIcon();

  @override
  String get name => 'eye-off';

  @override
  Path trace() {
    return Path()
    ..moveTo(9.9, 5.8)
    ..cubicTo(10.586267, 5.620231, 11.290849, 5.519577, 12.0, 5.5)
    ..cubicTo(18.0, 5.5, 21.5, 12.0, 21.5, 12.0)
    ..cubicTo(20.619508, 13.529689, 19.506168, 14.912928, 18.2, 16.1)
    ..moveTo(6.4, 7.6)
    ..cubicTo(4.854311, 8.829019, 3.534577, 10.31795, 2.5, 12.0)
    ..cubicTo(2.5, 12.0, 6.0, 18.5, 12.0, 18.5)
    ..cubicTo(13.267686, 18.515889, 14.52573, 18.27788, 15.7, 17.8)
    ..moveTo(10.0, 10.0)
    ..cubicTo(8.895431, 11.104569, 8.895431, 12.895431, 10.0, 14.0)
    ..cubicTo(11.104569, 15.104569, 12.895431, 15.104569, 14.0, 14.0)
    ..moveTo(4.0, 4.0)
    ..lineTo(20.0, 20.0);
  }
}
