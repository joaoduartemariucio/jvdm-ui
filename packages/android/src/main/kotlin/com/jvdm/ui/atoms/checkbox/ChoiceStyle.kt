package com.jvdm.ui.atoms.checkbox

import com.jvdm.ui.tokens.JvdmColorToken

public object ChoiceStyle {
    public const val BOX: Float = 5f
    public const val DOT: Float = 2.5f

    public fun fill(selected: Boolean): JvdmColorToken = if (selected) JvdmColorToken.ACCENT else JvdmColorToken.FIELD

    public fun border(selected: Boolean): JvdmColorToken =
        if (selected) JvdmColorToken.ACCENT else JvdmColorToken.LINE_STRONG
}
