import 'package:flutter/gestures.dart';
import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

enum JvdmLinkTone {
  accent('accent', JvdmColorToken.accentInk, JvdmColorToken.accent),
  ink('ink', JvdmColorToken.ink, JvdmColorToken.lineStrong),
  muted('muted', JvdmColorToken.inkMuted, JvdmColorToken.line);

  const JvdmLinkTone(this.token, this.color, this.underline);

  final String token;
  final JvdmColorToken color;
  final JvdmColorToken underline;
}

class JvdmLink extends StatefulWidget {
  const JvdmLink({
    required this.text,
    this.tone = JvdmLinkTone.accent,
    this.onTap,
    super.key,
  });

  final String text;
  final JvdmLinkTone tone;
  final VoidCallback? onTap;

  @override
  State<JvdmLink> createState() => _JvdmLinkState();
}

class _JvdmLinkState extends State<JvdmLink> {
  late final TapGestureRecognizer _recognizer = TapGestureRecognizer()
    ..onTap = widget.onTap;

  @override
  void dispose() {
    _recognizer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      link: true,
      child: Text.rich(
        TextSpan(
          text: widget.text,
          recognizer: _recognizer,
          style: tokens
              .textStyle(JvdmTextStep.sm, color: widget.tone.color)
              .copyWith(
                decoration: TextDecoration.underline,
                decorationColor: tokens.color(widget.tone.underline),
              ),
        ),
      ),
    );
  }
}
