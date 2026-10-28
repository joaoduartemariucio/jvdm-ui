package com.jvdm.ui.atoms.spinner

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmIconSize
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken

public const val SPINNER_STROKE: Float = 2.4f

public const val SPINNER_PERIOD_MILLIS: Int = 1000

@Composable
public fun JvdmSpinner(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
    label: String = SpinnerLocales.LABEL,
) {
    val color = JvdmTokensAccess.color(JvdmColorToken.INK)
    val transition = rememberInfiniteTransition(label = "spinner")
    val turn by transition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec =
            infiniteRepeatable(
                animation = tween(durationMillis = SPINNER_PERIOD_MILLIS, easing = LinearEasing),
                repeatMode = RepeatMode.Restart,
            ),
        label = "turn",
    )

    Canvas(
        modifier =
            modifier
                .size(size.points.dp)
                .semantics { contentDescription = label },
    ) {
        val scale = this.size.minDimension / 24f
        val radius = 9f * scale
        val stroke = Stroke(width = SPINNER_STROKE * scale, cap = StrokeCap.Round)
        val box = Size(radius * 2, radius * 2)
        val corner = Offset(center.x - radius, center.y - radius)

        drawCircle(color = color, radius = radius, alpha = 0.2f, style = stroke)
        drawArc(
            color = color,
            startAngle = turn - 90f,
            sweepAngle = 90f,
            useCenter = false,
            topLeft = corner,
            size = box,
            style = stroke,
        )
    }
}
