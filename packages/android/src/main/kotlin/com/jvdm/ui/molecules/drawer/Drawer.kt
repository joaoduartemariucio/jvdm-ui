package com.jvdm.ui.molecules.drawer

import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.widthIn
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.jvdm.ui.molecules.modal.JvdmDialogSurface
import com.jvdm.ui.molecules.modal.ModalSize

@Composable
public fun JvdmDrawer(
    isOpen: Boolean,
    onClose: () -> Unit,
    modifier: Modifier = Modifier,
    title: String? = null,
    closeLabel: String = DrawerLocales.CLOSE,
    content: @Composable ColumnScope.() -> Unit,
) {
    if (!isOpen) {
        return
    }

    Dialog(
        onDismissRequest = onClose,
        properties = DialogProperties(usePlatformDefaultWidth = false),
    ) {
        JvdmDialogSurface(
            onClose = onClose,
            modifier =
                modifier
                    .fillMaxHeight()
                    .fillMaxWidth()
                    .widthIn(max = ModalSize.SM.maxWidth.dp),
            title = title,
            closeLabel = closeLabel,
            label = closeLabel,
            content = content,
        )
    }
}
