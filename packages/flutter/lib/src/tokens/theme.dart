import 'package:flutter/material.dart';

import 'tokens.dart';

@immutable
class JvdmTokens extends ThemeExtension<JvdmTokens> {
  const JvdmTokens({required this.brightness});

  factory JvdmTokens.of(BuildContext context) {
    final JvdmTokens? found = Theme.of(context).extension<JvdmTokens>();
    return found ?? JvdmTokens(brightness: Theme.of(context).brightness);
  }

  final Brightness brightness;

  bool get isDark => brightness == Brightness.dark;

  JvdmColorValue value(JvdmColorToken token) {
    final JvdmColorPair pair = jvdmColors[token]!;
    return isDark ? pair.dark : pair.light;
  }

  Color color(JvdmColorToken token) => Color(value(token).argb);

  double radius(JvdmRadiusStep step) => jvdmRadius[step]!;

  double spacing(double steps) => jvdmSpacing * steps;

  double fontSize(JvdmTextStep step) => jvdmText[step]!.size;

  double lineHeight(JvdmTextStep step) => jvdmText[step]!.lineHeight;

  double letterSpacing(JvdmTrackingStep step, JvdmTextStep textStep) =>
      jvdmTracking[step]! * jvdmText[textStep]!.size;

  FontWeight fontWeight(JvdmWeightStep step) {
    switch (step) {
      case JvdmWeightStep.normal:
        return FontWeight.w400;
      case JvdmWeightStep.medium:
        return FontWeight.w500;
      case JvdmWeightStep.bold:
        return FontWeight.w700;
    }
  }

  TextStyle textStyle(
    JvdmTextStep step, {
    JvdmWeightStep weight = JvdmWeightStep.normal,
    JvdmColorToken? color,
    JvdmTrackingStep? tracking,
  }) {
    return TextStyle(
      fontSize: fontSize(step),
      height: lineHeight(step),
      fontWeight: fontWeight(weight),
      color: color == null ? null : this.color(color),
      letterSpacing: tracking == null ? null : letterSpacing(tracking, step),
    );
  }

  Duration duration(JvdmDurationStep step) => jvdmDuration[step]!;

  Curve curve(JvdmEaseStep step) {
    final JvdmBezier bezier = jvdmEase[step]!;
    return Cubic(bezier.x1, bezier.y1, bezier.x2, bezier.y2);
  }

  @override
  JvdmTokens copyWith({Brightness? brightness}) =>
      JvdmTokens(brightness: brightness ?? this.brightness);

  @override
  JvdmTokens lerp(ThemeExtension<JvdmTokens>? other, double t) {
    if (other is! JvdmTokens) {
      return this;
    }
    return t < 0.5 ? this : other;
  }

  @override
  bool operator ==(Object other) =>
      other is JvdmTokens && other.brightness == brightness;

  @override
  int get hashCode => brightness.hashCode;
}

ThemeData _jvdmTheme(Brightness brightness) {
  final JvdmTokens tokens = JvdmTokens(brightness: brightness);

  return ThemeData(
    brightness: brightness,
    scaffoldBackgroundColor: tokens.color(JvdmColorToken.app),
    canvasColor: tokens.color(JvdmColorToken.surface),
    extensions: <ThemeExtension<dynamic>>[tokens],
    colorScheme: ColorScheme(
      brightness: brightness,
      primary: tokens.color(JvdmColorToken.accent),
      onPrimary: tokens.color(JvdmColorToken.onAccent),
      secondary: tokens.color(JvdmColorToken.accentSoft),
      onSecondary: tokens.color(JvdmColorToken.accentInk),
      error: tokens.color(JvdmColorToken.danger),
      onError: tokens.color(JvdmColorToken.onAccent),
      surface: tokens.color(JvdmColorToken.surface),
      onSurface: tokens.color(JvdmColorToken.ink),
    ),
  );
}

ThemeData jvdmLightTheme() => _jvdmTheme(Brightness.light);

ThemeData jvdmDarkTheme() => _jvdmTheme(Brightness.dark);
