import 'package:flutter/widgets.dart';

import 'theme.dart';
import 'tokens.dart';

enum JvdmIconSize {
  sm('sm', 12.0),
  md('md', 16.0),
  lg('lg', 20.0),
  xl('xl', 24.0),
  xxl('2xl', 32.0);

  const JvdmIconSize(this.token, this.points);

  final String token;
  final double points;
}

const double jvdmIconViewBox = 24.0;

const double jvdmIconStrokeWidth = 1.6;

abstract class JvdmIcon extends StatelessWidget {
  const JvdmIcon({this.size = JvdmIconSize.md, this.color, super.key});

  final JvdmIconSize size;
  final Color? color;

  String get name;

  Path trace();

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size.square(size.points),
      painter: JvdmIconPainter(
        name: name,
        path: trace(),
        color:
            color ??
            DefaultTextStyle.of(context).style.color ??
            JvdmTokens.of(context).color(JvdmColorToken.ink),
      ),
    );
  }
}

class JvdmIconPainter extends CustomPainter {
  const JvdmIconPainter({
    required this.name,
    required this.path,
    required this.color,
  });

  final String name;
  final Path path;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final double scale = size.shortestSide / jvdmIconViewBox;

    final Paint paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = jvdmIconStrokeWidth * scale
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..color = color
      ..isAntiAlias = true;

    canvas.save();
    canvas.scale(scale);
    canvas.drawPath(path, paint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(JvdmIconPainter oldDelegate) =>
      oldDelegate.name != name || oldDelegate.color != color;
}
