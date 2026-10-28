package com.jvdm.ui.molecules.banner

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
internal fun noticeShape(): Shape = RoundedCornerShape(JvdmTokensAccess.scales.radius(JvdmRadiusStep.MD).dp)

@Composable
internal fun Modifier.notice(
    tone: NoticeTone,
    shape: Shape,
): Modifier {
    val scales = JvdmTokensAccess.scales

    return this
        .fillMaxWidth()
        .clip(shape)
        .background(JvdmTokensAccess.color(tone.background))
        .border(
            BorderStroke(
                1.dp,
                JvdmTokensAccess.color(tone.foreground).copy(alpha = NoticeTone.BORDER_OPACITY),
            ),
            shape,
        ).padding(
            horizontal = scales.spacing(4f).dp,
            vertical = scales.spacing(3f).dp,
        )
}

@Composable
public fun JvdmBanner(
    title: String,
    modifier: Modifier = Modifier,
    tone: NoticeTone = NoticeTone.INFO,
    body: String? = null,
    action: @Composable (() -> Unit)? = null,
) {
    val scales = JvdmTokensAccess.scales

    Row(
        modifier = modifier.notice(tone, noticeShape()),
        horizontalArrangement = Arrangement.spacedBy(scales.spacing(4f).dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(scales.spacing(1f).dp),
        ) {
            Text(
                text = title,
                color = JvdmTokensAccess.color(tone.foreground),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.SM, weight = JvdmWeightStep.MEDIUM),
            )
            if (body != null) {
                Text(
                    text = body,
                    modifier = Modifier.alpha(0.8f),
                    color = JvdmTokensAccess.color(tone.foreground),
                    style = JvdmTokensAccess.textStyle(JvdmTextStep.XS),
                )
            }
        }
        action?.invoke()
    }
}
