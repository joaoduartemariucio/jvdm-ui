import 'package:flutter/widgets.dart';

import '../../atoms/icon/chevron.dart';
import '../../tokens/icon.dart';
import '../../tokens/theme.dart';
import '../../tokens/tokens.dart';

class JvdmAccordionItem {
  const JvdmAccordionItem({
    required this.id,
    required this.title,
    required this.content,
    this.defaultOpen = false,
  });

  final String id;
  final String title;
  final Widget content;
  final bool defaultOpen;
}

List<String> jvdmToggledAccordion(
  List<String> open,
  String id, {
  required bool exclusive,
}) {
  if (open.contains(id)) {
    return open.where((String entry) => entry != id).toList();
  }
  return exclusive ? <String>[id] : <String>[...open, id];
}

class JvdmAccordion extends StatefulWidget {
  const JvdmAccordion({
    required this.items,
    this.exclusive = false,
    super.key,
  });

  final List<JvdmAccordionItem> items;
  final bool exclusive;

  @override
  State<JvdmAccordion> createState() => _JvdmAccordionState();
}

class _JvdmAccordionState extends State<JvdmAccordion> {
  late List<String> _open = widget.items
      .where((JvdmAccordionItem item) => item.defaultOpen)
      .map((JvdmAccordionItem item) => item.id)
      .toList();

  @override
  Widget build(BuildContext context) {
    final JvdmTokens tokens = JvdmTokens.of(context);

    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: tokens.color(JvdmColorToken.surface),
        border: Border.all(color: tokens.color(JvdmColorToken.line)),
        borderRadius: BorderRadius.circular(tokens.radius(JvdmRadiusStep.md)),
      ),
      child: Column(
        children: <Widget>[
          for (int index = 0; index < widget.items.length; index += 1)
            _row(context, tokens, index),
        ],
      ),
    );
  }

  Widget _row(BuildContext context, JvdmTokens tokens, int index) {
    final JvdmAccordionItem item = widget.items[index];
    final bool isOpen = _open.contains(item.id);

    return DecoratedBox(
      decoration: BoxDecoration(
        border: index == 0
            ? null
            : Border(top: BorderSide(color: tokens.color(JvdmColorToken.line))),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Semantics(
            button: true,
            expanded: isOpen,
            child: GestureDetector(
              onTap: () => setState(() {
                _open = jvdmToggledAccordion(
                  _open,
                  item.id,
                  exclusive: widget.exclusive,
                );
              }),
              child: Container(
                constraints: BoxConstraints(minHeight: tokens.spacing(12)),
                padding: EdgeInsets.symmetric(horizontal: tokens.spacing(4)),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text(
                      item.title,
                      style: tokens.textStyle(
                        JvdmTextStep.sm,
                        color: JvdmColorToken.ink,
                      ),
                    ),
                    Transform.rotate(
                      angle: isOpen ? 3.141592653589793 : 0,
                      child: JvdmChevronIcon(
                        size: JvdmIconSize.md,
                        color: tokens.color(JvdmColorToken.inkMuted),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          if (isOpen)
            Padding(
              padding: EdgeInsets.only(
                left: tokens.spacing(4),
                right: tokens.spacing(4),
                bottom: tokens.spacing(4),
              ),
              child: DefaultTextStyle.merge(
                style: tokens.textStyle(
                  JvdmTextStep.sm,
                  color: JvdmColorToken.inkSoft,
                ),
                child: item.content,
              ),
            ),
        ],
      ),
    );
  }
}
