import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

const double jvdmSkeletonFrom = 1.0;

const double jvdmSkeletonTo = 0.5;

class JvdmSkeleton extends StatefulWidget {
  const JvdmSkeleton({super.key});

  @override
  State<JvdmSkeleton> createState() => _JvdmSkeletonState();
}

class _JvdmSkeletonState extends State<JvdmSkeleton>
    with SingleTickerProviderStateMixin {
  AnimationController? _controller;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    if (_controller != null) {
      return;
    }

    final JvdmTokens tokens = JvdmTokens.of(context);
    _controller = AnimationController(
      vsync: this,
      duration: tokens.duration(JvdmDurationStep.slow),
    );

    if (!MediaQuery.of(context).disableAnimations) {
      _controller!.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return ExcludeSemantics(
      child: FadeTransition(
        opacity:
            Tween<double>(begin: jvdmSkeletonFrom, end: jvdmSkeletonTo).animate(
          CurvedAnimation(
            parent: _controller!,
            curve: tokens.curve(JvdmEaseStep.inOut),
          ),
        ),
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: tokens.color(JvdmColorToken.raised),
            borderRadius: BorderRadius.circular(
              tokens.radius(JvdmRadiusStep.sm),
            ),
          ),
        ),
      ),
    );
  }
}
