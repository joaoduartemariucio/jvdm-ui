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
        return MediaQuery(
          data: MediaQuery.of(context).copyWith(disableAnimations: true),
          child: Scaffold(
            body: Padding(
              padding: EdgeInsets.all(tokens.spacing(4)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  JvdmDialogSurface(
                    title: const Text('Confirm the bid'),
                    onClose: () {},
                    child: Text(
                      'You are bidding R\$ 12.000 on lot 42.',
                      style: tokens.textStyle(JvdmTextStep.sm,
                          color: JvdmColorToken.inkSoft),
                    ),
                  ),
                  SizedBox(height: tokens.spacing(4)),
                  JvdmConfirmDialogContent(
                    title: 'Delete the lot',
                    description: 'This cannot be undone.',
                    confirmLabel: 'Delete',
                    cancelLabel: 'Keep',
                    onConfirm: () {},
                    onCancel: () {},
                  ),
                ],
              ),
            ),
          ),
        );
      },
    ),
  );
}

void main() {
  group('the dialog family', () {
    test('says what it says on its own', () {
      expect(JvdmModalLocales.label, 'Dialog');
      expect(JvdmModalLocales.close, 'Close');
      expect(JvdmDrawerLocales.close, 'Close drawer');
    });

    test('carries the four modal sizes the contract names', () {
      expect(
        JvdmModalSize.values.map((JvdmModalSize s) => s.token).toList(),
        <String>['sm', 'md', 'lg', 'xl'],
      );
    });

    test('makes every size wider than the one before it', () {
      final List<double> widths =
          JvdmModalSize.values.map((JvdmModalSize s) => s.maxWidth).toList();
      expect(widths, <double>[...widths]..sort());
      expect(widths.toSet().length, widths.length);
    });
  });

  testWidgets('the surface draws from the palette and rules its header', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();

    const JvdmTokens tokens = JvdmTokens(brightness: Brightness.light);
    final ColoredBox surface = tester.widget<ColoredBox>(
      find.descendant(
        of: find.byType(JvdmDialogSurface),
        matching: find.byType(ColoredBox),
      ),
    );

    expect(surface.color, tokens.color(JvdmColorToken.surface));
    expect(find.text('Confirm the bid'), findsOneWidget);
  });

  testWidgets('a confirm dialog offers both answers',
      (WidgetTester tester) async {
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();

    expect(find.text('Delete'), findsOneWidget);
    expect(find.text('Keep'), findsOneWidget);
    expect(find.text('This cannot be undone.'), findsOneWidget);
  });

  testWidgets('matches the light golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 480));
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-six-light.png'),
    );
  });

  testWidgets('matches the dark golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 480));
    await tester.pumpWidget(_gallery(Brightness.dark));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-six-dark.png'),
    );
  });
}
