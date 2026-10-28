import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmAccessIcon extends JvdmIcon {
  const JvdmAccessIcon({super.size, super.color, super.key});

  @override
  String get name => 'access';

  @override
  Path trace() {
    return Path()
    ..moveTo(4.0, 8.0)
    ..lineTo(4.0, 5.5)
    ..cubicTo(4.0, 4.671573, 4.671573, 4.0, 5.5, 4.0)
    ..lineTo(8.0, 4.0)
    ..moveTo(16.0, 4.0)
    ..lineTo(18.5, 4.0)
    ..cubicTo(19.328427, 4.0, 20.0, 4.671573, 20.0, 5.5)
    ..lineTo(20.0, 8.0)
    ..moveTo(20.0, 16.0)
    ..lineTo(20.0, 18.5)
    ..cubicTo(20.0, 19.328427, 19.328427, 20.0, 18.5, 20.0)
    ..lineTo(16.0, 20.0)
    ..moveTo(8.0, 20.0)
    ..lineTo(5.5, 20.0)
    ..cubicTo(4.671573, 20.0, 4.0, 19.328427, 4.0, 18.5)
    ..lineTo(4.0, 16.0)
    ..moveTo(4.0, 12.0)
    ..lineTo(20.0, 12.0);
  }
}
