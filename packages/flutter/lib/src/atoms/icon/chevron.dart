import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';

class JvdmChevronIcon extends JvdmIconData {
  const JvdmChevronIcon();

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
