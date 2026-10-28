package com.jvdm.ui.atoms.kbd

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep

@Composable
public fun JvdmKbd(
    key: String,
    modifier: Modifier = Modifier,
) {
    val scales = JvdmTokensAccess.scales
    val shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.XS).dp)

    Box(
        modifier =
            modifier
                .defaultMinSize(minWidth = scales.spacing(6f).dp)
                .clip(shape)
                .background(JvdmTokensAccess.color(JvdmColorToken.RAISED))
                .border(
                    border = BorderStroke(1.dp, JvdmTokensAccess.color(JvdmColorToken.LINE_STRONG)),
                    shape = shape,
                ).padding(
                    horizontal = scales.spacing(1f).dp,
                    vertical = scales.spacing(0.5f).dp,
                ),
        contentAlignment = Alignment.Center,
    ) {
        Text(
            text = key,
            color = JvdmTokensAccess.color(JvdmColorToken.INK_SOFT),
            style =
                JvdmTokensAccess
                    .textStyle(JvdmTextStep.XXS)
                    .copy(fontFamily = FontFamily.Monospace),
        )
    }
}
