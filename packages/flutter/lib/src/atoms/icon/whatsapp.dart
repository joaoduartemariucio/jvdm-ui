import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmWhatsappIcon extends JvdmIconData {
  const JvdmWhatsappIcon();

  @override
  String get name => 'whatsapp';

  @override
  Path trace() {
    return Path()
    ..moveTo(3.4, 20.6)
    ..lineTo(4.7, 16.0)
    ..cubicTo(2.684342, 12.45237, 3.583684, 7.962485, 6.810225, 5.464889)
    ..cubicTo(10.036767, 2.967292, 14.608751, 3.221942, 17.537975, 6.062401)
    ..cubicTo(20.467198, 8.90286, 20.86237, 13.464847, 18.465211, 16.766693)
    ..cubicTo(16.068051, 20.068538, 11.607957, 21.105572, 8.0, 19.2)
    ..close()
    ..moveTo(9.0, 9.2)
    ..cubicTo(9.0, 12.2, 11.3, 14.6, 14.2, 14.7)
    ..cubicTo(14.9, 14.7, 15.5, 14.2, 15.6, 13.5)
    ..lineTo(13.6, 12.5)
    ..lineTo(12.8, 13.4)
    ..cubicTo(11.835717, 12.893433, 11.063231, 12.085834, 10.6, 11.1)
    ..lineTo(11.5, 10.3)
    ..lineTo(10.5, 8.3)
    ..cubicTo(9.8, 8.4, 9.3, 9.0, 9.3, 9.7)
    ..close();
  }
}
