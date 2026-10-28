import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmStaffIcon extends JvdmIconData {
  const JvdmStaffIcon();

  @override
  String get name => 'staff';

  @override
  Path trace() {
    return Path()
    ..addRRect(RRect.fromLTRBR(2.5, 4.5, 21.5, 19.5, const Radius.circular(2.5)))
    ..addOval(Rect.fromCircle(center: const Offset(8.5, 10.5), radius: 2.2))
    ..moveTo(5.0, 16.4)
    ..cubicTo(5.0, 14.7, 6.6, 13.8, 8.5, 13.8)
    ..cubicTo(10.4, 13.8, 12.0, 14.7, 12.0, 16.4)
    ..moveTo(15.0, 10.0)
    ..lineTo(19.0, 10.0)
    ..moveTo(15.0, 14.0)
    ..lineTo(19.0, 14.0);
  }
}
