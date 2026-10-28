package com.jvdm.ui.molecules.confirmdialog

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import com.jvdm.ui.atoms.button.ButtonVariant
import com.jvdm.ui.atoms.button.JvdmButton
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

@Composable
public fun JvdmConfirmDialogContent(
    title: String,
    confirmLabel: String,
    cancelLabel: String,
    onConfirm: () -> Unit,
    onCancel: () -> Unit,
    modifier: Modifier = Modifier,
    description: String? = null,
    pending: Boolean = false,
    content: @Composable (ColumnScope.() -> Unit)? = null,
) {
    val scales = JvdmTokensAccess.scales

    Column(
        modifier =
            modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(scales.radius(JvdmRadiusStep.XL).dp))
                .background(JvdmTokensAccess.color(JvdmColorToken.SURFACE))
                .padding(scales.spacing(5f).dp),
        verticalArrangement = Arrangement.spacedBy(scales.spacing(4f).dp),
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(scales.spacing(2f).dp)) {
            Text(
                text = title,
                color = JvdmTokensAccess.color(JvdmColorToken.INK),
                style = JvdmTokensAccess.textStyle(JvdmTextStep.LG, weight = JvdmWeightStep.BOLD),
            )
            if (description != null) {
                Text(
                    text = description,
                    color = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
                    style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
                )
            }
        }

        content?.invoke(this)

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(scales.spacing(3f).dp, Alignment.End),
        ) {
            JvdmButton(enabled = !pending, onClick = onCancel) { Text(cancelLabel) }
            JvdmButton(
                variant = ButtonVariant.DANGER,
                enabled = !pending,
                onClick = onConfirm,
            ) {
                Text(confirmLabel)
            }
        }
    }
}

@Composable
public fun JvdmConfirmDialog(
    open: Boolean,
    title: String,
    confirmLabel: String,
    cancelLabel: String,
    onConfirm: () -> Unit,
    onCancel: () -> Unit,
    modifier: Modifier = Modifier,
    description: String? = null,
    pending: Boolean = false,
    content: @Composable (ColumnScope.() -> Unit)? = null,
) {
    if (!open) {
        return
    }

    Dialog(onDismissRequest = onCancel) {
        JvdmConfirmDialogContent(
            title = title,
            confirmLabel = confirmLabel,
            cancelLabel = cancelLabel,
            onConfirm = onConfirm,
            onCancel = onCancel,
            modifier = modifier,
            description = description,
            pending = pending,
            content = content,
        )
    }
}
