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
                  const JvdmBreadcrumb(
                    items: <JvdmCrumb>[
                      JvdmCrumb(id: 'a', label: 'Home'),
                      JvdmCrumb(id: 'b', label: 'Auctions'),
                      JvdmCrumb(id: 'c', label: 'Lot 42'),
                    ],
                  ),
                  SizedBox(height: tokens.spacing(4)),
                  Wrap(
                    spacing: tokens.spacing(2),
                    runSpacing: tokens.spacing(2),
                    children: <Widget>[
                      for (final BadgeTone tone in BadgeTone.values)
                        JvdmTag(
                            tone: tone,
                            onRemove: () {},
                            child: Text(tone.name)),
                    ],
                  ),
                  SizedBox(height: tokens.spacing(4)),
                  for (final JvdmProgressTone tone
                      in JvdmProgressTone.values) ...<Widget>[
                    JvdmProgressBar(value: 0.6, tone: tone),
                    SizedBox(height: tokens.spacing(2)),
                  ],
                  const JvdmProgressBar(
                      value: 0.3, size: JvdmProgressSize.xs, dim: true),
                  SizedBox(height: tokens.spacing(4)),
                  Row(
                    children: <Widget>[
                      for (final JvdmIconSize size
                          in JvdmIconSize.values) ...<Widget>[
                        JvdmSpinner(size: size),
                        SizedBox(width: tokens.spacing(3)),
                      ],
                    ],
                  ),
                  SizedBox(height: tokens.spacing(4)),
                  const JvdmMetricCard(
                    label: 'Revenue',
                    value: Text('R\$ 42k'),
                    change: '+12%',
                    trend: JvdmMetricTrend.up,
                    hint: 'versus last month',
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
  group('what a component says on its own', () {
    test('defaults to English, non-empty', () {
      expect(JvdmSpinnerLocales.label, 'Loading');
      expect(JvdmTagLocales.remove, 'Remove');
      expect(JvdmBreadcrumbLocales.label, 'Breadcrumb');
      expect(JvdmLoadErrorLocales.retry, 'Try again');
    });

    test('a caller can replace every one of them', () {
      expect(const JvdmSpinner(label: 'Carregando').label, 'Carregando');
      expect(
        JvdmTag(removeLabel: 'Remover', child: const Text('x')).removeLabel,
        'Remover',
      );
      expect(
        const JvdmBreadcrumb(items: <JvdmCrumb>[], label: 'Trilha').label,
        'Trilha',
      );
      expect(
        const JvdmLoadError(message: 'x', retryLabel: 'Tentar').retryLabel,
        'Tentar',
      );
    });

    test('and gets the English default when it does not', () {
      expect(const JvdmSpinner().label, JvdmSpinnerLocales.label);
      expect(
          JvdmTag(child: const Text('x')).removeLabel, JvdmTagLocales.remove);
      expect(
        const JvdmBreadcrumb(items: <JvdmCrumb>[]).label,
        JvdmBreadcrumbLocales.label,
      );
      expect(
        const JvdmLoadError(message: 'x').retryLabel,
        JvdmLoadErrorLocales.retry,
      );
    });
  });

  group('ProgressBar', () {
    test('clamps the value to the track', () {
      expect(jvdmProgressRatio(0.5), 0.5);
      expect(jvdmProgressRatio(-1), 0.0);
      expect(jvdmProgressRatio(9), 1.0);
      expect(jvdmProgressRatio(0), 0.0);
      expect(jvdmProgressRatio(1), 1.0);
    });

    test('carries the four tones and two sizes the contract names', () {
      expect(
        JvdmProgressTone.values.map((JvdmProgressTone t) => t.token).toList(),
        <String>['accent', 'ok', 'warn', 'danger'],
      );
      expect(
        JvdmProgressSize.values.map((JvdmProgressSize s) => s.token).toList(),
        <String>['md', 'xs'],
      );
      expect(JvdmProgressSize.md.steps, 2);
    });
  });

  group('MetricCard', () {
    test('colors the change by its trend', () {
      expect(
        JvdmMetricTrend.values.map((JvdmMetricTrend t) => t.token).toList(),
        <String>['neutral', 'up', 'down'],
      );
      expect(JvdmMetricTrend.up.color, JvdmColorToken.ok);
      expect(JvdmMetricTrend.down.color, JvdmColorToken.danger);
    });
  });

  group('Spinner', () {
    test('turns once per period, on the icon scale', () {
      expect(jvdmSpinnerPeriod, const Duration(seconds: 1));
      expect(jvdmSpinnerStroke, 2.4);
    });
  });

  testWidgets('matches the light golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 560));
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-four-light.png'),
    );
  });

  testWidgets('matches the dark golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 560));
    await tester.pumpWidget(_gallery(Brightness.dark));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-four-dark.png'),
    );
  });
}
