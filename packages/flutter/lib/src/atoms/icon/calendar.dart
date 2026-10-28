import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmCalendarIcon extends JvdmIconData {
  const JvdmCalendarIcon();

  @override
  String get name => 'calendar';

  @override
  Path trace() {
    return Path()
    ..addRRect(RRect.fromLTRBR(3.5, 5.0, 20.5, 21.0, const Radius.circular(2.5)))
    ..moveTo(3.5, 10.0)
    ..lineTo(20.5, 10.0)
    ..moveTo(8.0, 3.5)
    ..lineTo(8.0, 6.5)
    ..moveTo(16.0, 3.5)
    ..lineTo(16.0, 6.5);
  }
}
