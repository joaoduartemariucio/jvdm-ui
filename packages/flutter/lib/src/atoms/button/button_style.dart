import '../../tokens/tokens.dart';

enum JvdmButtonVariant {
  primary(
    'primary',
    JvdmColorToken.accent,
    JvdmColorToken.onAccent,
    null,
    JvdmWeightStep.medium,
  ),
  secondary(
    'secondary',
    null,
    JvdmColorToken.ink,
    JvdmColorToken.lineStrong,
    JvdmWeightStep.normal,
  ),
  ghost('ghost', null, JvdmColorToken.inkMuted, null, JvdmWeightStep.normal),
  danger(
    'danger',
    null,
    JvdmColorToken.danger,
    JvdmColorToken.danger,
    JvdmWeightStep.normal,
  );

  const JvdmButtonVariant(
    this.token,
    this.background,
    this.foreground,
    this.border,
    this.weight,
  );

  final String token;
  final JvdmColorToken? background;
  final JvdmColorToken foreground;
  final JvdmColorToken? border;
  final JvdmWeightStep weight;
}

enum JvdmButtonSize {
  sm('sm', 3, 2, null, JvdmTextStep.xs),
  md('md', 4, 3, null, JvdmTextStep.sm),
  lg('lg', 4, 4, null, JvdmTextStep.base),
  icon('icon', 0, 0, 40.0, JvdmTextStep.sm),
  iconSm('icon-sm', 0, 0, 32.0, JvdmTextStep.sm);

  const JvdmButtonSize(
    this.token,
    this.horizontal,
    this.vertical,
    this.square,
    this.text,
  );

  final String token;
  final int horizontal;
  final int vertical;
  final double? square;
  final JvdmTextStep text;
}
