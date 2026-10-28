package com.jvdm.ui.atoms.input

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep

@Composable
public fun JvdmInput(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String? = null,
    size: ControlSize = ControlSize.MD,
    invalid: Boolean = false,
    singleLine: Boolean = true,
) {
    val scales = JvdmTokensAccess.scales
    val shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp)
    val border = if (invalid) JvdmColorToken.DANGER else JvdmColorToken.LINE_STRONG

    BasicTextField(
        value = value,
        onValueChange = onValueChange,
        modifier =
            modifier
                .fillMaxWidth()
                .clip(shape)
                .background(JvdmTokensAccess.color(JvdmColorToken.FIELD))
                .border(BorderStroke(1.dp, JvdmTokensAccess.color(border)), shape)
                .padding(
                    horizontal = scales.spacing(size.horizontal).dp,
                    vertical = scales.spacing(size.vertical).dp,
                ),
        singleLine = singleLine,
        textStyle =
            JvdmTokensAccess
                .textStyle(JvdmTextStep.SM)
                .copy(color = JvdmTokensAccess.color(JvdmColorToken.INK)),
        cursorBrush = SolidColor(JvdmTokensAccess.color(JvdmColorToken.ACCENT)),
        decorationBox = { inner ->
            if (value.isEmpty() && placeholder != null) {
                Text(
                    text = placeholder,
                    color = JvdmTokensAccess.color(JvdmColorToken.INK_DIM),
                    style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
                )
            }
            inner()
        },
    )
}
