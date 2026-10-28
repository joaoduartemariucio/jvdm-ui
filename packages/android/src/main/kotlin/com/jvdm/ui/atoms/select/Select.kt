package com.jvdm.ui.atoms.select

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.icon.JvdmChevronIcon
import com.jvdm.ui.atoms.icon.JvdmIcon
import com.jvdm.ui.atoms.input.ControlSize
import com.jvdm.ui.theme.JvdmIconSize
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep

public data class JvdmSelectOption(
    public val value: String,
    public val label: String,
)

@Composable
public fun JvdmSelect(
    options: List<JvdmSelectOption>,
    modifier: Modifier = Modifier,
    value: String? = null,
    placeholder: String? = null,
    size: ControlSize = ControlSize.MD,
    invalid: Boolean = false,
    onClick: () -> Unit = {},
) {
    val scales = JvdmTokensAccess.scales
    val shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp)
    val border = if (invalid) JvdmColorToken.DANGER else JvdmColorToken.LINE_STRONG
    val selected = options.firstOrNull { it.value == value }

    Row(
        modifier =
            modifier
                .fillMaxWidth()
                .clip(shape)
                .background(JvdmTokensAccess.color(JvdmColorToken.FIELD))
                .border(BorderStroke(1.dp, JvdmTokensAccess.color(border)), shape)
                .clickable(onClick = onClick)
                .padding(
                    horizontal = scales.spacing(size.horizontal).dp,
                    vertical = scales.spacing(size.vertical).dp,
                ),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            text = selected?.label ?: placeholder.orEmpty(),
            color =
                JvdmTokensAccess.color(
                    if (selected == null) JvdmColorToken.INK_DIM else JvdmColorToken.INK,
                ),
            style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
        )
        JvdmIcon(
            JvdmChevronIcon,
            size = JvdmIconSize.SM,
            tint = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
        )
    }
}
