import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import 'button_style.dart';

export 'button_style.dart';

class JvdmButton extends StatelessWidget {
  const JvdmButton({
    required this.child,
    this.variant = JvdmButtonVariant.secondary,
    this.size = JvdmButtonSize.md,
    this.onPressed,
    this.semanticLabel,
    super.key,
  });

  final Widget child;
  final JvdmButtonVariant variant;
  final JvdmButtonSize size;
  final VoidCallback? onPressed;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final bool disabled = onPressed == null;

    return Semantics(
      button: true,
      enabled: !disabled,
      label: semanticLabel,
      child: Opacity(
        opacity: disabled ? 0.5 : 1,
        child: GestureDetector(
          onTap: onPressed,
          child: Container(
            width: size.square,
            height: size.square,
            alignment: size.square == null ? null : Alignment.center,
            padding: EdgeInsets.symmetric(
              horizontal: tokens.spacing(size.horizontal.toDouble()),
              vertical: tokens.spacing(size.vertical.toDouble()),
            ),
            decoration: BoxDecoration(
              color: variant.background == null
                  ? null
                  : tokens.color(variant.background!),
              border: variant.border == null
                  ? null
                  : Border.all(color: tokens.color(variant.border!)),
              borderRadius: BorderRadius.circular(
                tokens.radius(JvdmRadiusStep.md),
              ),
            ),
            child: DefaultTextStyle.merge(
              style: tokens.textStyle(
                size.text,
                weight: variant.weight,
                color: variant.foreground,
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[child],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
