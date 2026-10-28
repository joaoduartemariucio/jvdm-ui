import 'package:flutter/widgets.dart';

import '../button/button.dart';

enum JvdmIconButtonSize {
  icon('icon', JvdmButtonSize.icon),
  iconSm('icon-sm', JvdmButtonSize.iconSm);

  const JvdmIconButtonSize(this.token, this.button);

  final String token;
  final JvdmButtonSize button;
}

class JvdmIconButton extends StatelessWidget {
  const JvdmIconButton({
    required this.child,
    required this.label,
    this.variant = JvdmButtonVariant.ghost,
    this.size = JvdmIconButtonSize.icon,
    this.onPressed,
    super.key,
  });

  final Widget child;
  final String label;
  final JvdmButtonVariant variant;
  final JvdmIconButtonSize size;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return JvdmButton(
      variant: variant,
      size: size.button,
      onPressed: onPressed,
      semanticLabel: label,
      child: child,
    );
  }
}
