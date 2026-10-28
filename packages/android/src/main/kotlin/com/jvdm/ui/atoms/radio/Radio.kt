package com.jvdm.ui.atoms.radio

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.checkbox.ChoiceStyle
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep

@Composable
public fun JvdmRadio(
    selected: Boolean,
    onSelect: () -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    enabled: Boolean = true,
) {
    val scales = JvdmTokensAccess.scales

    Row(
        modifier =
            modifier
                .alpha(if (enabled) 1f else 0.5f)
                .defaultMinSize(minHeight = scales.spacing(10f).dp)
                .selectable(selected = selected, enabled = enabled, onClick = onSelect),
        horizontalArrangement = Arrangement.spacedBy(scales.spacing(3f).dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(
            modifier =
                Modifier
                    .size(scales.spacing(ChoiceStyle.BOX).dp)
                    .clip(CircleShape)
                    .background(JvdmTokensAccess.color(JvdmColorToken.FIELD))
                    .border(
                        BorderStroke(1.dp, JvdmTokensAccess.color(ChoiceStyle.border(selected))),
                        CircleShape,
                    ),
            contentAlignment = Alignment.Center,
        ) {
            if (selected) {
                Box(
                    modifier =
                        Modifier
                            .size(scales.spacing(ChoiceStyle.DOT).dp)
                            .clip(CircleShape)
                            .background(JvdmTokensAccess.color(JvdmColorToken.ACCENT)),
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
