import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmBackIcon extends JvdmIconData {
  const JvdmBackIcon();

  @override
  String get name => 'back';

  @override
  Path trace() {
    return Path()
    ..moveTo(14.0, 6.0)
    ..lineTo(8.0, 12.0)
    ..lineTo(14.0, 18.0);
  }
}
