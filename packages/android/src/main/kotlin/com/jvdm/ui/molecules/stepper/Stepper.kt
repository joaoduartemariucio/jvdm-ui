package com.jvdm.ui.molecules.stepper

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmStepper(
    steps: List<Step>,
    current: Int,
    modifier: Modifier = Modifier,
) {
    val scales = JvdmTokensAccess.scales
    val dot = scales.spacing(2.5f).dp

    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(scales.spacing(4f).dp),
    ) {
        steps.forEachIndexed { index, step ->
            val state = StepState.of(index, current)

            Row(horizontalArrangement = Arrangement.spacedBy(scales.spacing(3f).dp)) {
                Box(
                    modifier =
                        Modifier
                            .padding(top = scales.spacing(1f).dp)
                            .size(dot)
                            .clip(CircleShape)
                            .background(JvdmTokensAccess.color(state.dot)),
                )
                Column(
                    verticalArrangement = Arrangement.spacedBy(scales.spacing(0.5f).dp),
                ) {
                    Text(
                        text = step.label,
                        color = JvdmTokensAccess.color(state.label),
                        style =
                            JvdmTokensAccess.textStyle(
                                JvdmTextStep.SM,
                                weight = JvdmWeightStep.MEDIUM,
                            ),
                    )
                    if (step.description != null) {
                        Text(
                            text = step.description,
                            color = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
                            style = JvdmTokensAccess.textStyle(JvdmTextStep.XS),
                        )
                    }
                }
            }
        }
    }
}
