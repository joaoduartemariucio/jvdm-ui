import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmChevronIcon extends JvdmIcon {
  const JvdmChevronIcon({super.size, super.color, super.key});

  @override
  String get name => 'chevron';

  @override
  Path trace() {
    return Path()
    ..moveTo(6.0, 9.0)
    ..lineTo(12.0, 15.0)
    ..lineTo(18.0, 9.0);
  }
}
