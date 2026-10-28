import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmFaceIcon extends JvdmIcon {
  const JvdmFaceIcon({super.size, super.color, super.key});

  @override
  String get name => 'face';

  @override
  Path trace() {
    return Path()
    ..addOval(Rect.fromCircle(center: const Offset(12.0, 9.5), radius: 3.6))
    ..moveTo(4.5, 20.0)
    ..cubicTo(4.5, 16.4, 7.9, 14.4, 12.0, 14.4)
    ..cubicTo(16.1, 14.4, 19.5, 16.4, 19.5, 20.0);
  }
}
