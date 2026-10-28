package com.jvdm.ui.molecules.banner

import com.jvdm.ui.tokens.JvdmColorToken

public enum class NoticeTone(
    public val token: String,
    public val foreground: JvdmColorToken,
    public val background: JvdmColorToken,
) {
    INFO("info", JvdmColorToken.INFO, JvdmColorToken.INFO_SOFT),
    OK("ok", JvdmColorToken.OK, JvdmColorToken.OK_SOFT),
    WARN("warn", JvdmColorToken.WARN, JvdmColorToken.WARN_SOFT),
    DANGER("danger", JvdmColorToken.DANGER, JvdmColorToken.DANGER_SOFT),
    ;

    public companion object {
        public const val BORDER_OPACITY: Float = 0.4f
    }
}
