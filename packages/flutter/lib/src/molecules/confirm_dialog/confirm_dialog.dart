import 'package:flutter/material.dart';

import '../../atoms/button/button.dart';
import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmConfirmDialogContent extends StatelessWidget {
  const JvdmConfirmDialogContent({
    required this.title,
    required this.confirmLabel,
    required this.cancelLabel,
    required this.onConfirm,
    required this.onCancel,
    this.description,
    this.pending = false,
    this.child,
    super.key,
  });

  final String title;
  final String confirmLabel;
  final String cancelLabel;
  final VoidCallback onConfirm;
  final VoidCallback onCancel;
  final String? description;
  final bool pending;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Container(
      color: tokens.color(JvdmColorToken.surface),
      padding: EdgeInsets.all(tokens.spacing(5)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            title,
            style: tokens.textStyle(
              JvdmTextStep.lg,
              weight: JvdmWeightStep.bold,
              color: JvdmColorToken.ink,
            ),
          ),
          if (description != null) ...<Widget>[
            SizedBox(height: tokens.spacing(2)),
            Text(
              description!,
              style: tokens.textStyle(
                JvdmTextStep.sm,
                color: JvdmColorToken.inkMuted,
              ),
            ),
          ],
          if (child != null) ...<Widget>[
            SizedBox(height: tokens.spacing(4)),
            child!,
          ],
          SizedBox(height: tokens.spacing(4)),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              JvdmButton(
                onPressed: pending ? null : onCancel,
                child: Text(cancelLabel),
              ),
              SizedBox(width: tokens.spacing(3)),
              JvdmButton(
                variant: JvdmButtonVariant.danger,
                onPressed: pending ? null : onConfirm,
                child: Text(confirmLabel),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

Future<bool?> showJvdmConfirmDialog({
  required BuildContext context,
  required String title,
  required String confirmLabel,
  required String cancelLabel,
  String? description,
  Widget? child,
}) {
  final JvdmTokens tokens = JvdmTokens.of(context);

  return showDialog<bool>(
    context: context,
    builder: (BuildContext dialogContext) {
      return Dialog(
        backgroundColor: tokens.color(JvdmColorToken.surface),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.xl)),
        ),
        child: JvdmConfirmDialogContent(
          title: title,
          description: description,
          confirmLabel: confirmLabel,
          cancelLabel: cancelLabel,
          onConfirm: () => Navigator.of(dialogContext).pop(true),
          onCancel: () => Navigator.of(dialogContext).pop(false),
          child: child,
        ),
      );
    },
  );
}
