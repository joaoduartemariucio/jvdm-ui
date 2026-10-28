package com.jvdm.ui.atoms.badge

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.LocalTextStyle
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmBadge(
    modifier: Modifier = Modifier,
    tone: BadgeTone = BadgeTone.NEUTRAL,
    content: @Composable RowScope.() -> Unit,
) {
    val scales = JvdmTokensAccess.scales
    val style = BadgeStyle.resolve(scales, tone)

    Row(
        modifier =
            modifier
                .clip(RoundedCornerShape(style.radius.dp))
                .background(JvdmTokensAccess.color(tone.background))
                .padding(
                    horizontal = style.horizontalPadding.dp,
                    vertical = style.verticalPadding.dp,
                ),
        horizontalArrangement = Arrangement.spacedBy(style.gap.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        CompositionLocalProvider(
            LocalContentColor provides JvdmTokensAccess.color(tone.foreground),
            LocalTextStyle provides
                JvdmTokensAccess.textStyle(JvdmTextStep.XXS, weight = JvdmWeightStep.MEDIUM),
            content = { content() },
        )
    }
}
