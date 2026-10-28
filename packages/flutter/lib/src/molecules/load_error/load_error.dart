import 'package:flutter/widgets.dart';

import '../../atoms/button/button.dart';
import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import 'locales.dart';

export 'locales.dart';

class JvdmLoadError extends StatelessWidget {
  const JvdmLoadError({
    required this.message,
    this.onRetry,
    this.retryLabel = JvdmLoadErrorLocales.retry,
    super.key,
  });

  final String message;
  final VoidCallback? onRetry;
  final String retryLabel;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Padding(
      padding: EdgeInsets.symmetric(vertical: tokens.spacing(16)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Text(
            message,
            textAlign: TextAlign.center,
            style: tokens.textStyle(
              JvdmTextStep.sm,
              color: JvdmColorToken.danger,
            ),
          ),
          if (onRetry != null) ...<Widget>[
            SizedBox(height: tokens.spacing(3)),
            JvdmButton(onPressed: onRetry, child: Text(retryLabel)),
          ],
        ],
      ),
    );
  }
}
