import 'package:flutter/widgets.dart';

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

abstract class JvdmIconData {
  const JvdmIconData();

  String get name;

  Path trace();
}

class JvdmIconPainter extends CustomPainter {
  const JvdmIconPainter({required this.icon, required this.color});

  final JvdmIconData icon;
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
    canvas.drawPath(icon.trace(), paint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(JvdmIconPainter oldDelegate) =>
      oldDelegate.icon.name != icon.name || oldDelegate.color != color;
}

class JvdmIcon extends StatelessWidget {
  const JvdmIcon(this.icon, {this.size = JvdmIconSize.md, this.color, super.key});

  final JvdmIconData icon;
  final JvdmIconSize size;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size.square(size.points),
      painter: JvdmIconPainter(
        icon: icon,
        color: color ?? DefaultTextStyle.of(context).style.color ?? const Color(0xFF000000),
      ),
    );
  }
}
