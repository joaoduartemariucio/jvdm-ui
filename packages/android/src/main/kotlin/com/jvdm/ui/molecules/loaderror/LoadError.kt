package com.jvdm.ui.molecules.loaderror

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
import com.jvdm.ui.atoms.button.ButtonVariant
import com.jvdm.ui.atoms.button.JvdmButton
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep

@Composable
public fun JvdmLoadError(
    message: String,
    modifier: Modifier = Modifier,
    onRetry: (() -> Unit)? = null,
    retryLabel: String = LoadErrorLocales.RETRY,
) {
    val scales = JvdmTokensAccess.scales

    Column(
        modifier =
            modifier
                .fillMaxWidth()
                .padding(vertical = scales.spacing(16f).dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(scales.spacing(3f).dp),
    ) {
        Text(
            text = message,
            textAlign = TextAlign.Center,
            color = JvdmTokensAccess.color(JvdmColorToken.DANGER),
            style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
        )
        if (onRetry != null) {
            JvdmButton(variant = ButtonVariant.SECONDARY, onClick = onRetry) {
                Text(retryLabel)
            }
        }
    }
}
