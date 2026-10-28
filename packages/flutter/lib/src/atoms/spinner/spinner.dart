import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../tokens/icon.dart';
import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import 'locales.dart';

export 'locales.dart';

const double jvdmSpinnerStroke = 2.4;

const Duration jvdmSpinnerPeriod = Duration(seconds: 1);

class JvdmSpinner extends StatefulWidget {
  const JvdmSpinner({
    this.size = JvdmIconSize.md,
    this.label = JvdmSpinnerLocales.label,
    super.key,
  });

  final JvdmIconSize size;
  final String label;

  @override
  State<JvdmSpinner> createState() => _JvdmSpinnerState();
}

class _JvdmSpinnerState extends State<JvdmSpinner>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: jvdmSpinnerPeriod,
  );

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!MediaQuery.of(context).disableAnimations && !_controller.isAnimating) {
      _controller.repeat();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      label: widget.label,
      liveRegion: true,
      child: RotationTransition(
        turns: _controller,
        child: CustomPaint(
          size: Size.square(widget.size.points),
          painter: _JvdmSpinnerPainter(color: tokens.color(JvdmColorToken.ink)),
        ),
      ),
    );
  }
}

class _JvdmSpinnerPainter extends CustomPainter {
  const _JvdmSpinnerPainter({required this.color});

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final double scale = size.shortestSide / jvdmIconViewBox;
    final Rect ring = Rect.fromCircle(
      center: Offset(size.width / 2, size.height / 2),
      radius: 9 * scale,
    );

    final Paint base = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = jvdmSpinnerStroke * scale
      ..color = color.withValues(alpha: 0.2)
      ..isAntiAlias = true;

    final Paint arc = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = jvdmSpinnerStroke * scale
      ..strokeCap = StrokeCap.round
      ..color = color
      ..isAntiAlias = true;

    canvas.drawCircle(ring.center, ring.width / 2, base);
    canvas.drawArc(ring, -math.pi / 2, math.pi / 2, false, arc);
  }

  @override
  bool shouldRepaint(_JvdmSpinnerPainter oldDelegate) =>
      oldDelegate.color != color;
}
