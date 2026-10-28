package com.jvdm.ui.molecules.metriccard

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

public enum class MetricTrend(
    public val token: String,
    public val color: JvdmColorToken,
) {
    NEUTRAL("neutral", JvdmColorToken.INK_MUTED),
    UP("up", JvdmColorToken.OK),
    DOWN("down", JvdmColorToken.DANGER),
}

@Composable
public fun JvdmMetricCard(
    label: String,
    value: String,
    modifier: Modifier = Modifier,
    change: String? = null,
    trend: MetricTrend = MetricTrend.NEUTRAL,
    hint: String? = null,
    content: @Composable (ColumnScope.() -> Unit)? = null,
) {
    val scales = JvdmTokensAccess.scales
    val shape = RoundedCornerShape(scales.radius(JvdmRadiusStep.MD).dp)

    Column(
        modifier =
            modifier
                .fillMaxWidth()
                .clip(shape)
                .background(JvdmTokensAccess.color(JvdmColorToken.SURFACE))
                .border(BorderStroke(1.dp, JvdmTokensAccess.color(JvdmColorToken.LINE)), shape)
                .padding(scales.spacing(5f).dp),
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text(
                text = label,
                color = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.XS),
            )
            if (change != null) {
                Text(
                    text = change,
                    color = JvdmTokensAccess.color(trend.color),
                    style =
                        JvdmTokensAccess.textStyle(
                            JvdmTextStep.XS,
                            weight = JvdmWeightStep.MEDIUM,
                        ),
                )
            }
        }

        Text(
            text = value,
            modifier = Modifier.padding(top = scales.spacing(3f).dp),
            color = JvdmTokensAccess.color(JvdmColorToken.INK),
            style = JvdmTokensAccess.textStyle(JvdmTextStep.XXL, weight = JvdmWeightStep.BOLD),
        )

        if (hint != null) {
            Text(
                text = hint,
                modifier = Modifier.padding(top = scales.spacing(1f).dp),
                color = JvdmTokensAccess.color(JvdmColorToken.INK_DIM),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.XS),
            )
        }

        if (content != null) {
            Column(modifier = Modifier.padding(top = scales.spacing(4f).dp), content = content)
        }
    }
}
