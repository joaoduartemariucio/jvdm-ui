package com.jvdm.ui.atoms.segmented

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

public data class SegmentedOption(
    public val value: String,
    public val label: String,
    public val disabled: Boolean = false,
)

@Composable
public fun JvdmSegmented(
    options: List<SegmentedOption>,
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
) {
    val scales = JvdmTokensAccess.scales
    val described = label

    Row(
        modifier =
            modifier
                .clip(RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp))
                .background(JvdmTokensAccess.color(JvdmColorToken.RAISED))
                .padding(scales.spacing(0.5f).dp)
                .then(
                    if (described == null) {
                        Modifier
                    } else {
                        Modifier.semantics { contentDescription = described }
                    },
                ),
        horizontalArrangement = Arrangement.spacedBy(scales.spacing(0.5f).dp),
    ) {
        for (option in options) {
            val selected = option.value == value

            Box(
                modifier =
                    Modifier
                        .weight(1f)
                        .defaultMinSize(minHeight = scales.spacing(9f).dp)
                        .clip(RoundedCornerShape(scales.radius(JvdmRadiusStep.SM).dp))
                        .background(
                            if (selected) {
                                JvdmTokensAccess.color(JvdmColorToken.SURFACE)
                            } else {
                                Color.Transparent
                            },
                        ).selectable(
                            selected = selected,
                            enabled = !option.disabled,
                            onClick = { onValueChange(option.value) },
                        ),
                contentAlignment = Alignment.Center,
            ) {
                Text(
                    text = option.label,
                    color =
                        JvdmTokensAccess.color(
                            if (selected) JvdmColorToken.INK else JvdmColorToken.INK_MUTED,
                        ),
                    style =
                        JvdmTokensAccess.textStyle(
                            JvdmTextStep.SM,
                            weight = if (selected) JvdmWeightStep.MEDIUM else JvdmWeightStep.NORMAL,
                        ),
                )
            }
        }
    }
}
