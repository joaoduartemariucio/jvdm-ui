import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmCloseIcon extends JvdmIcon {
  const JvdmCloseIcon({super.size, super.color, super.key});

  @override
  String get name => 'close';

  @override
  Path trace() {
    return Path()
    ..moveTo(6.0, 6.0)
    ..lineTo(18.0, 18.0)
    ..moveTo(18.0, 6.0)
    ..lineTo(6.0, 18.0);
  }
}
