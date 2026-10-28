import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmFactoryIcon extends JvdmIcon {
  const JvdmFactoryIcon({super.size, super.color, super.key});

  @override
  String get name => 'factory';

  @override
  Path trace() {
    return Path()
    ..moveTo(2.5, 20.5)
    ..lineTo(2.5, 11.0)
    ..lineTo(8.5, 14.5)
    ..lineTo(8.5, 11.0)
    ..lineTo(14.5, 14.5)
    ..lineTo(14.5, 6.5)
    ..cubicTo(14.5, 5.947715, 14.947715, 5.5, 15.5, 5.5)
    ..lineTo(18.5, 5.5)
    ..cubicTo(19.052285, 5.5, 19.5, 5.947715, 19.5, 6.5)
    ..lineTo(19.5, 20.5)
    ..close()
    ..moveTo(2.0, 20.5)
    ..lineTo(22.0, 20.5);
  }
}
