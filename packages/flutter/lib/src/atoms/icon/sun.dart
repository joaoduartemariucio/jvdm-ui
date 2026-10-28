import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmSunIcon extends JvdmIcon {
  const JvdmSunIcon({super.size, super.color, super.key});

  @override
  String get name => 'sun';

  @override
  Path trace() {
    return Path()
    ..addOval(Rect.fromCircle(center: const Offset(12.0, 12.0), radius: 4.0))
    ..moveTo(12.0, 2.5)
    ..lineTo(12.0, 4.5)
    ..moveTo(12.0, 19.5)
    ..lineTo(12.0, 21.5)
    ..moveTo(4.6, 4.6)
    ..lineTo(6.0, 6.0)
    ..moveTo(18.0, 18.0)
    ..lineTo(19.4, 19.4)
    ..moveTo(2.5, 12.0)
    ..lineTo(4.5, 12.0)
    ..moveTo(19.5, 12.0)
    ..lineTo(21.5, 12.0)
    ..moveTo(4.6, 19.4)
    ..lineTo(6.0, 18.0)
    ..moveTo(18.0, 6.0)
    ..lineTo(19.4, 4.6);
  }
}
