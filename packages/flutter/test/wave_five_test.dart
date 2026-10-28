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
                  JvdmSegmented(
                    value: 'week',
                    onValueChange: (String _) {},
                    options: const <JvdmSegmentedOption>[
                      JvdmSegmentedOption(value: 'day', label: 'Day'),
                      JvdmSegmentedOption(value: 'week', label: 'Week'),
                      JvdmSegmentedOption(value: 'month', label: 'Month'),
                    ],
                  ),
                  SizedBox(height: tokens.spacing(4)),
                  JvdmTabs(
                    value: 'open',
                    onValueChange: (String _) {},
                    items: <JvdmTab>[
                      JvdmTab(
                        value: 'open',
                        label: 'Open',
                        content: Text('Twelve lots open',
                            style: tokens.textStyle(JvdmTextStep.sm)),
                      ),
                      const JvdmTab(
                          value: 'closed',
                          label: 'Closed',
                          content: Text('None')),
                    ],
                  ),
                  SizedBox(height: tokens.spacing(4)),
                  JvdmAccordion(
                    items: <JvdmAccordionItem>[
                      JvdmAccordionItem(
                        id: 'a',
                        title: 'Terms',
                        defaultOpen: true,
                        content: Text(
                          'Payment is due within three days.',
                          style: tokens.textStyle(JvdmTextStep.sm),
                        ),
                      ),
                      const JvdmAccordionItem(
                        id: 'b',
                        title: 'Delivery',
                        content: Text('Collected in person.'),
                      ),
                    ],
                  ),
                  SizedBox(height: tokens.spacing(4)),
                  JvdmPagination(page: 2, pages: 5, onPageChange: (int _) {}),
                  SizedBox(height: tokens.spacing(4)),
                  SizedBox(
                    width: tokens.spacing(40),
                    child: const JvdmThumb(
                        alt: 'A lot', fallback: Text('No photo')),
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
  group('Pagination', () {
    test('says four things on its own, one of them with the page number', () {
      expect(JvdmPaginationLocales.label, 'Pagination');
      expect(JvdmPaginationLocales.previous, 'Previous');
      expect(JvdmPaginationLocales.next, 'Next');
      expect(JvdmPaginationLocales.page(3), 'Page 3');
    });

    test('reads the number the page string is given', () {
      expect(JvdmPaginationLocales.page(1), 'Page 1');
      expect(JvdmPaginationLocales.page(42), 'Page 42');
      expect(
          JvdmPaginationLocales.page(1), isNot(JvdmPaginationLocales.page(2)));
    });

    test('a caller can replace it with one of its own', () {
      final JvdmPagination subject = JvdmPagination(
        page: 1,
        pages: 3,
        onPageChange: (int _) {},
        pageLabel: (int page) => 'Página $page',
      );
      expect(subject.pageLabel(7), 'Página 7');
    });

    test('clamps the page into the range', () {
      expect(jvdmClampPage(0, 5), 1);
      expect(jvdmClampPage(3, 5), 3);
      expect(jvdmClampPage(9, 5), 5);
      expect(jvdmClampPage(1, 0), 1);
    });
  });

  group('Accordion', () {
    test('opens and closes a row', () {
      expect(jvdmToggledAccordion(<String>[], 'a', exclusive: false),
          <String>['a']);
      expect(jvdmToggledAccordion(<String>['a'], 'a', exclusive: false),
          <String>[]);
    });

    test('keeps the others open unless it is exclusive', () {
      expect(
        jvdmToggledAccordion(<String>['a'], 'b', exclusive: false),
        <String>['a', 'b'],
      );
      expect(jvdmToggledAccordion(<String>['a'], 'b', exclusive: true),
          <String>['b']);
      expect(jvdmToggledAccordion(<String>['a', 'b'], 'a', exclusive: true),
          <String>['b']);
    });
  });

  group('Tabs and Thumb', () {
    test('tabs say their own label', () {
      expect(JvdmTabsLocales.label, 'Tabs');
    });

    test('a thumb keeps the 4:3 frame the web uses', () {
      expect(jvdmThumbRatio, 4 / 3);
    });
  });

  testWidgets('matches the light golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 640));
    await tester.pumpWidget(_gallery(Brightness.light));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-five-light.png'),
    );
  });

  testWidgets('matches the dark golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(440, 640));
    await tester.pumpWidget(_gallery(Brightness.dark));
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/wave-five-dark.png'),
    );
  });
}
