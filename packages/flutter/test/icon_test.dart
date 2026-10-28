import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jvdm_ui/jvdm_ui.dart';

const List<JvdmIcon> allIcons = <JvdmIcon>[
  JvdmAccessIcon(),
  JvdmAlertIcon(),
  JvdmBackIcon(),
  JvdmBoxIcon(),
  JvdmBuildingIcon(),
  JvdmCalendarIcon(),
  JvdmCarIcon(),
  JvdmCheckIcon(),
  JvdmChevronIcon(),
  JvdmCloseIcon(),
  JvdmCopyIcon(),
  JvdmDashboardIcon(),
  JvdmEyeIcon(),
  JvdmEyeOffIcon(),
  JvdmFaceIcon(),
  JvdmFactoryIcon(),
  JvdmFunnelIcon(),
  JvdmGavelIcon(),
  JvdmInstagramIcon(),
  JvdmLogoutIcon(),
  JvdmMailIcon(),
  JvdmMoonIcon(),
  JvdmPencilIcon(),
  JvdmPhoneIcon(),
  JvdmPlansIcon(),
  JvdmPlusIcon(),
  JvdmSearchIcon(),
  JvdmShieldCheckIcon(),
  JvdmStaffIcon(),
  JvdmStudentsIcon(),
  JvdmSunIcon(),
  JvdmTrashIcon(),
  JvdmWhatsappIcon(),
];

Widget _gallery() {
  return MaterialApp(
    debugShowCheckedModeBanner: false,
    theme: jvdmLightTheme(),
    home: Builder(
      builder: (BuildContext context) {
        final JvdmTokens tokens = JvdmTokens.of(context);
        return Scaffold(
          body: Padding(
            padding: EdgeInsets.all(tokens.spacing(4)),
            child: Wrap(
              spacing: tokens.spacing(4),
              runSpacing: tokens.spacing(4),
              children: <Widget>[
                for (final JvdmIcon icon in allIcons)
                  icon,
              ],
            ),
          ),
        );
      },
    ),
  );
}

void main() {
  testWidgets('every icon has a name and a traceable path', (
    WidgetTester tester,
  ) async {
    expect(allIcons.length, 33);

    final Set<String> names = <String>{};
    for (final JvdmIcon icon in allIcons) {
      expect(names.add(icon.name), isTrue, reason: 'duplicate ${icon.name}');
      final Path path = icon.trace();
      expect(path.computeMetrics().isNotEmpty, isTrue, reason: icon.name);
    }
  });

  testWidgets('every icon draws inside the viewBox', (
    WidgetTester tester,
  ) async {
    for (final JvdmIcon icon in allIcons) {
      final Rect bounds = icon.trace().getBounds();
      expect(bounds.left, greaterThanOrEqualTo(-0.5), reason: icon.name);
      expect(bounds.top, greaterThanOrEqualTo(-0.5), reason: icon.name);
      expect(bounds.right, lessThanOrEqualTo(jvdmIconViewBox + 0.5), reason: icon.name);
      expect(bounds.bottom, lessThanOrEqualTo(jvdmIconViewBox + 0.5), reason: icon.name);
    }
  });

  testWidgets('every size is on the icon scale', (WidgetTester tester) async {
    expect(
      JvdmIconSize.values.map((JvdmIconSize size) => size.points).toList(),
      <double>[12, 16, 20, 24, 32],
    );
    expect(
      JvdmIconSize.values.map((JvdmIconSize size) => size.token).toList(),
      <String>['sm', 'md', 'lg', 'xl', '2xl'],
    );
  });

  testWidgets('matches the icon golden', (WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(480, 240));
    await tester.pumpWidget(_gallery());
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(MaterialApp),
      matchesGoldenFile('goldens/icons.png'),
    );
  });
}
