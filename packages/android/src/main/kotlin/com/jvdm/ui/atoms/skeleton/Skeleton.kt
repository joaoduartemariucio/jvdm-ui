package com.jvdm.ui.atoms.skeleton

import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmDurationStep
import com.jvdm.ui.tokens.JvdmEaseStep
import com.jvdm.ui.tokens.JvdmRadiusStep

@Composable
public fun JvdmSkeleton(modifier: Modifier = Modifier) {
    val scales = JvdmTokensAccess.scales
    val bezier = scales.bezier(JvdmEaseStep.IN_OUT)

    val transition = rememberInfiniteTransition(label = "skeleton")
    val opacity by transition.animateFloat(
        initialValue = SkeletonOpacity.FROM,
        targetValue = SkeletonOpacity.TO,
        animationSpec =
            infiniteRepeatable(
                animation =
                    tween(
                        durationMillis = scales.durationMillis(JvdmDurationStep.SLOW),
                        easing = CubicBezierEasing(bezier[0], bezier[1], bezier[2], bezier[3]),
                    ),
                repeatMode = RepeatMode.Reverse,
            ),
        label = "opacity",
    )

    Box(
        modifier =
            modifier
                .clearAndSetSemantics { }
                .alpha(opacity)
                .background(
                    color = JvdmTokensAccess.color(JvdmColorToken.RAISED),
                    shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.SM).dp),
                ),
    )
}
