package com.jvdm.ui.atoms.switch

import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmDurationStep
import com.jvdm.ui.tokens.JvdmEaseStep
import com.jvdm.ui.tokens.JvdmTextStep

@Composable
public fun JvdmSwitch(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    enabled: Boolean = true,
) {
    val scales = JvdmTokensAccess.scales
    val bezier = scales.bezier(JvdmEaseStep.OUT)

    val offset by animateDpAsState(
        targetValue =
            if (checked) {
                (SwitchStyle.INSET + SwitchStyle.travel).dp
            } else {
                SwitchStyle.INSET.dp
            },
        animationSpec =
            tween(
                durationMillis = scales.durationMillis(JvdmDurationStep.FAST),
                easing = CubicBezierEasing(bezier[0], bezier[1], bezier[2], bezier[3]),
            ),
        label = "thumb",
    )

    Row(
        modifier =
            modifier
                .alpha(if (enabled) 1f else 0.5f)
                .defaultMinSize(minHeight = scales.spacing(10f).dp)
                .toggleable(value = checked, enabled = enabled, onValueChange = onCheckedChange),
        horizontalArrangement = Arrangement.spacedBy(scales.spacing(3f).dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(
            modifier =
                Modifier
                    .size(SwitchStyle.TRACK_WIDTH.dp, SwitchStyle.TRACK_HEIGHT.dp)
                    .clip(CircleShape)
                    .background(JvdmTokensAccess.color(SwitchStyle.track(checked))),
            contentAlignment = Alignment.CenterStart,
        ) {
            Box(
                modifier =
                    Modifier
                        .offset(x = offset)
                        .size(SwitchStyle.THUMB.dp)
                        .clip(CircleShape)
                        .background(JvdmTokensAccess.color(SwitchStyle.thumb(checked))),
            )
        }
        if (label != null) {
            Text(
                text = label,
                color = JvdmTokensAccess.color(JvdmColorToken.INK_SOFT),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
            )
        }
    }
}
