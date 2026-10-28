import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmCheckIcon extends JvdmIcon {
  const JvdmCheckIcon({super.size, super.color, super.key});

  @override
  String get name => 'check';

  @override
  Path trace() {
    return Path()
    ..moveTo(5.0, 12.5)
    ..lineTo(9.5, 17.0)
    ..lineTo(19.0, 7.5);
  }
}
