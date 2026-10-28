import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmCarIcon extends JvdmIconData {
  const JvdmCarIcon();

  @override
  String get name => 'car';

  @override
  Path trace() {
    return Path()
    ..moveTo(3.0, 13.5)
    ..lineTo(5.0, 8.0)
    ..cubicTo(5.261153, 7.169563, 6.029474, 6.603431, 6.9, 6.6)
    ..lineTo(17.1, 6.6)
    ..cubicTo(17.970526, 6.603431, 18.738847, 7.169563, 19.0, 8.0)
    ..lineTo(21.0, 13.5)
    ..moveTo(2.5, 13.5)
    ..lineTo(21.5, 13.5)
    ..lineTo(21.5, 17.5)
    ..cubicTo(21.5, 18.052285, 21.052285, 18.5, 20.5, 18.5)
    ..lineTo(3.5, 18.5)
    ..cubicTo(2.947715, 18.5, 2.5, 18.052285, 2.5, 17.5)
    ..close()
    ..moveTo(6.0, 18.5)
    ..lineTo(6.0, 20.5)
    ..moveTo(18.0, 18.5)
    ..lineTo(18.0, 20.5)
    ..moveTo(6.0, 16.0)
    ..lineTo(7.5, 16.0)
    ..moveTo(16.5, 16.0)
    ..lineTo(18.0, 16.0);
  }
}
