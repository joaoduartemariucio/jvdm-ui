package com.jvdm.ui.theme

import com.jvdm.ui.tokens.JvdmColorPair
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmColorValue
import com.jvdm.ui.tokens.JvdmDurationStep
import com.jvdm.ui.tokens.JvdmEaseStep
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmTokens
import com.jvdm.ui.tokens.JvdmTrackingStep
import com.jvdm.ui.tokens.JvdmWeightStep

public class JvdmScales(public val dark: Boolean) {
    public fun value(token: JvdmColorToken): JvdmColorValue {
        val pair: JvdmColorPair = requireNotNull(JvdmTokens.colors[token]) { token.token }
        return if (dark) pair.dark else pair.light
    }

    public fun argb(token: JvdmColorToken): Long = value(token).argb

    public fun radius(step: JvdmRadiusStep): Float = requireNotNull(JvdmTokens.radius[step])

    public fun spacing(steps: Float): Float = JvdmTokens.spacing * steps

    public fun fontSize(step: JvdmTextStep): Float = requireNotNull(JvdmTokens.text[step]).size

    public fun lineHeight(step: JvdmTextStep): Float =
        requireNotNull(JvdmTokens.text[step]).let { it.size * it.lineHeight }

    public fun letterSpacing(step: JvdmTrackingStep, textStep: JvdmTextStep): Float =
        requireNotNull(JvdmTokens.tracking[step]) * fontSize(textStep)

    public fun weight(step: JvdmWeightStep): Int = requireNotNull(JvdmTokens.weight[step])

    public fun durationMillis(step: JvdmDurationStep): Int =
        requireNotNull(JvdmTokens.duration[step])

    public fun bezier(step: JvdmEaseStep): List<Float> =
        requireNotNull(JvdmTokens.ease[step]).let { listOf(it.x1, it.y1, it.x2, it.y2) }

    public companion object {
        public val light: JvdmScales = JvdmScales(dark = false)
        public val dark: JvdmScales = JvdmScales(dark = true)
    }
}
