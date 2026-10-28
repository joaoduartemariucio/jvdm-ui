import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmFunnelIcon extends JvdmIcon {
  const JvdmFunnelIcon({super.size, super.color, super.key});

  @override
  String get name => 'funnel';

  @override
  Path trace() {
    return Path()
    ..moveTo(3.0, 5.0)
    ..lineTo(21.0, 5.0)
    ..lineTo(14.0, 13.0)
    ..lineTo(14.0, 19.0)
    ..lineTo(10.0, 21.0)
    ..lineTo(10.0, 13.0)
    ..close();
  }
}
