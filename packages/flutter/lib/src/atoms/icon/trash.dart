import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmTrashIcon extends JvdmIcon {
  const JvdmTrashIcon({super.size, super.color, super.key});

  @override
  String get name => 'trash';

  @override
  Path trace() {
    return Path()
    ..moveTo(5.0, 7.0)
    ..lineTo(19.0, 7.0)
    ..moveTo(9.0, 7.0)
    ..lineTo(9.0, 5.0)
    ..cubicTo(9.0, 4.447715, 9.447715, 4.0, 10.0, 4.0)
    ..lineTo(14.0, 4.0)
    ..cubicTo(14.552285, 4.0, 15.0, 4.447715, 15.0, 5.0)
    ..lineTo(15.0, 7.0)
    ..moveTo(7.0, 7.0)
    ..lineTo(8.0, 20.0)
    ..cubicTo(8.0, 20.552285, 8.447715, 21.0, 9.0, 21.0)
    ..lineTo(15.0, 21.0)
    ..cubicTo(15.552285, 21.0, 16.0, 20.552285, 16.0, 20.0)
    ..lineTo(17.0, 7.0)
    ..moveTo(10.0, 11.0)
    ..lineTo(10.0, 17.0)
    ..moveTo(14.0, 11.0)
    ..lineTo(14.0, 17.0);
  }
}
