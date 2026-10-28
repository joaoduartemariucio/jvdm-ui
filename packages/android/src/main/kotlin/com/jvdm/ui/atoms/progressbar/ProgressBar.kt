package com.jvdm.ui.atoms.progressbar

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken

@Composable
public fun JvdmProgressBar(
    value: Float,
    modifier: Modifier = Modifier,
    tone: ProgressTone = ProgressTone.ACCENT,
    size: ProgressSize = ProgressSize.MD,
    dim: Boolean = false,
    label: String? = null,
) {
    val scales = JvdmTokensAccess.scales
    val ratio = ProgressSize.ratio(value)
    val described = label

    Box(
        modifier =
            modifier
                .alpha(if (dim) 0.5f else 1f)
                .fillMaxWidth()
                .height(scales.spacing(size.steps).dp)
                .clip(CircleShape)
                .background(JvdmTokensAccess.color(JvdmColorToken.RAISED))
                .then(
                    if (described == null) {
                        Modifier
                    } else {
                        Modifier.semantics { contentDescription = described }
                    },
                ),
        contentAlignment = Alignment.CenterStart,
    ) {
        Box(
            modifier =
                Modifier
                    .fillMaxWidth(ratio)
                    .fillMaxHeight()
                    .background(JvdmTokensAccess.color(tone.fill)),
        )
    }
}
