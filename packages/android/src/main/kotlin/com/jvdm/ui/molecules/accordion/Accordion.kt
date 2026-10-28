package com.jvdm.ui.molecules.accordion

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.icon.JvdmChevronIcon
import com.jvdm.ui.atoms.icon.JvdmIcon
import com.jvdm.ui.theme.JvdmIconSize
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep

public data class AccordionItem(
    public val id: String,
    public val title: String,
    public val defaultOpen: Boolean = false,
    public val content: @Composable () -> Unit,
)

@Composable
public fun JvdmAccordion(
    items: List<AccordionItem>,
    modifier: Modifier = Modifier,
    exclusive: Boolean = false,
) {
    val scales = JvdmTokensAccess.scales
    val shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp)
    val line = JvdmTokensAccess.color(JvdmColorToken.LINE)

    var open by remember(items) {
        mutableStateOf(items.filter { it.defaultOpen }.map { it.id })
    }

    Column(
        modifier =
            modifier
                .fillMaxWidth()
                .clip(shape)
                .background(JvdmTokensAccess.color(JvdmColorToken.SURFACE))
                .border(BorderStroke(1.dp, line), shape),
    ) {
        items.forEachIndexed { index, item ->
            val isOpen = open.contains(item.id)

            Column(
                modifier =
                    if (index == 0) {
                        Modifier
                    } else {
                        Modifier.drawBehind {
                            drawLine(
                                color = line,
                                start = Offset(0f, 0f),
                                end = Offset(size.width, 0f),
                                strokeWidth = 1.dp.toPx(),
                            )
                        }
                    },
            ) {
                Row(
                    modifier =
                        Modifier
                            .fillMaxWidth()
                            .defaultMinSize(minHeight = scales.spacing(12f).dp)
                            .clickable {
                                open = AccordionState.toggled(open, item.id, exclusive)
                            }.padding(horizontal = scales.spacing(4f).dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(
                        text = item.title,
                        color = JvdmTokensAccess.color(JvdmColorToken.INK),
                        style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
                    )
                    JvdmIcon(
                        JvdmChevronIcon,
                        modifier = Modifier.rotate(if (isOpen) -180f else 0f),
                        size = JvdmIconSize.MD,
                        tint = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
                    )
                }

                if (isOpen) {
                    Column(
                        modifier =
                            Modifier.padding(
                                start = scales.spacing(4f).dp,
                                end = scales.spacing(4f).dp,
                                bottom = scales.spacing(4f).dp,
                            ),
                    ) {
                        item.content()
                    }
                }
            }
        }
    }
}
