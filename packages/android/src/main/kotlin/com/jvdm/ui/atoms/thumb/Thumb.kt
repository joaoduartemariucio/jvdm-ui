package com.jvdm.ui.atoms.thumb

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep

public const val THUMB_RATIO: Float = 4f / 3f

@Composable
public fun JvdmThumb(
    alt: String,
    modifier: Modifier = Modifier,
    image: @Composable (() -> Unit)? = null,
    fallback: @Composable (() -> Unit)? = null,
) {
    val scales = JvdmTokensAccess.scales

    Box(
        modifier =
            modifier
                .fillMaxWidth()
                .aspectRatio(THUMB_RATIO)
                .clip(RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp))
                .background(JvdmTokensAccess.color(JvdmColorToken.RAISED))
                .semantics { contentDescription = alt },
        contentAlignment = Alignment.Center,
    ) {
        if (image != null) {
            image()
        } else {
            fallback?.invoke()
        }
    }
}
