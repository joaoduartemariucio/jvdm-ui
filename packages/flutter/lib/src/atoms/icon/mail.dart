import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmMailIcon extends JvdmIconData {
  const JvdmMailIcon();

  @override
  String get name => 'mail';

  @override
  Path trace() {
    return Path()
    ..addRRect(RRect.fromLTRBR(2.5, 4.5, 21.5, 19.5, const Radius.circular(2.5)))
    ..moveTo(3.5, 7.0)
    ..lineTo(10.9, 12.2)
    ..cubicTo(11.567465, 12.639561, 12.432535, 12.639561, 13.1, 12.2)
    ..lineTo(20.5, 7.0);
  }
}
