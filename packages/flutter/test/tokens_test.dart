import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jvdm_ui/jvdm_ui.dart';

void main() {
  group('the tokens', () {
    test('cover every color in both brightnesses', () {
      const JvdmTokens light = JvdmTokens(brightness: Brightness.light);
      const JvdmTokens dark = JvdmTokens(brightness: Brightness.dark);

      for (final JvdmColorToken token in JvdmColorToken.values) {
        expect(jvdmColors[token], isNotNull);
        expect(light.color(token), isNot(equals(dark.color(token))));
      }
      expect(JvdmColorToken.values.length, 24);
    });

    test('keep every scale complete', () {
      expect(jvdmText.length, JvdmTextStep.values.length);
      expect(jvdmRadius.length, JvdmRadiusStep.values.length);
      expect(jvdmEase.length, JvdmEaseStep.values.length);
      expect(jvdmDuration.length, JvdmDurationStep.values.length);
      expect(jvdmShadow.length, JvdmShadowStep.values.length);
      expect(jvdmTracking.length, JvdmTrackingStep.values.length);
      expect(jvdmWeight.length, JvdmWeightStep.values.length);
    });

    test('carry the contract name as the enum token', () {
      expect(JvdmColorToken.lineStrong.token, 'line-strong');
      expect(JvdmColorToken.onAccent.token, 'on-accent');
      expect(JvdmTextStep.xxs.token, '2xs');
      expect(JvdmTextStep.xxl.token, '2xl');
      expect(JvdmEaseStep.inOut.token, 'in-out');
    });

    test('keep the spacing scale on a 4px base', () {
      const JvdmTokens tokens = JvdmTokens(brightness: Brightness.light);
      expect(tokens.spacing(1), 4.0);
      expect(tokens.spacing(0.5), 2.0);
      expect(tokens.spacing(2), 8.0);
    });

    test('build both ThemeData variants from the palette', () {
      final ThemeData light = jvdmLightTheme();
      final ThemeData dark = jvdmDarkTheme();

      expect(light.extension<JvdmTokens>(), isNotNull);
      expect(dark.extension<JvdmTokens>()!.isDark, isTrue);
      expect(
        light.scaffoldBackgroundColor,
        isNot(equals(dark.scaffoldBackgroundColor)),
      );
    });
  });

  group('the theme mode store', () {
    test('uses the key the web writes', () {
      expect(JvdmThemeStore.storageKey, 'jvdm-ui.theme');
    });

    test('reads nothing stored as following the system', () async {
      final JvdmThemeStore store = JvdmThemeStore(_Memory());
      expect(await store.read(), JvdmThemeMode.system);
    });

    test('round-trips light and dark', () async {
      final JvdmThemeStore store = JvdmThemeStore(_Memory());
      for (final JvdmThemeMode mode in <JvdmThemeMode>[
        JvdmThemeMode.light,
        JvdmThemeMode.dark,
      ]) {
        await store.write(mode);
        expect(await store.read(), mode);
      }
    });

    test('clears the key for system rather than storing a third value',
        () async {
      final _Memory storage = _Memory();
      final JvdmThemeStore store = JvdmThemeStore(storage);
      await store.write(JvdmThemeMode.dark);
      await store.write(JvdmThemeMode.system);
      expect(storage.entries.containsKey(JvdmThemeStore.storageKey), isFalse);
      expect(await store.read(), JvdmThemeMode.system);
    });

    test('reads a value the web never writes as system', () async {
      final _Memory storage = _Memory();
      await storage.write(JvdmThemeStore.storageKey, 'sepia');
      expect(await JvdmThemeStore(storage).read(), JvdmThemeMode.system);
    });
  });
}

class _Memory implements JvdmThemeStorage {
  final Map<String, String> entries = <String, String>{};

  @override
  Future<String?> read(String key) async => entries[key];

  @override
  Future<void> write(String key, String value) async => entries[key] = value;

  @override
  Future<void> remove(String key) async => entries.remove(key);
}
