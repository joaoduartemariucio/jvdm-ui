import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

const double jvdmThumbRatio = 4 / 3;

class JvdmThumb extends StatelessWidget {
  const JvdmThumb({required this.alt, this.src, this.fallback, super.key});

  final String alt;
  final String? src;
  final Widget? fallback;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      image: true,
      label: alt,
      child: AspectRatio(
        aspectRatio: jvdmThumbRatio,
        child: Container(
          clipBehavior: Clip.antiAlias,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: tokens.color(JvdmColorToken.raised),
            borderRadius: BorderRadius.circular(
              tokens.radius(JvdmRadiusStep.md),
            ),
          ),
          child: src == null
              ? DefaultTextStyle.merge(
                  style: tokens.textStyle(
                    JvdmTextStep.sm,
                    color: JvdmColorToken.inkDim,
                  ),
                  child: fallback ?? const SizedBox.shrink(),
                )
              : Image.network(src!, fit: BoxFit.cover),
        ),
      ),
    );
  }
}
