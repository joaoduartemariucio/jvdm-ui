import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmCopyIcon extends JvdmIcon {
  const JvdmCopyIcon({super.size, super.color, super.key});

  @override
  String get name => 'copy';

  @override
  Path trace() {
    return Path()
    ..addRRect(RRect.fromLTRBR(9.0, 9.0, 20.0, 20.0, const Radius.circular(2.0)))
    ..moveTo(5.0, 15.0)
    ..lineTo(5.0, 6.0)
    ..cubicTo(5.0, 4.895431, 5.895431, 4.0, 7.0, 4.0)
    ..lineTo(15.0, 4.0);
  }
}
