import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmDashboardIcon extends JvdmIconData {
  const JvdmDashboardIcon();

  @override
  String get name => 'dashboard';

  @override
  Path trace() {
    return Path()
    ..addRRect(RRect.fromLTRBR(3.0, 3.0, 10.0, 10.0, const Radius.circular(1.5)))
    ..addRRect(RRect.fromLTRBR(14.0, 3.0, 21.0, 10.0, const Radius.circular(1.5)))
    ..addRRect(RRect.fromLTRBR(3.0, 14.0, 10.0, 21.0, const Radius.circular(1.5)))
    ..addRRect(RRect.fromLTRBR(14.0, 14.0, 21.0, 21.0, const Radius.circular(1.5)));
  }
}
