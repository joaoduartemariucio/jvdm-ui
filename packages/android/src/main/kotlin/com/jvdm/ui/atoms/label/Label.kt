package com.jvdm.ui.atoms.label

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmTrackingStep

@Composable
public fun JvdmLabel(
    text: String,
    modifier: Modifier = Modifier,
    tone: LabelTone = LabelTone.MUTED,
) {
    Text(
        text = text,
        modifier = modifier,
        color = JvdmTokensAccess.color(tone.color),
        style =
            JvdmTokensAccess.textStyle(
                JvdmTextStep.XXS,
                tracking = JvdmTrackingStep.CAPS,
            ),
    )
}
