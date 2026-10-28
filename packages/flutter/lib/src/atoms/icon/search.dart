import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmSearchIcon extends JvdmIcon {
  const JvdmSearchIcon({super.size, super.color, super.key});

  @override
  String get name => 'search';

  @override
  Path trace() {
    return Path()
    ..addOval(Rect.fromCircle(center: const Offset(11.0, 11.0), radius: 6.5))
    ..moveTo(16.0, 16.0)
    ..lineTo(20.5, 20.5);
  }
}
