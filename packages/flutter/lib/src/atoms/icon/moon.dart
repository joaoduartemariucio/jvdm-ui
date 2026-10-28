import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmMoonIcon extends JvdmIcon {
  const JvdmMoonIcon({super.size, super.color, super.key});

  @override
  String get name => 'moon';

  @override
  Path trace() {
    return Path()
    ..moveTo(20.0, 14.2)
    ..cubicTo(17.114287, 15.059762, 13.989493, 14.268799, 11.860347, 12.139653)
    ..cubicTo(9.731201, 10.010507, 8.940238, 6.885713, 9.8, 4.0)
    ..cubicTo(6.041077, 5.119923, 3.601556, 8.744914, 3.979544, 12.648868)
    ..cubicTo(4.357533, 16.552821, 7.447179, 19.642467, 11.351132, 20.020456)
    ..cubicTo(15.255086, 20.398444, 18.880077, 17.958923, 20.0, 14.2)
    ..close();
  }
}
