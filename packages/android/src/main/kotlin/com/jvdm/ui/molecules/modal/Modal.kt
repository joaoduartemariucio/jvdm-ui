package com.jvdm.ui.molecules.modal

import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken

@OptIn(ExperimentalMaterial3Api::class)
@Composable
public fun JvdmModal(
    isOpen: Boolean,
    onClose: () -> Unit,
    modifier: Modifier = Modifier,
    title: String? = null,
    size: ModalSize = ModalSize.MD,
    closeLabel: String = ModalLocales.CLOSE,
    label: String = ModalLocales.LABEL,
    content: @Composable ColumnScope.() -> Unit,
) {
    if (!isOpen) {
        return
    }

    ModalBottomSheet(
        onDismissRequest = onClose,
        modifier = modifier.widthIn(max = size.maxWidth.dp),
        sheetState = rememberModalBottomSheetState(),
        containerColor = JvdmTokensAccess.color(JvdmColorToken.SURFACE),
    ) {
        JvdmDialogSurface(
            onClose = onClose,
            title = title,
            closeLabel = closeLabel,
            label = label,
            content = content,
        )
    }
}
