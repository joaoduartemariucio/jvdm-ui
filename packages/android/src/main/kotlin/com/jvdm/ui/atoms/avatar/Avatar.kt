package com.jvdm.ui.atoms.avatar

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmAvatar(
    name: String,
    modifier: Modifier = Modifier,
    size: AvatarSize = AvatarSize.MD,
    label: String? = null,
) {
    val scales = JvdmTokensAccess.scales
    val description = label ?: name

    Box(
        modifier =
            modifier
                .size(size.points.dp)
                .background(
                    color = JvdmTokensAccess.color(JvdmColorToken.RAISED),
                    shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp),
                ).semantics { contentDescription = description },
        contentAlignment = Alignment.Center,
    ) {
        Text(
            text = AvatarInitials.of(name),
            style = JvdmTokensAccess.textStyle(size.text, weight = JvdmWeightStep.MEDIUM),
            color = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
        )
    }
}
