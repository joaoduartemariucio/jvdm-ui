package com.jvdm.ui.atoms.switch

import com.jvdm.ui.tokens.JvdmColorToken

public object SwitchStyle {
    public const val TRACK_WIDTH: Float = 40f
    public const val TRACK_HEIGHT: Float = 24f
    public const val THUMB: Float = 16f
    public const val INSET: Float = 4f

    public val travel: Float
        get() = TRACK_WIDTH - THUMB - INSET * 2

    public fun track(checked: Boolean): JvdmColorToken = if (checked) JvdmColorToken.ACCENT else JvdmColorToken.RAISED

    public fun thumb(checked: Boolean): JvdmColorToken = if (checked) JvdmColorToken.ON_ACCENT else JvdmColorToken.INK
}
