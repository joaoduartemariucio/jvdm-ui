import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmBuildingIcon extends JvdmIcon {
  const JvdmBuildingIcon({super.size, super.color, super.key});

  @override
  String get name => 'building';

  @override
  Path trace() {
    return Path()
    ..moveTo(4.5, 20.5)
    ..lineTo(4.5, 5.0)
    ..cubicTo(4.5, 4.171573, 5.171573, 3.5, 6.0, 3.5)
    ..lineTo(13.0, 3.5)
    ..cubicTo(13.828427, 3.5, 14.5, 4.171573, 14.5, 5.0)
    ..lineTo(14.5, 20.5)
    ..moveTo(14.5, 10.0)
    ..lineTo(18.5, 10.0)
    ..cubicTo(19.328427, 10.0, 20.0, 10.671573, 20.0, 11.5)
    ..lineTo(20.0, 20.5)
    ..moveTo(3.0, 20.5)
    ..lineTo(21.0, 20.5)
    ..moveTo(7.5, 7.5)
    ..lineTo(11.5, 7.5)
    ..moveTo(7.5, 11.0)
    ..lineTo(11.5, 11.0)
    ..moveTo(7.5, 14.5)
    ..lineTo(11.5, 14.5)
    ..moveTo(7.5, 18.0)
    ..lineTo(11.5, 18.0);
  }
}
