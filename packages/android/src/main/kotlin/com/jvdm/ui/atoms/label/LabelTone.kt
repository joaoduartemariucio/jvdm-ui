package com.jvdm.ui.atoms.label

import com.jvdm.ui.tokens.JvdmColorToken

public enum class LabelTone(
    public val token: String,
    public val color: JvdmColorToken,
) {
    MUTED("muted", JvdmColorToken.INK_MUTED),
    DIM("dim", JvdmColorToken.INK_DIM),
    ACCENT("accent", JvdmColorToken.ACCENT_INK),
}
