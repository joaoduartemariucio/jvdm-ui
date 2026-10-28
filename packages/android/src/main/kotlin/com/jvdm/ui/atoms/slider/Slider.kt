package com.jvdm.ui.atoms.slider

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken

public object SliderStyle {
    public const val TRACK: Float = 4f
    public const val THUMB: Float = 16f

    public fun ratio(
        value: Float,
        min: Float,
        max: Float,
    ): Float {
        if (max <= min) {
            return 0f
        }
        return ((value - min) / (max - min)).coerceIn(0f, 1f)
    }
}

@Composable
public fun JvdmSlider(
    value: Float,
    modifier: Modifier = Modifier,
    min: Float = 0f,
    max: Float = 100f,
    enabled: Boolean = true,
) {
    val scales = JvdmTokensAccess.scales
    val ratio = SliderStyle.ratio(value, min, max)

    BoxWithConstraints(
        modifier =
            modifier
                .alpha(if (enabled) 1f else 0.5f)
                .fillMaxWidth()
                .height(scales.spacing(6f).dp),
        contentAlignment = Alignment.CenterStart,
    ) {
        val width = maxWidth

        Box(
            modifier =
                Modifier
                    .fillMaxWidth()
                    .height(SliderStyle.TRACK.dp)
                    .clip(CircleShape)
                    .background(JvdmTokensAccess.color(JvdmColorToken.RAISED)),
        )
        Box(
            modifier =
                Modifier
                    .size(width = width * ratio, height = SliderStyle.TRACK.dp)
                    .clip(CircleShape)
                    .background(JvdmTokensAccess.color(JvdmColorToken.ACCENT)),
        )
        Box(
            modifier =
                Modifier
                    .offset(x = width * ratio - (SliderStyle.THUMB / 2).dp)
                    .size(SliderStyle.THUMB.dp)
                    .clip(CircleShape)
                    .background(JvdmTokensAccess.color(JvdmColorToken.ACCENT)),
        )
    }
}
