package com.jvdm.ui.atoms.button

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.LocalTextStyle
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmRadiusStep

@Composable
public fun JvdmButton(
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.SECONDARY,
    size: ButtonSize = ButtonSize.MD,
    enabled: Boolean = true,
    onClick: () -> Unit = {},
    content: @Composable RowScope.() -> Unit,
) {
    val scales = JvdmTokensAccess.scales
    val shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp)
    val square = size.square

    val shaped =
        modifier
            .alpha(if (enabled) 1f else 0.5f)
            .clip(shape)
            .background(
                variant.background?.let { JvdmTokensAccess.color(it) } ?: Color.Transparent,
            ).let { base ->
                variant.border?.let {
                    base.border(BorderStroke(1.dp, JvdmTokensAccess.color(it)), shape)
                } ?: base
            }.clickable(enabled = enabled, onClick = onClick)
            .let { base -> if (square == null) base else base.size(square.dp) }
            .padding(
                horizontal = scales.spacing(size.horizontal).dp,
                vertical = scales.spacing(size.vertical).dp,
            )

    Row(
        modifier = shaped,
        horizontalArrangement =
            Arrangement.spacedBy(
                scales.spacing(2f).dp,
                Alignment.CenterHorizontally,
            ),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        CompositionLocalProvider(
            LocalContentColor provides JvdmTokensAccess.color(variant.foreground),
            LocalTextStyle provides JvdmTokensAccess.textStyle(size.text, weight = variant.weight),
            content = { content() },
        )
    }
}
