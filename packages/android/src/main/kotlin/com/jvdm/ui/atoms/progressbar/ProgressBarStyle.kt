package com.jvdm.ui.atoms.progressbar

import com.jvdm.ui.tokens.JvdmColorToken

public enum class ProgressTone(
    public val token: String,
    public val fill: JvdmColorToken,
) {
    ACCENT("accent", JvdmColorToken.ACCENT),
    OK("ok", JvdmColorToken.OK),
    WARN("warn", JvdmColorToken.WARN),
    DANGER("danger", JvdmColorToken.DANGER),
}

public enum class ProgressSize(
    public val token: String,
    public val steps: Float,
) {
    MD("md", 2f),
    XS("xs", 1f),
    ;

    public companion object {
        public fun ratio(value: Float): Float = value.coerceIn(0f, 1f)
    }
}
