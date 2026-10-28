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
                  Wrap(
                    spacing: tokens.spacing(2),
                    runSpacing: tokens.spacing(2),
                    children: <Widget>[
                      for (final JvdmButtonVariant variant
                          in JvdmButtonVariant.values)
                        JvdmButton(
                          variant: variant,
                          onPressed: () {},
                          child: Text(variant.token),
                        ),
                    ],
                  ),
                  SizedBox(height: tokens.spacing(3)),
                  Row(
                    children: <Widget>[
                      const JvdmCheckbox(checked: true, label: Text('on')),
                      SizedBox(width: tokens.spacing(4)),
                      const JvdmRadio(selected: true, label: Text('pick')),
                      SizedBox(width: tokens.spacing(4)),
                      JvdmSwitch(
                        checked: true,
                        onCheckedChange: (bool _) {},
                        label: const Text('live'),
                      ),
                    ],
                  ),
                  SizedBox(height: tokens.spacing(3)),
                  const JvdmInput(placeholder: 'Your name'),
                  SizedBox(height: tokens.spacing(3)),
                  const JvdmSelect(
                    options: <JvdmSelectOption>[
                      JvdmSelectOption(value: 'a', label: 'Option A'),
                    ],
                    value: 'a',
                  ),
                  SizedBox(height: tokens.spacing(3)),
                  const JvdmSlider(value: 40),
                  SizedBox(height: tokens.spacing(3)),
                  const JvdmLink(text: 'Read the ADRs'),
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
  group('Button', () {
    test('carries the four variants and five sizes the contract names', () {
      expect(
        JvdmButtonVariant.values.map((JvdmButtonVariant v) => v.token).toList(),
        <String>['primary', 'secondary', 'ghost', 'danger'],
      );
      expect(
        JvdmButtonSize.values.map((JvdmButtonSize s) => s.token).toList(),
        <String>['sm', 'md', 'lg', 'icon', 'icon-sm'],
      );
    });

    test('paints a background for the primary variant alone', () {
      expect(JvdmButtonVariant.primary.background, JvdmColorToken.accent);
      for (final JvdmButtonVariant variant in JvdmButtonVariant.values) {
        if (variant == JvdmButtonVariant.primary) {
          continue;
        }
        expect(variant.background, isNull);
      }
    });

    test('makes the icon sizes square and the rest padded', () {
      expect(JvdmButtonSize.icon.square, 40.0);
      expect(JvdmButtonSize.iconSm.square, 32.0);
      expect(JvdmButtonSize.md.square, isNull);
      expect(JvdmButtonSize.md.horizontal, 4);
    });

    test('narrows the icon button to the two square sizes', () {
      expect(
        JvdmIconButtonSize.values
            .map((JvdmIconButtonSize s) => s.token)
            .toList(),
        <String>['icon', 'icon-sm'],
      );
      expect(JvdmIconButtonSize.icon.button, JvdmButtonSize.icon);
    });
  });

  group('the rest of the wave', () {
    test('pairs a text and an underline token for each link tone', () {
      expect(
        JvdmLinkTone.values.map((JvdmLinkTone t) => t.token).toList(),
        <String>['accent', 'ink', 'muted'],
      );
      for (final JvdmLinkTone tone in JvdmLinkTone.values) {
        expect(tone.color, isNot(equals(tone.underline)));
      }
    });

    test('pads both control sizes in whole steps', () {
      expect(
        JvdmControlSize.values.map((JvdmControlSize s) => s.token).toList(),
        <String>['sm', 'md'],
      );
      expect(JvdmControlSize.sm.horizontal, 3);
      expect(JvdmControlSize.md.vertical, 3);
    });

    test('travels the switch thumb by the track minus thumb and insets', () {
      expect(jvdmSwitchTrackWidth, 40.0);
      expect(jvdmSwitchThumb, 16.0);
      expect(jvdmSwitchTravel, 16.0);
      expect(jvdmSwitchTrack(true), JvdmColorToken.accent);
      expect(jvdmSwitchThumbColor(true), JvdmColorToken.onAccent);
    });

    test('clamps the slider ratio to the track', () {
      expect(jvdmSliderRatio(50, 0, 100), 0.5);
      expect(jvdmSliderRatio(-10, 0, 100), 0.0);
      expect(jvdmSliderRatio(999, 0, 100), 1.0);
      expect(jvdmSliderRatio(5, 5, 5), 0.0);
      expect(jvdmSliderRatio(3, 1, 5), 0.5);
    });

    test('shares one box between checkbox and radio', () {
      expect(jvdmChoiceBox, 5.0);
      expect(jvdmChoiceDot, 2.5);
    });
  });

  testWidgets('matches the light golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 520));
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-two-light.png'),
    );
  });

  testWidgets('matches the dark golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 520));
    await tester.pumpWidget(_gallery(Brightness.dark));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-two-dark.png'),
    );
  });
}
