package com.jvdm.ui.molecules.statcard

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.card.CardPadding
import com.jvdm.ui.atoms.card.JvdmCard
import com.jvdm.ui.atoms.label.JvdmLabel
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmStatCard(
    label: String,
    value: String,
    modifier: Modifier = Modifier,
    hint: String? = null,
    color: JvdmColorToken? = null,
    attention: Boolean = false,
) {
    val scales = JvdmTokensAccess.scales

    val framed =
        if (!attention) {
            modifier
        } else {
            modifier.border(
                BorderStroke(
                    scales.spacing(1f).dp,
                    JvdmTokensAccess.color(JvdmColorToken.DANGER_SOFT),
                ),
                RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp),
            )
        }

    JvdmCard(modifier = framed, padding = CardPadding.SM) {
        JvdmLabel(text = label)
        Text(
            text = value,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            color = JvdmTokensAccess.color(color ?: JvdmColorToken.INK),
            style =
                JvdmTokensAccess.textStyle(
                    StatCardStyle.step(value),
                    weight = JvdmWeightStep.BOLD,
                ),
        )
        if (hint != null) {
            Text(
                text = hint,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                color = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.XS),
            )
        }
    }
}
