package com.jvdm.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmTrackingStep
import com.jvdm.ui.tokens.JvdmWeightStep

public val LocalJvdmScales: androidx.compose.runtime.ProvidableCompositionLocal<JvdmScales> =
    staticCompositionLocalOf { JvdmScales.light }

public object JvdmTokensAccess {
    public val scales: JvdmScales
        @Composable @ReadOnlyComposable get() = LocalJvdmScales.current

    @Composable
    @ReadOnlyComposable
    public fun color(token: JvdmColorToken): Color = Color(scales.argb(token))

    @Composable
    @ReadOnlyComposable
    public fun radius(step: JvdmRadiusStep): Dp = scales.radius(step).dp

    @Composable
    @ReadOnlyComposable
    public fun spacing(steps: Float): Dp = scales.spacing(steps).dp

    @Composable
    @ReadOnlyComposable
    public fun fontSize(step: JvdmTextStep): TextUnit = scales.fontSize(step).sp

    @Composable
    @ReadOnlyComposable
    public fun weight(step: JvdmWeightStep): FontWeight = FontWeight(scales.weight(step))

    @Composable
    @ReadOnlyComposable
    public fun textStyle(
        step: JvdmTextStep,
        weight: JvdmWeightStep = JvdmWeightStep.NORMAL,
        tracking: JvdmTrackingStep? = null,
    ): TextStyle =
        TextStyle(
            fontSize = fontSize(step),
            lineHeight = scales.lineHeight(step).sp,
            fontWeight = weight(weight),
            letterSpacing = tracking?.let { scales.letterSpacing(it, step).sp } ?: TextUnit.Unspecified,
        )
}

private fun argbColor(scales: JvdmScales, token: JvdmColorToken): Color =
    Color(scales.argb(token))

@Composable
public fun JvdmTheme(
    dark: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    val scales = if (dark) JvdmScales.dark else JvdmScales.light

    val colors =
        if (dark) {
            darkColorScheme(
                primary = argbColor(scales, JvdmColorToken.ACCENT),
                onPrimary = argbColor(scales, JvdmColorToken.ON_ACCENT),
                secondary = argbColor(scales, JvdmColorToken.ACCENT_SOFT),
                onSecondary = argbColor(scales, JvdmColorToken.ACCENT_INK),
                error = argbColor(scales, JvdmColorToken.DANGER),
                background = argbColor(scales, JvdmColorToken.APP),
                onBackground = argbColor(scales, JvdmColorToken.INK),
                surface = argbColor(scales, JvdmColorToken.SURFACE),
                onSurface = argbColor(scales, JvdmColorToken.INK),
            )
        } else {
            lightColorScheme(
                primary = argbColor(scales, JvdmColorToken.ACCENT),
                onPrimary = argbColor(scales, JvdmColorToken.ON_ACCENT),
                secondary = argbColor(scales, JvdmColorToken.ACCENT_SOFT),
                onSecondary = argbColor(scales, JvdmColorToken.ACCENT_INK),
                error = argbColor(scales, JvdmColorToken.DANGER),
                background = argbColor(scales, JvdmColorToken.APP),
                onBackground = argbColor(scales, JvdmColorToken.INK),
                surface = argbColor(scales, JvdmColorToken.SURFACE),
                onSurface = argbColor(scales, JvdmColorToken.INK),
            )
        }

    CompositionLocalProvider(LocalJvdmScales provides scales) {
        MaterialTheme(colorScheme = colors, typography = Typography(), content = content)
    }
}
