package com.jvdm.ui.atoms.card

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep

@Composable
public fun JvdmCard(
    modifier: Modifier = Modifier,
    padding: CardPadding = CardPadding.MD,
    content: @Composable ColumnScope.() -> Unit,
) {
    val scales = JvdmTokensAccess.scales
    val shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp)

    Column(
        modifier =
            modifier
                .clip(shape)
                .background(JvdmTokensAccess.color(JvdmColorToken.SURFACE))
                .border(
                    border = BorderStroke(1.dp, JvdmTokensAccess.color(JvdmColorToken.LINE)),
                    shape = shape,
                ).padding(scales.spacing(padding.steps).dp),
        content = content,
    )
}
