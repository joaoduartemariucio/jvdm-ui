import 'package:flutter/widgets.dart';

import '../../atoms/icon/chevron.dart';
import '../../tokens/icon.dart';
import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import 'locales.dart';

export 'locales.dart';

class JvdmCrumb {
  const JvdmCrumb({required this.id, required this.label, this.href});

  final String id;
  final String label;
  final String? href;
}

class JvdmBreadcrumb extends StatelessWidget {
  const JvdmBreadcrumb({
    required this.items,
    this.label = JvdmBreadcrumbLocales.label,
    super.key,
  });

  final List<JvdmCrumb> items;
  final String label;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      label: label,
      container: true,
      child: Wrap(
        spacing: tokens.spacing(1),
        runSpacing: tokens.spacing(1),
        crossAxisAlignment: WrapCrossAlignment.center,
        children: <Widget>[
          for (int index = 0; index < items.length; index += 1)
            Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                if (index > 0) ...<Widget>[
                  Transform.rotate(
                    angle: -1.5707963267948966,
                    child: JvdmChevronIcon(
                      size: JvdmIconSize.sm,
                      color: tokens.color(JvdmColorToken.inkDim),
                    ),
                  ),
                  SizedBox(width: tokens.spacing(1)),
                ],
                Text(
                  items[index].label,
                  style: tokens.textStyle(
                    JvdmTextStep.xs,
                    weight: index == items.length - 1
                        ? JvdmWeightStep.medium
                        : JvdmWeightStep.normal,
                    color: index == items.length - 1
                        ? JvdmColorToken.ink
                        : JvdmColorToken.inkMuted,
                  ),
                ),
              ],
            ),
        ],
      ),
    );
  }
}
