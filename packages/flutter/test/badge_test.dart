import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jvdm_ui/jvdm_ui.dart';

Widget _gallery(Brightness brightness) {
  return MaterialApp(
    debugShowCheckedModeBanner: false,
    theme: brightness == Brightness.dark ? jvdmDarkTheme() : jvdmLightTheme(),
    home: Builder(
      builder: (BuildContext context) {
        final JvdmTokens tokens = JvdmTokens.of(context);
        return Scaffold(
          body: Center(
            child: Wrap(
              spacing: tokens.spacing(2),
              runSpacing: tokens.spacing(2),
              children: <Widget>[
                for (final BadgeTone tone in BadgeTone.values)
                  JvdmBadge(tone: tone, child: Text(tone.name)),
              ],
            ),
          ),
        );
      },
    ),
  );
}

void main() {
  testWidgets('carries the six tones the contract names, in order', (
    WidgetTester tester,
  ) async {
    expect(
      BadgeTone.values.map((BadgeTone tone) => tone.name).toList(),
      <String>['neutral', 'accent', 'ok', 'warn', 'danger', 'info'],
    );
  });

  testWidgets('pairs the same tokens the web table pairs', (
    WidgetTester tester,
  ) async {
    const Map<BadgeTone, List<JvdmColorToken>> expected =
        <BadgeTone, List<JvdmColorToken>>{
      BadgeTone.neutral: <JvdmColorToken>[
        JvdmColorToken.raised,
        JvdmColorToken.inkSoft,
      ],
      BadgeTone.accent: <JvdmColorToken>[
        JvdmColorToken.accentSoft,
        JvdmColorToken.accentInk,
      ],
      BadgeTone.ok: <JvdmColorToken>[JvdmColorToken.okSoft, JvdmColorToken.ok],
      BadgeTone.warn: <JvdmColorToken>[
        JvdmColorToken.warnSoft,
        JvdmColorToken.warn,
      ],
      BadgeTone.danger: <JvdmColorToken>[
        JvdmColorToken.dangerSoft,
        JvdmColorToken.danger,
      ],
      BadgeTone.info: <JvdmColorToken>[
        JvdmColorToken.infoSoft,
        JvdmColorToken.info,
      ],
    };

    for (final BadgeTone tone in BadgeTone.values) {
      expect(tone.background, expected[tone]![0]);
      expect(tone.foreground, expected[tone]![1]);
    }
  });

  testWidgets('paints each tone from the palette and stays on the scale', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(_gallery(Brightness.light));

    const JvdmTokens tokens = JvdmTokens(brightness: Brightness.light);

    final Iterable<DecoratedBox> boxes = tester.widgetList<DecoratedBox>(
      find.descendant(
        of: find.byType(JvdmBadge),
        matching: find.byType(DecoratedBox),
      ),
    );

    expect(boxes.length, BadgeTone.values.length);

    for (final (int index, DecoratedBox box) in boxes.indexed) {
      final BoxDecoration decoration = box.decoration as BoxDecoration;
      expect(
          decoration.color, tokens.color(BadgeTone.values[index].background));
      expect(
        decoration.borderRadius,
        BorderRadius.circular(tokens.radius(JvdmRadiusStep.xs)),
      );
    }
  });

  testWidgets('repaints when the brightness flips', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(_gallery(Brightness.light));
    final BoxDecoration light = tester
        .widgetList<DecoratedBox>(
          find.descendant(
            of: find.byType(JvdmBadge),
            matching: find.byType(DecoratedBox),
          ),
        )
        .first
        .decoration as BoxDecoration;

    await tester.pumpWidget(_gallery(Brightness.dark));
    await tester.pumpAndSettle();
    final BoxDecoration dark = tester
        .widgetList<DecoratedBox>(
          find.descendant(
            of: find.byType(JvdmBadge),
            matching: find.byType(DecoratedBox),
          ),
        )
        .first
        .decoration as BoxDecoration;

    expect(light.color, isNot(equals(dark.color)));
  });

  testWidgets('matches the light golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(420, 160));
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/badge-light.png'),
    );
  });

  testWidgets('matches the dark golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(420, 160));
    await tester.pumpWidget(_gallery(Brightness.dark));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/badge-dark.png'),
    );
  });
}
