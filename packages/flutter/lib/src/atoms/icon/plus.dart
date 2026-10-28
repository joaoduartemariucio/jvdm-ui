import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmPlusIcon extends JvdmIconData {
  const JvdmPlusIcon();

  @override
  String get name => 'plus';

  @override
  Path trace() {
    return Path()
    ..moveTo(12.0, 5.0)
    ..lineTo(12.0, 19.0)
    ..moveTo(5.0, 12.0)
    ..lineTo(19.0, 12.0);
  }
}
