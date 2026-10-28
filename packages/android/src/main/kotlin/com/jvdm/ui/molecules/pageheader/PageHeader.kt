package com.jvdm.ui.molecules.pageheader

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmPageHeader(
    title: String,
    modifier: Modifier = Modifier,
    subtitle: String? = null,
    actions: @Composable (RowScope.() -> Unit)? = null,
) {
    val scales = JvdmTokensAccess.scales

    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(scales.spacing(4f).dp),
        verticalAlignment = Alignment.Bottom,
    ) {
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(scales.spacing(1f).dp),
        ) {
            Text(
                text = title,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                color = JvdmTokensAccess.color(JvdmColorToken.INK),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.XL, weight = JvdmWeightStep.BOLD),
            )
            if (subtitle != null) {
                Text(
                    text = subtitle,
                    color = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
                    style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
                )
            }
        }
        if (actions != null) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(scales.spacing(3f).dp),
                verticalAlignment = Alignment.CenterVertically,
                content = actions,
            )
        }
    }
}
