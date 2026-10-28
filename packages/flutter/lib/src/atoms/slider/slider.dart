import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

const double jvdmSliderTrack = 4;

const double jvdmSliderThumb = 16;

double jvdmSliderRatio(double value, double min, double max) {
  if (max <= min) {
    return 0;
  }
  return ((value - min) / (max - min)).clamp(0.0, 1.0);
}

class JvdmSlider extends StatelessWidget {
  const JvdmSlider({
    this.value = 0,
    this.min = 0,
    this.max = 100,
    this.disabled = false,
    super.key,
  });

  final double value;
  final double min;
  final double max;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final double ratio = jvdmSliderRatio(value, min, max);

    return Semantics(
      slider: true,
      value: value.toString(),
      enabled: !disabled,
      child: Opacity(
        opacity: disabled ? 0.5 : 1,
        child: SizedBox(
          height: tokens.spacing(6),
          child: LayoutBuilder(
            builder: (BuildContext context, BoxConstraints constraints) {
              return Stack(
                alignment: Alignment.centerLeft,
                children: <Widget>[
                  Container(
                    height: jvdmSliderTrack,
                    decoration: BoxDecoration(
                      color: tokens.color(JvdmColorToken.raised),
                      borderRadius: BorderRadius.circular(
                        jvdmSliderTrack / 2,
                      ),
                    ),
                  ),
                  Container(
                    width: constraints.maxWidth * ratio,
                    height: jvdmSliderTrack,
                    decoration: BoxDecoration(
                      color: tokens.color(JvdmColorToken.accent),
                      borderRadius: BorderRadius.circular(
                        jvdmSliderTrack / 2,
                      ),
                    ),
                  ),
                  Positioned(
                    left: (constraints.maxWidth * ratio) - jvdmSliderThumb / 2,
                    child: Container(
                      width: jvdmSliderThumb,
                      height: jvdmSliderThumb,
                      decoration: BoxDecoration(
                        color: tokens.color(JvdmColorToken.accent),
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
