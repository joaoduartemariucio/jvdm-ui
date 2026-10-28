import 'package:flutter/widgets.dart';

import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';
import 'locales.dart';

export 'locales.dart';

class JvdmTab {
  const JvdmTab({
    required this.value,
    required this.label,
    required this.content,
    this.disabled = false,
  });

  final String value;
  final String label;
  final Widget content;
  final bool disabled;
}

class JvdmTabs extends StatelessWidget {
  const JvdmTabs({
    required this.items,
    required this.value,
    required this.onValueChange,
    this.label = JvdmTabsLocales.label,
    super.key,
  });

  final List<JvdmTab> items;
  final String value;
  final ValueChanged<String> onValueChange;
  final String label;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);
    final JvdmTab? active = items
        .where((JvdmTab item) => item.value == value)
        .followedBy(items)
        .firstOrNull;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Semantics(
          label: label,
          container: true,
          child: DecoratedBox(
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(color: tokens.color(JvdmColorToken.line)),
              ),
            ),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: <Widget>[
                  for (final JvdmTab item in items)
                    _JvdmTabButton(
                      item: item,
                      selected: item.value == active?.value,
                      onTap: () => onValueChange(item.value),
                    ),
                ],
              ),
            ),
          ),
        ),
        SizedBox(height: tokens.spacing(4)),
        if (active != null) active.content,
      ],
    );
  }
}

class _JvdmTabButton extends StatelessWidget {
  const _JvdmTabButton({
    required this.item,
    required this.selected,
    required this.onTap,
  });

  final JvdmTab item;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Semantics(
      selected: selected,
      button: true,
      enabled: !item.disabled,
      child: GestureDetector(
        onTap: item.disabled ? null : onTap,
        child: Container(
          constraints: BoxConstraints(minHeight: tokens.spacing(10)),
          alignment: Alignment.center,
          padding: EdgeInsets.symmetric(horizontal: tokens.spacing(3)),
          decoration: BoxDecoration(
            border: Border(
              bottom: selected
                  ? BorderSide(
                      color: tokens.color(JvdmColorToken.accent),
                      width: tokens.spacing(0.5),
                    )
                  : BorderSide.none,
            ),
          ),
          child: Text(
            item.label,
            style: tokens.textStyle(
              JvdmTextStep.sm,
              weight: selected ? JvdmWeightStep.medium : JvdmWeightStep.normal,
              color: selected ? JvdmColorToken.ink : JvdmColorToken.inkMuted,
            ),
          ),
        ),
      ),
    );
  }
}
