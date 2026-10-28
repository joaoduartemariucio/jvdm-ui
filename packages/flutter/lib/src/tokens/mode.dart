enum JvdmThemeMode {
  light('light'),
  dark('dark'),
  system('system');

  const JvdmThemeMode(this.value);

  final String value;
}

abstract class JvdmThemeStorage {
  Future<String?> read(String key);

  Future<void> write(String key, String value);

  Future<void> remove(String key);
}

class JvdmThemeStore {
  const JvdmThemeStore(this.storage);

  static const String storageKey = 'jvdm-ui.theme';

  final JvdmThemeStorage storage;

  Future<JvdmThemeMode> read() async {
    final String? stored = await storage.read(storageKey);
    switch (stored) {
      case 'light':
        return JvdmThemeMode.light;
      case 'dark':
        return JvdmThemeMode.dark;
      default:
        return JvdmThemeMode.system;
    }
  }

  Future<void> write(JvdmThemeMode mode) async {
    if (mode == JvdmThemeMode.system) {
      await storage.remove(storageKey);
      return;
    }
    await storage.write(storageKey, mode.value);
  }
}
