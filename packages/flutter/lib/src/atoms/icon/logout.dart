import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmLogoutIcon extends JvdmIconData {
  const JvdmLogoutIcon();

  @override
  String get name => 'logout';

  @override
  Path trace() {
    return Path()
    ..moveTo(9.0, 4.5)
    ..lineTo(6.0, 4.5)
    ..cubicTo(5.171573, 4.5, 4.5, 5.171573, 4.5, 6.0)
    ..lineTo(4.5, 18.0)
    ..cubicTo(4.5, 18.828427, 5.171573, 19.5, 6.0, 19.5)
    ..lineTo(9.0, 19.5)
    ..moveTo(15.5, 15.5)
    ..lineTo(19.5, 12.0)
    ..lineTo(15.5, 8.5)
    ..moveTo(19.0, 12.0)
    ..lineTo(9.5, 12.0);
  }
}
