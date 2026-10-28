import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmInstagramIcon extends JvdmIconData {
  const JvdmInstagramIcon();

  @override
  String get name => 'instagram';

  @override
  Path trace() {
    return Path()
    ..addRRect(RRect.fromLTRBR(3.5, 3.5, 20.5, 20.5, const Radius.circular(4.5)))
    ..addOval(Rect.fromCircle(center: const Offset(12.0, 12.0), radius: 3.8))
    ..moveTo(17.0, 7.0)
    ..lineTo(17.01, 7.0);
  }
}
