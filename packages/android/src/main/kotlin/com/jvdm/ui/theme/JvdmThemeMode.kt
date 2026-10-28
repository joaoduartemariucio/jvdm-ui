package com.jvdm.ui.theme

public enum class JvdmThemeMode(
    public val value: String,
) {
    LIGHT("light"),
    DARK("dark"),
    SYSTEM("system"),
}

public interface JvdmThemeStorage {
    public fun read(key: String): String?

    public fun write(
        key: String,
        value: String,
    )

    public fun remove(key: String)
}

public class JvdmThemeStore(
    private val storage: JvdmThemeStorage,
) {
    public fun read(): JvdmThemeMode =
        when (storage.read(STORAGE_KEY)) {
            JvdmThemeMode.LIGHT.value -> JvdmThemeMode.LIGHT
            JvdmThemeMode.DARK.value -> JvdmThemeMode.DARK
            else -> JvdmThemeMode.SYSTEM
        }

    public fun write(mode: JvdmThemeMode) {
        if (mode == JvdmThemeMode.SYSTEM) {
            storage.remove(STORAGE_KEY)
            return
        }
        storage.write(STORAGE_KEY, mode.value)
    }

    public companion object {
        public const val STORAGE_KEY: String = "jvdm-ui.theme"
    }
}
