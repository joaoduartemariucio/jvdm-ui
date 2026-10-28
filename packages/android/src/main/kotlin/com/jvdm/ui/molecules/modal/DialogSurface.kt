package com.jvdm.ui.molecules.modal

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.paneTitle
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.icon.JvdmCloseIcon
import com.jvdm.ui.atoms.icon.JvdmIcon
import com.jvdm.ui.atoms.iconbutton.JvdmIconButton
import com.jvdm.ui.theme.JvdmIconSize
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmDialogSurface(
    onClose: () -> Unit,
    modifier: Modifier = Modifier,
    title: String? = null,
    closeLabel: String = ModalLocales.CLOSE,
    label: String = ModalLocales.LABEL,
    content: @Composable ColumnScope.() -> Unit,
) {
    val scales = JvdmTokensAccess.scales

    Column(
        modifier =
            modifier
                .fillMaxWidth()
                .background(JvdmTokensAccess.color(JvdmColorToken.SURFACE))
                .semantics {
                    paneTitle = label
                    contentDescription = label
                },
    ) {
        if (title != null) {
            Row(
                modifier =
                    Modifier
                        .fillMaxWidth()
                        .padding(
                            start = scales.spacing(5f).dp,
                            end = scales.spacing(3f).dp,
                            top = scales.spacing(3f).dp,
                            bottom = scales.spacing(3f).dp,
                        ),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(
                    text = title,
                    color = JvdmTokensAccess.color(JvdmColorToken.INK),
                    style =
                        JvdmTokensAccess.textStyle(
                            JvdmTextStep.LG,
                            weight = JvdmWeightStep.BOLD,
                        ),
                )
                JvdmIconButton(label = closeLabel, onClick = onClose) {
                    JvdmIcon(
                        JvdmCloseIcon,
                        size = JvdmIconSize.MD,
                        tint = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
                    )
                }
            }
            HorizontalDivider(
                thickness = 1.dp,
                color = JvdmTokensAccess.color(JvdmColorToken.LINE),
            )
        }

        Column(
            modifier = Modifier.padding(scales.spacing(5f).dp),
            verticalArrangement = Arrangement.spacedBy(scales.spacing(3f).dp),
            content = content,
        )
    }
}
