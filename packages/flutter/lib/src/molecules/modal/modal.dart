import 'package:flutter/material.dart';

import '../../atoms/icon/close.dart';
import '../../atoms/icon_button/icon_button.dart';
import '../../tokens/icon.dart';
import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import 'locales.dart';

export 'locales.dart';

enum JvdmModalSize {
  sm('sm', 448),
  md('md', 672),
  lg('lg', 896),
  xl('xl', 1152);

  const JvdmModalSize(this.token, this.maxWidth);

  final String token;
  final double maxWidth;
}

class JvdmDialogSurface extends StatelessWidget {
  const JvdmDialogSurface({
    required this.child,
    required this.onClose,
    this.title,
    this.closeLabel = JvdmModalLocales.close,
    this.label = JvdmModalLocales.label,
    super.key,
  });

  final Widget child;
  final VoidCallback onClose;
  final Widget? title;
  final String closeLabel;
  final String label;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      label: label,
      scopesRoute: true,
      explicitChildNodes: true,
      child: ColoredBox(
        color: tokens.color(JvdmColorToken.surface),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            if (title != null) ...<Widget>[
              Container(
                decoration: BoxDecoration(
                  border: Border(
                    bottom:
                        BorderSide(color: tokens.color(JvdmColorToken.line)),
                  ),
                ),
                padding: EdgeInsets.only(
                  left: tokens.spacing(5),
                  right: tokens.spacing(3),
                  top: tokens.spacing(3),
                  bottom: tokens.spacing(3),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    DefaultTextStyle.merge(
                      style: tokens.textStyle(
                        JvdmTextStep.lg,
                        weight: JvdmWeightStep.bold,
                        color: JvdmColorToken.ink,
                      ),
                      child: title!,
                    ),
                    JvdmIconButton(
                      label: closeLabel,
                      onPressed: onClose,
                      child: JvdmCloseIcon(
                        size: JvdmIconSize.md,
                        color: tokens.color(JvdmColorToken.inkMuted),
                      ),
                    ),
                  ],
                ),
              ),
            ],
            Padding(
              padding: EdgeInsets.all(tokens.spacing(5)),
              child: child,
            ),
          ],
        ),
      ),
    );
  }
}

Future<T?> showJvdmModal<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  Widget? title,
  JvdmModalSize size = JvdmModalSize.md,
  String closeLabel = JvdmModalLocales.close,
  String label = JvdmModalLocales.label,
}) {
  final JvdmTokens tokens = JvdmTokens.of(context);

  return showModalBottomSheet<T>(
    context: context,
    isScrollControlled: true,
    backgroundColor: tokens.color(JvdmColorToken.surface),
    constraints: BoxConstraints(maxWidth: size.maxWidth),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(
        top: Radius.circular(tokens.radius(JvdmRadiusStep.xl)),
      ),
    ),
    builder: (BuildContext sheetContext) {
      return JvdmDialogSurface(
        title: title,
        closeLabel: closeLabel,
        label: label,
        onClose: () => Navigator.of(sheetContext).pop(),
        child: builder(sheetContext),
      );
    },
  );
}
