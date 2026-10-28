import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmStudentsIcon extends JvdmIcon {
  const JvdmStudentsIcon({super.size, super.color, super.key});

  @override
  String get name => 'students';

  @override
  Path trace() {
    return Path()
    ..addOval(Rect.fromCircle(center: const Offset(9.0, 8.0), radius: 3.2))
    ..moveTo(3.5, 19.0)
    ..cubicTo(3.5, 16.0, 6.0, 14.4, 9.0, 14.4)
    ..cubicTo(12.0, 14.4, 14.5, 16.0, 14.5, 19.0)
    ..moveTo(16.5, 6.6)
    ..cubicTo(17.658526, 7.045632, 18.422967, 8.158722, 18.422967, 9.4)
    ..cubicTo(18.422967, 10.641278, 17.658526, 11.754368, 16.5, 12.2)
    ..moveTo(18.0, 14.6)
    ..cubicTo(20.0, 15.2, 21.2, 16.6, 21.2, 19.0);
  }
}
