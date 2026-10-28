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
                  Row(
                    children: <Widget>[
                      for (final JvdmAvatarSize size in JvdmAvatarSize.values)
                        Padding(
                          padding: EdgeInsets.only(right: tokens.spacing(2)),
                          child: JvdmAvatar(name: 'Ada Lovelace', size: size),
                        ),
                      const JvdmKbd(child: Text('K')),
                      SizedBox(width: tokens.spacing(2)),
                      for (final JvdmLabelTone tone in JvdmLabelTone.values)
                        Padding(
                          padding: EdgeInsets.only(right: tokens.spacing(2)),
                          child: JvdmLabel(tone: tone, child: Text(tone.token)),
                        ),
                    ],
                  ),
                  SizedBox(height: tokens.spacing(3)),
                  const JvdmCard(child: Text('Card')),
                  SizedBox(height: tokens.spacing(3)),
                  const JvdmFormAlert(child: Text('Something went wrong')),
                  SizedBox(height: tokens.spacing(3)),
                  const JvdmDivider(child: Text('or')),
                  SizedBox(height: tokens.spacing(3)),
                  SizedBox(
                    height: tokens.spacing(4),
                    width: tokens.spacing(40),
                    child: const JvdmSkeleton(),
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
  group('Avatar', () {
    test('takes the first and last initial, upper-cased', () {
      expect(avatarInitials('João Vitor Duarte Mariucio'), 'JM');
      expect(avatarInitials('ada'), 'A');
      expect(avatarInitials('  grace   hopper  '), 'GH');
      expect(avatarInitials(''), '');
      expect(avatarInitials('   '), '');
    });

    test('sizes sit on the scale the web uses', () {
      expect(
        JvdmAvatarSize.values.map((JvdmAvatarSize s) => s.points).toList(),
        <double>[32, 40, 48],
      );
      expect(
        JvdmAvatarSize.values.map((JvdmAvatarSize s) => s.token).toList(),
        <String>['sm', 'md', 'lg'],
      );
    });
  });

  group('the wave', () {
    test('card padding is whole steps of the spacing scale', () {
      expect(
        JvdmCardPadding.values.map((JvdmCardPadding p) => p.steps).toList(),
        <int>[0, 4, 5, 6],
      );
    });

    test('every label tone draws from the palette', () {
      expect(
        JvdmLabelTone.values.map((JvdmLabelTone t) => t.token).toList(),
        <String>['muted', 'dim', 'accent'],
      );
      expect(
        JvdmLabelTone.values.map((JvdmLabelTone t) => t.color).toList(),
        <JvdmColorToken>[
          JvdmColorToken.inkMuted,
          JvdmColorToken.inkDim,
          JvdmColorToken.accentInk,
        ],
      );
    });

    test('the skeleton fades between the two documented opacities', () {
      expect(jvdmSkeletonFrom, 1.0);
      expect(jvdmSkeletonTo, 0.5);
    });
  });

  testWidgets('a card is a surface inside a line border', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();

    const JvdmTokens tokens = JvdmTokens(brightness: Brightness.light);
    final Container card = tester.widget<Container>(
      find.descendant(
          of: find.byType(JvdmCard), matching: find.byType(Container)),
    );
    final BoxDecoration decoration = card.decoration! as BoxDecoration;

    expect(decoration.color, tokens.color(JvdmColorToken.surface));
    expect(decoration.border,
        Border.all(color: tokens.color(JvdmColorToken.line)));
  });

  testWidgets('matches the light golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(420, 300));
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-one-light.png'),
    );
  });

  testWidgets('matches the dark golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(420, 300));
    await tester.pumpWidget(_gallery(Brightness.dark));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-one-dark.png'),
    );
  });
}
