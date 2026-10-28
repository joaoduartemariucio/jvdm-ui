import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmPencilIcon extends JvdmIcon {
  const JvdmPencilIcon({super.size, super.color, super.key});

  @override
  String get name => 'pencil';

  @override
  Path trace() {
    return Path()
    ..moveTo(4.0, 20.0)
    ..lineTo(8.0, 20.0)
    ..lineTo(18.0, 10.0)
    ..cubicTo(19.104569, 8.895431, 19.104569, 7.104569, 18.0, 6.0)
    ..cubicTo(16.895431, 4.895431, 15.104569, 4.895431, 14.0, 6.0)
    ..lineTo(4.0, 16.0)
    ..lineTo(4.0, 20.0)
    ..close()
    ..moveTo(13.5, 6.5)
    ..lineTo(17.5, 10.5);
  }
}
