package com.jvdm.ui.atoms.badge

import com.jvdm.ui.theme.JvdmScales
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

public enum class BadgeTone(
    public val background: JvdmColorToken,
    public val foreground: JvdmColorToken,
) {
    NEUTRAL(JvdmColorToken.RAISED, JvdmColorToken.INK_SOFT),
    ACCENT(JvdmColorToken.ACCENT_SOFT, JvdmColorToken.ACCENT_INK),
    OK(JvdmColorToken.OK_SOFT, JvdmColorToken.OK),
    WARN(JvdmColorToken.WARN_SOFT, JvdmColorToken.WARN),
    DANGER(JvdmColorToken.DANGER_SOFT, JvdmColorToken.DANGER),
    INFO(JvdmColorToken.INFO_SOFT, JvdmColorToken.INFO),
}

public data class BadgeStyle(
    public val background: Long,
    public val foreground: Long,
    public val radius: Float,
    public val horizontalPadding: Float,
    public val verticalPadding: Float,
    public val gap: Float,
    public val fontSize: Float,
    public val lineHeight: Float,
    public val weight: Int,
) {
    public companion object {
        public fun resolve(scales: JvdmScales, tone: BadgeTone): BadgeStyle =
            BadgeStyle(
                background = scales.argb(tone.background),
                foreground = scales.argb(tone.foreground),
                radius = scales.radius(JvdmRadiusStep.XS),
                horizontalPadding = scales.spacing(2f),
                verticalPadding = scales.spacing(0.5f),
                gap = scales.spacing(1f),
                fontSize = scales.fontSize(JvdmTextStep.XXS),
                lineHeight = scales.lineHeight(JvdmTextStep.XXS),
                weight = scales.weight(JvdmWeightStep.MEDIUM),
            )
    }
}
