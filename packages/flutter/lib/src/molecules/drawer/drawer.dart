import 'package:flutter/material.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import '../modal/modal.dart';
import 'locales.dart';

export 'locales.dart';

Future<T?> showJvdmDrawer<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  Widget? title,
  String closeLabel = JvdmDrawerLocales.close,
}) {
  final JvdmTokens tokens = JvdmTokens.of(context);

  return showGeneralDialog<T>(
    context: context,
    barrierDismissible: true,
    barrierLabel: closeLabel,
    transitionDuration: tokens.duration(JvdmDurationStep.base),
    pageBuilder: (BuildContext dialogContext, Animation<double> _,
        Animation<double> __) {
      return Align(
        alignment: Alignment.centerRight,
        child: Material(
          color: tokens.color(JvdmColorToken.surface),
          child: SizedBox(
            width: JvdmModalSize.sm.maxWidth,
            height: double.infinity,
            child: JvdmDialogSurface(
              title: title,
              closeLabel: closeLabel,
              label: closeLabel,
              onClose: () => Navigator.of(dialogContext).pop(),
              child: builder(dialogContext),
            ),
          ),
        ),
      );
    },
    transitionBuilder: (
      BuildContext _,
      Animation<double> animation,
      Animation<double> __,
      Widget child,
    ) {
      return SlideTransition(
        position: Tween<Offset>(
          begin: const Offset(1, 0),
          end: Offset.zero,
        ).animate(CurvedAnimation(
            parent: animation, curve: tokens.curve(JvdmEaseStep.out))),
        child: child,
      );
    },
  );
}
