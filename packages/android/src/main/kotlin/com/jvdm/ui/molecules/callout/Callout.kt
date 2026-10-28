package com.jvdm.ui.molecules.callout

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.unit.dp
import com.jvdm.ui.molecules.banner.NoticeTone
import com.jvdm.ui.molecules.banner.notice
import com.jvdm.ui.molecules.banner.noticeShape
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmCallout(
    title: String,
    body: String,
    modifier: Modifier = Modifier,
    tone: NoticeTone = NoticeTone.INFO,
) {
    val scales = JvdmTokensAccess.scales

    Column(
        modifier = modifier.notice(tone, noticeShape()),
        verticalArrangement = Arrangement.spacedBy(scales.spacing(1f).dp),
    ) {
        Text(
            text = title,
            color = JvdmTokensAccess.color(tone.foreground),
            style = JvdmTokensAccess.textStyle(JvdmTextStep.SM, weight = JvdmWeightStep.MEDIUM),
        )
        Text(
            text = body,
            modifier = Modifier.alpha(0.8f),
            color = JvdmTokensAccess.color(tone.foreground),
            style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
        )
    }
}
