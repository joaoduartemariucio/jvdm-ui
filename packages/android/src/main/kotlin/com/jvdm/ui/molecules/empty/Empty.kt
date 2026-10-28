package com.jvdm.ui.molecules.empty

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmEmpty(
    title: String,
    modifier: Modifier = Modifier,
    description: String? = null,
) {
    val scales = JvdmTokensAccess.scales

    Column(
        modifier =
            modifier
                .fillMaxWidth()
                .padding(vertical = scales.spacing(16f).dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(scales.spacing(2f).dp),
    ) {
        Text(
            text = title,
            textAlign = TextAlign.Center,
            color = JvdmTokensAccess.color(JvdmColorToken.INK_SOFT),
            style = JvdmTokensAccess.textStyle(JvdmTextStep.SM, weight = JvdmWeightStep.MEDIUM),
        )
        if (description != null) {
            Text(
                text = description,
                textAlign = TextAlign.Center,
                color = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
            )
        }
    }
}
