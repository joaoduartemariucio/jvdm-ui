import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmPlansIcon extends JvdmIcon {
  const JvdmPlansIcon({super.size, super.color, super.key});

  @override
  String get name => 'plans';

  @override
  Path trace() {
    return Path()
    ..addRRect(RRect.fromLTRBR(2.5, 5.0, 21.5, 19.0, const Radius.circular(2.5)))
    ..moveTo(2.5, 10.0)
    ..lineTo(21.5, 10.0);
  }
}
