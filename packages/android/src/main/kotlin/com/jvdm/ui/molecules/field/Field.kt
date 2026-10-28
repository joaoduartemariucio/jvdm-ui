package com.jvdm.ui.molecules.field

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmField(
    label: String,
    modifier: Modifier = Modifier,
    error: String? = null,
    action: @Composable (() -> Unit)? = null,
    content: @Composable ColumnScope.() -> Unit,
) {
    val scales = JvdmTokensAccess.scales

    Column(
        modifier =
            modifier
                .fillMaxWidth()
                .semantics { contentDescription = label },
        verticalArrangement = Arrangement.spacedBy(scales.spacing(2f).dp),
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                text = label,
                color = JvdmTokensAccess.color(JvdmColorToken.INK_SOFT),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.XS, weight = JvdmWeightStep.MEDIUM),
            )
            action?.invoke()
        }

        content()

        if (error != null) {
            Text(
                text = error,
                color = JvdmTokensAccess.color(JvdmColorToken.DANGER),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.XXS),
            )
        }
    }
}
