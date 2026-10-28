import 'package:flutter/widgets.dart';

import '../../atoms/button/button.dart';
import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import 'locales.dart';

export 'locales.dart';

int jvdmClampPage(int page, int pages) {
  final int top = pages < 1 ? 1 : pages;
  return page.clamp(1, top);
}

class JvdmPagination extends StatelessWidget {
  const JvdmPagination({
    required this.page,
    required this.pages,
    required this.onPageChange,
    this.previousLabel = JvdmPaginationLocales.previous,
    this.nextLabel = JvdmPaginationLocales.next,
    this.pageLabel = JvdmPaginationLocales.page,
    this.label = JvdmPaginationLocales.label,
    super.key,
  });

  final int page;
  final int pages;
  final ValueChanged<int> onPageChange;
  final String previousLabel;
  final String nextLabel;
  final String Function(int) pageLabel;
  final String label;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final int current = jvdmClampPage(page, pages);

    return Semantics(
      label: label,
      container: true,
      child: Wrap(
        spacing: tokens.spacing(2),
        runSpacing: tokens.spacing(2),
        crossAxisAlignment: WrapCrossAlignment.center,
        children: <Widget>[
          JvdmButton(
            onPressed: current == 1 ? null : () => onPageChange(current - 1),
            child: Text(previousLabel),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: tokens.spacing(2)),
            child: Text(
              pageLabel(current),
              style: tokens.textStyle(
                JvdmTextStep.sm,
                color: JvdmColorToken.inkMuted,
              ),
            ),
          ),
          JvdmButton(
            onPressed:
                current == pages ? null : () => onPageChange(current + 1),
            child: Text(nextLabel),
          ),
        ],
      ),
    );
  }
}
