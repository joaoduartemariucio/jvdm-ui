package com.jvdm.ui.molecules.cardtitle

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmCardTitle(
    title: String,
    modifier: Modifier = Modifier,
    hint: String? = null,
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            text = title,
            color = JvdmTokensAccess.color(JvdmColorToken.INK),
            style = JvdmTokensAccess.textStyle(JvdmTextStep.SM, weight = JvdmWeightStep.MEDIUM),
        )
        if (hint != null) {
            Text(
                text = hint,
                color = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.XS),
            )
        }
    }
}
