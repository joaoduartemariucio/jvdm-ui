import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmBoxIcon extends JvdmIconData {
  const JvdmBoxIcon();

  @override
  String get name => 'box';

  @override
  Path trace() {
    return Path()
    ..moveTo(20.5, 8.2)
    ..lineTo(20.5, 15.8)
    ..cubicTo(20.505163, 16.376748, 20.199512, 16.911637, 19.7, 17.2)
    ..lineTo(12.8, 21.0)
    ..cubicTo(12.304958, 21.285812, 11.695042, 21.285812, 11.2, 21.0)
    ..lineTo(4.3, 17.2)
    ..cubicTo(3.800488, 16.911637, 3.494837, 16.376748, 3.5, 15.8)
    ..lineTo(3.5, 8.2)
    ..moveTo(3.9, 7.3)
    ..lineTo(11.2, 3.3)
    ..cubicTo(11.695042, 3.014188, 12.304958, 3.014188, 12.8, 3.3)
    ..lineTo(20.1, 7.3)
    ..cubicTo(20.394217, 7.482339, 20.573217, 7.803862, 20.573217, 8.15)
    ..cubicTo(20.573217, 8.496138, 20.394217, 8.817661, 20.1, 9.0)
    ..lineTo(12.8, 13.0)
    ..cubicTo(12.304958, 13.285812, 11.695042, 13.285812, 11.2, 13.0)
    ..lineTo(3.9, 9.0)
    ..cubicTo(3.605783, 8.817661, 3.426783, 8.496138, 3.426783, 8.15)
    ..cubicTo(3.426783, 7.803862, 3.605783, 7.482339, 3.9, 7.3)
    ..close()
    ..moveTo(12.0, 12.8)
    ..lineTo(12.0, 20.8);
  }
}
