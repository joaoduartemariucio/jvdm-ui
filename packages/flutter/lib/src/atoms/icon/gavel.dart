import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmGavelIcon extends JvdmIconData {
  const JvdmGavelIcon();

  @override
  String get name => 'gavel';

  @override
  Path trace() {
    return Path()
    ..moveTo(13.4, 6.6)
    ..lineTo(17.4, 10.6)
    ..moveTo(15.9, 2.9)
    ..cubicTo(16.677687, 2.137714, 17.922313, 2.137714, 18.7, 2.9)
    ..lineTo(21.1, 5.3)
    ..cubicTo(21.862286, 6.077687, 21.862286, 7.322313, 21.1, 8.1)
    ..lineTo(19.1, 10.1)
    ..cubicTo(18.322313, 10.862286, 17.077687, 10.862286, 16.3, 10.1)
    ..lineTo(13.9, 7.7)
    ..cubicTo(13.137714, 6.922313, 13.137714, 5.677687, 13.9, 4.9)
    ..close()
    ..moveTo(14.2, 9.8)
    ..lineTo(6.6, 17.4)
    ..cubicTo(5.837714, 18.177687, 5.837714, 19.422313, 6.6, 20.2)
    ..cubicTo(7.377687, 20.962286, 8.622313, 20.962286, 9.4, 20.2)
    ..lineTo(17.0, 12.6)
    ..moveTo(3.5, 21.5)
    ..lineTo(10.5, 21.5);
  }
}
