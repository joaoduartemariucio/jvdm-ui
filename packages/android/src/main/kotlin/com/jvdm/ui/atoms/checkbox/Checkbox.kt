package com.jvdm.ui.atoms.checkbox

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.icon.JvdmCheckIcon
import com.jvdm.ui.atoms.icon.JvdmIcon
import com.jvdm.ui.theme.JvdmIconSize
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep

@Composable
public fun JvdmCheckbox(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    enabled: Boolean = true,
) {
    val scales = JvdmTokensAccess.scales
    val box = scales.spacing(ChoiceStyle.BOX).dp
    val shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.XS).dp)

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
                    .size(box)
                    .clip(shape)
                    .background(JvdmTokensAccess.color(ChoiceStyle.fill(checked)))
                    .border(
                        BorderStroke(1.dp, JvdmTokensAccess.color(ChoiceStyle.border(checked))),
                        shape,
                    ),
            contentAlignment = Alignment.Center,
        ) {
            if (checked) {
                JvdmIcon(
                    JvdmCheckIcon,
                    size = JvdmIconSize.SM,
                    tint = JvdmTokensAccess.color(JvdmColorToken.ON_ACCENT),
                )
            }
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
