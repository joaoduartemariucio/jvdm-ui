package com.jvdm.ui.molecules.breadcrumb

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.icon.JvdmChevronIcon
import com.jvdm.ui.atoms.icon.JvdmIcon
import com.jvdm.ui.theme.JvdmIconSize
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

public data class Crumb(
    public val id: String,
    public val label: String,
    public val href: String? = null,
)

@Composable
public fun JvdmBreadcrumb(
    items: List<Crumb>,
    modifier: Modifier = Modifier,
    label: String = BreadcrumbLocales.LABEL,
) {
    val scales = JvdmTokensAccess.scales

    FlowRow(
        modifier = modifier.semantics { contentDescription = label },
        horizontalArrangement = Arrangement.spacedBy(scales.spacing(1f).dp),
        verticalArrangement = Arrangement.spacedBy(scales.spacing(1f).dp),
    ) {
        items.forEachIndexed { index, item ->
            val last = index == items.lastIndex

            Row(
                horizontalArrangement = Arrangement.spacedBy(scales.spacing(1f).dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                if (index > 0) {
                    JvdmIcon(
                        JvdmChevronIcon,
                        modifier = Modifier.rotate(-90f),
                        size = JvdmIconSize.SM,
                        tint = JvdmTokensAccess.color(JvdmColorToken.INK_DIM),
                    )
                }
                Text(
                    text = item.label,
                    color =
                        JvdmTokensAccess.color(
                            if (last) JvdmColorToken.INK else JvdmColorToken.INK_MUTED,
                        ),
                    style =
                        JvdmTokensAccess.textStyle(
                            JvdmTextStep.XS,
                            weight = if (last) JvdmWeightStep.MEDIUM else JvdmWeightStep.NORMAL,
                        ),
                )
            }
        }
    }
}
