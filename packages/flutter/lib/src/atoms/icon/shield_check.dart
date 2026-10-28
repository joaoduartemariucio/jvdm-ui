import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmShieldCheckIcon extends JvdmIcon {
  const JvdmShieldCheckIcon({super.size, super.color, super.key});

  @override
  String get name => 'shield-check';

  @override
  Path trace() {
    return Path()
    ..moveTo(12.0, 2.8)
    ..lineTo(4.5, 5.9)
    ..lineTo(4.5, 11.5)
    ..cubicTo(4.5, 15.9, 7.6, 20.0, 12.0, 21.2)
    ..cubicTo(16.4, 20.0, 19.5, 15.9, 19.5, 11.5)
    ..lineTo(19.5, 5.9)
    ..close()
    ..moveTo(9.0, 11.8)
    ..lineTo(11.2, 14.0)
    ..lineTo(15.2, 10.0);
  }
}
