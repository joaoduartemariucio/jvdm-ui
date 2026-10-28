import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmPhoneIcon extends JvdmIcon {
  const JvdmPhoneIcon({super.size, super.color, super.key});

  @override
  String get name => 'phone';

  @override
  Path trace() {
    return Path()
    ..moveTo(8.4, 3.5)
    ..lineTo(5.2, 3.5)
    ..cubicTo(4.659442, 3.496996, 4.143196, 3.724386, 3.780523, 4.125235)
    ..cubicTo(3.41785, 4.526084, 3.24309, 5.062438, 3.3, 5.6)
    ..cubicTo(3.7, 9.3, 5.1, 12.8, 7.4, 15.7)
    ..cubicTo(8.992867, 17.789672, 11.001847, 19.526248, 13.3, 20.8)
    ..cubicTo(13.737362, 21.053026, 14.257495, 21.12142, 14.745401, 20.99006)
    ..cubicTo(15.233307, 20.858701, 15.648794, 20.538409, 15.9, 20.1)
    ..lineTo(17.3, 17.8)
    ..cubicTo(17.779782, 16.937329, 17.519051, 15.850951, 16.7, 15.3)
    ..lineTo(14.5, 13.9)
    ..lineTo(12.2, 16.2)
    ..cubicTo(10.654254, 15.171468, 9.328532, 13.845746, 8.3, 12.3)
    ..lineTo(10.6, 10)
    ..lineTo(9.2, 7.8)
    ..cubicTo(8.856593, 7.24516, 8.252493, 6.905354, 7.6, 6.9)
    ..close();
  }
}
