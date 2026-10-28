package com.jvdm.ui.atoms.divider

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmTrackingStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmDivider(
    modifier: Modifier = Modifier,
    vertical: Boolean = false,
    label: String? = null,
) {
    val scales = JvdmTokensAccess.scales
    val line = JvdmTokensAccess.color(JvdmColorToken.LINE)

    if (vertical) {
        Box(modifier = modifier.width(1.dp).fillMaxHeight().background(line))
        return
    }

    if (label == null) {
        Box(modifier = modifier.height(1.dp).fillMaxWidth().background(line))
        return
    }

    Row(
        modifier = modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(scales.spacing(3f).dp),
    ) {
        Box(modifier = Modifier.weight(1f).height(1.dp).background(line))
        Text(
            text = label.uppercase(),
            color = JvdmTokensAccess.color(JvdmColorToken.INK_DIM),
            style =
                JvdmTokensAccess.textStyle(
                    JvdmTextStep.XXS,
                    weight = JvdmWeightStep.MEDIUM,
                    tracking = JvdmTrackingStep.CAPS,
                ),
        )
        Box(modifier = Modifier.weight(1f).height(1.dp).background(line))
    }
}
