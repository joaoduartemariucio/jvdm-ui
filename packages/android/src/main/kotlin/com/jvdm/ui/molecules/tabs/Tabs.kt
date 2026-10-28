package com.jvdm.ui.molecules.tabs

import androidx.compose.foundation.ScrollState
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

public data class Tab(
    public val value: String,
    public val label: String,
    public val disabled: Boolean = false,
    public val content: @Composable () -> Unit,
)

@Composable
public fun JvdmTabs(
    items: List<Tab>,
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    label: String = TabsLocales.LABEL,
) {
    val scales = JvdmTokensAccess.scales
    val active = items.firstOrNull { it.value == value } ?: items.firstOrNull()
    val scroll: ScrollState = rememberScrollState()
    val line = JvdmTokensAccess.color(JvdmColorToken.LINE)
    val accent = JvdmTokensAccess.color(JvdmColorToken.ACCENT)
    val underline = scales.spacing(0.5f).dp

    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(scales.spacing(4f).dp),
    ) {
        Row(
            modifier =
                Modifier
                    .fillMaxWidth()
                    .horizontalScroll(scroll)
                    .semantics { contentDescription = label }
                    .drawBehind {
                        drawLine(
                            color = line,
                            start = Offset(0f, size.height),
                            end = Offset(size.width, size.height),
                            strokeWidth = 1.dp.toPx(),
                        )
                    },
            horizontalArrangement = Arrangement.spacedBy(scales.spacing(1f).dp),
        ) {
            for (item in items) {
                val selected = item.value == active?.value

                Box(
                    modifier =
                        Modifier
                            .defaultMinSize(minHeight = scales.spacing(10f).dp)
                            .clickable(enabled = !item.disabled) { onValueChange(item.value) }
                            .drawBehind {
                                if (!selected) {
                                    return@drawBehind
                                }
                                val thickness = underline.toPx()
                                drawLine(
                                    color = accent,
                                    start = Offset(0f, size.height - thickness / 2),
                                    end = Offset(size.width, size.height - thickness / 2),
                                    strokeWidth = thickness,
                                )
                            }.padding(horizontal = scales.spacing(3f).dp)
                            .semantics { this.selected = selected },
                    contentAlignment = Alignment.Center,
                ) {
                    Text(
                        text = item.label,
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

        active?.content?.invoke()
    }
}
