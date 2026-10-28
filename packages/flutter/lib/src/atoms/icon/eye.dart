import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmEyeIcon extends JvdmIconData {
  const JvdmEyeIcon();

  @override
  String get name => 'eye';

  @override
  Path trace() {
    return Path()
    ..moveTo(2.5, 12.0)
    ..cubicTo(2.5, 12.0, 6.0, 5.5, 12.0, 5.5)
    ..cubicTo(18.0, 5.5, 21.5, 12.0, 21.5, 12.0)
    ..cubicTo(21.5, 12.0, 18.0, 18.5, 12.0, 18.5)
    ..cubicTo(6.0, 18.5, 2.5, 12.0, 2.5, 12.0)
    ..close()
    ..addOval(Rect.fromCircle(center: const Offset(12.0, 12.0), radius: 3.0));
  }
}
