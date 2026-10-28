import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

String avatarInitials(String name) {
  final List<String> parts = name
      .trim()
      .split(RegExp(r'\s+'))
      .where((String part) => part.isNotEmpty)
      .toList();

  if (parts.isEmpty) {
    return '';
  }

  final String first = parts.first[0];
  final String last = parts.length > 1 ? parts.last[0] : '';
  return (first + last).toUpperCase();
}

enum JvdmAvatarSize {
  sm('sm', 32.0, JvdmTextStep.xs),
  md('md', 40.0, JvdmTextStep.sm),
  lg('lg', 48.0, JvdmTextStep.base);

  const JvdmAvatarSize(this.token, this.points, this.text);

  final String token;
  final double points;
  final JvdmTextStep text;
}

class JvdmAvatar extends StatelessWidget {
  const JvdmAvatar({
    required this.name,
    this.size = JvdmAvatarSize.md,
    this.label,
    super.key,
  });

  final String name;
  final JvdmAvatarSize size;
  final String? label;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      image: true,
      label: label ?? name,
      child: Container(
        alignment: Alignment.center,
        width: size.points,
        height: size.points,
        decoration: BoxDecoration(
          color: tokens.color(JvdmColorToken.raised),
          borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.md)),
        ),
        child: Text(
          avatarInitials(name),
          style: tokens.textStyle(
            size.text,
            weight: JvdmWeightStep.medium,
            color: JvdmColorToken.inkMuted,
          ),
        ),
      ),
    );
  }
}
