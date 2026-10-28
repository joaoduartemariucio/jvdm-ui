package com.jvdm.ui.atoms.textarea

import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.input.ControlSize
import com.jvdm.ui.atoms.input.JvdmInput
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmTextStep

@Composable
public fun JvdmTextarea(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String? = null,
    rows: Int = 4,
    size: ControlSize = ControlSize.MD,
    invalid: Boolean = false,
) {
    val scales = JvdmTokensAccess.scales
    val minHeight = scales.lineHeight(JvdmTextStep.SM) * rows + scales.spacing(6f)

    JvdmInput(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier.defaultMinSize(minHeight = minHeight.dp),
        placeholder = placeholder,
        size = size,
        invalid = invalid,
        singleLine = false,
    )
}
