package com.jvdm.ui.atoms.tag

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.badge.BadgeTone
import com.jvdm.ui.atoms.icon.JvdmCloseIcon
import com.jvdm.ui.atoms.icon.JvdmIcon
import com.jvdm.ui.theme.JvdmIconSize
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmTag(
    text: String,
    modifier: Modifier = Modifier,
    tone: BadgeTone = BadgeTone.NEUTRAL,
    onRemove: (() -> Unit)? = null,
    removeLabel: String = TagLocales.REMOVE,
    disabled: Boolean = false,
) {
    val scales = JvdmTokensAccess.scales
    val foreground = JvdmTokensAccess.color(tone.foreground)

    Row(
        modifier =
            modifier
                .alpha(if (disabled) 0.5f else 1f)
                .clip(RoundedCornerShape(scales.radius(JvdmRadiusStep.SM).dp))
                .background(JvdmTokensAccess.color(tone.background))
                .padding(
                    start = scales.spacing(2f).dp,
                    end = scales.spacing(if (onRemove == null) 2f else 1f).dp,
                    top = scales.spacing(0.5f).dp,
                    bottom = scales.spacing(0.5f).dp,
                ),
        horizontalArrangement = Arrangement.spacedBy(scales.spacing(1f).dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            text = text,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            color = foreground,
            style = JvdmTokensAccess.textStyle(JvdmTextStep.XS, weight = JvdmWeightStep.MEDIUM),
        )
        if (onRemove != null) {
            JvdmIcon(
                JvdmCloseIcon,
                modifier =
                    Modifier
                        .alpha(0.7f)
                        .clickable(enabled = !disabled, onClick = onRemove)
                        .padding(scales.spacing(0.5f).dp)
                        .semantics { contentDescription = removeLabel },
                size = JvdmIconSize.SM,
                tint = foreground,
            )
        }
    }
}
