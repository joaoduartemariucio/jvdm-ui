import '../../tokens/tokens.dart';

enum JvdmNoticeTone {
  info('info', JvdmColorToken.info, JvdmColorToken.infoSoft),
  ok('ok', JvdmColorToken.ok, JvdmColorToken.okSoft),
  warn('warn', JvdmColorToken.warn, JvdmColorToken.warnSoft),
  danger('danger', JvdmColorToken.danger, JvdmColorToken.dangerSoft);

  const JvdmNoticeTone(this.token, this.foreground, this.background);

  final String token;
  final JvdmColorToken foreground;
  final JvdmColorToken background;
}

const double jvdmNoticeBorderOpacity = 0.4;
