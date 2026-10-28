import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmAlertIcon extends JvdmIconData {
  const JvdmAlertIcon();

  @override
  String get name => 'alert';

  @override
  Path trace() {
    return Path()
    ..moveTo(12.0, 8.5)
    ..lineTo(12.0, 13.5)
    ..moveTo(12.0, 16.7)
    ..lineTo(12.01, 16.7)
    ..moveTo(10.3, 3.9)
    ..lineTo(2.6, 17.4)
    ..cubicTo(2.228236, 17.999002, 2.218699, 18.754604, 2.575226, 19.362798)
    ..cubicTo(2.931754, 19.970992, 3.595726, 20.331779, 4.3, 20.3)
    ..lineTo(19.7, 20.3)
    ..cubicTo(20.404274, 20.331779, 21.068246, 19.970992, 21.424774, 19.362798)
    ..cubicTo(21.781301, 18.754604, 21.771764, 17.999002, 21.4, 17.4)
    ..lineTo(13.7, 3.9)
    ..cubicTo(13.378389, 3.255663, 12.720141, 2.848528, 12.0, 2.848528)
    ..cubicTo(11.279859, 2.848528, 10.621611, 3.255663, 10.3, 3.9)
    ..close();
  }
}
