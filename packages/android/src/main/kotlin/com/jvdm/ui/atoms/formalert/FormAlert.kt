package com.jvdm.ui.atoms.formalert

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep

@Composable
public fun JvdmFormAlert(
    message: String,
    modifier: Modifier = Modifier,
) {
    val scales = JvdmTokensAccess.scales

    Box(
        modifier =
            modifier
                .fillMaxWidth()
                .background(
                    color = JvdmTokensAccess.color(JvdmColorToken.DANGER_SOFT),
                    shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp),
                ).padding(
                    horizontal = scales.spacing(3f).dp,
                    vertical = scales.spacing(2f).dp,
                ).semantics { liveRegion = LiveRegionMode.Polite },
    ) {
        Text(
            text = message,
            color = JvdmTokensAccess.color(JvdmColorToken.DANGER),
            style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
        )
    }
}
