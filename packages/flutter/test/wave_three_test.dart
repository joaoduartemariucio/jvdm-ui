import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jvdm_ui/jvdm_ui.dart';

const List<JvdmStep> _steps = <JvdmStep>[
  JvdmStep(id: 'a', label: 'Details', description: 'Who and when'),
  JvdmStep(id: 'b', label: 'Review'),
  JvdmStep(id: 'c', label: 'Publish'),
];

Widget _gallery(Brightness brightness) {
  return MaterialApp(
    debugShowCheckedModeBanner: false,
    theme: brightness == Brightness.dark ? jvdmDarkTheme() : jvdmLightTheme(),
    home: Builder(
      builder: (BuildContext context) {
        final JvdmTokens tokens = JvdmTokens.of(context);
        return Scaffold(
          body: SingleChildScrollView(
            padding: EdgeInsets.all(tokens.spacing(4)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                const JvdmPageHeader(
                  title: Text('Auctions'),
                  subtitle: Text('Everything open this week'),
                ),
                SizedBox(height: tokens.spacing(4)),
                for (final JvdmNoticeTone tone
                    in JvdmNoticeTone.values) ...<Widget>[
                  JvdmBanner(
                      title: tone.token,
                      tone: tone,
                      child: Text('A $tone notice')),
                  SizedBox(height: tokens.spacing(2)),
                ],
                const JvdmCallout(
                  title: 'Heads up',
                  tone: JvdmNoticeTone.warn,
                  child: Text('This closes in an hour'),
                ),
                SizedBox(height: tokens.spacing(4)),
                Row(
                  children: <Widget>[
                    const Expanded(
                      child: JvdmStatCard(
                          label: 'Lots', value: '1284', hint: 'this month'),
                    ),
                    SizedBox(width: tokens.spacing(3)),
                    const Expanded(
                      child: JvdmStatCard(
                          label: 'Revenue', value: 'R\$ 1.284.000,00'),
                    ),
                  ],
                ),
                SizedBox(height: tokens.spacing(4)),
                const JvdmCardTitle(
                  hint: Text('last 7 days'),
                  child: Text('Recent'),
                ),
                SizedBox(height: tokens.spacing(4)),
                const JvdmField(
                  label: 'Your name',
                  error: 'This is required',
                  child: JvdmInput(placeholder: 'Ada Lovelace'),
                ),
                SizedBox(height: tokens.spacing(4)),
                const JvdmStepper(steps: _steps, current: 1),
                const JvdmEmpty(
                    title: 'Nothing here yet',
                    description: Text('Add a lot to start')),
              ],
            ),
          ),
        );
      },
    ),
  );
}

void main() {
  group('the notice tones', () {
    test('carries the four tones the contract names', () {
      expect(
        JvdmNoticeTone.values.map((JvdmNoticeTone t) => t.token).toList(),
        <String>['info', 'ok', 'warn', 'danger'],
      );
    });

    test('pairs each tone with its own soft background', () {
      for (final JvdmNoticeTone tone in JvdmNoticeTone.values) {
        expect(tone.foreground, isNot(equals(tone.background)));
        expect(tone.background.token, '${tone.foreground.token}-soft');
      }
    });

    test('draws the border from the text color rather than a new one', () {
      expect(jvdmNoticeBorderOpacity, 0.4);
    });
  });

  group('StatCard', () {
    test('shrinks the value step as the value grows', () {
      expect(jvdmStatCardStep('42'), JvdmTextStep.xxl);
      expect(jvdmStatCardStep('1234567'), JvdmTextStep.xxl);
      expect(jvdmStatCardStep('12345678'), JvdmTextStep.lg);
      expect(jvdmStatCardStep('123456789012'), JvdmTextStep.lg);
      expect(jvdmStatCardStep('1234567890123'), JvdmTextStep.sm);
      expect(jvdmStatCardStep(''), JvdmTextStep.xxl);
    });
  });

  group('Stepper', () {
    test('reads a step state from its index against the current one', () {
      expect(JvdmStepState.of(0, 1), JvdmStepState.done);
      expect(JvdmStepState.of(1, 1), JvdmStepState.current);
      expect(JvdmStepState.of(2, 1), JvdmStepState.todo);
      expect(JvdmStepState.of(0, 0), JvdmStepState.current);
    });

    test('marks only the untouched steps as muted', () {
      expect(JvdmStepState.todo.dot, JvdmColorToken.raised);
      expect(JvdmStepState.todo.label, JvdmColorToken.inkMuted);
      expect(JvdmStepState.done.dot, JvdmColorToken.accent);
    });
  });

  testWidgets('matches the light golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 900));
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-three-light.png'),
    );
  });

  testWidgets('matches the dark golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 900));
    await tester.pumpWidget(_gallery(Brightness.dark));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-three-dark.png'),
    );
  });
}
