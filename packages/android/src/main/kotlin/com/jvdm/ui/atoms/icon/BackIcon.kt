package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmBackIcon: ImageVector by lazy {
    jvdmIcon("back") {
        moveTo(14f, 6f)
        lineTo(8f, 12f)
        lineTo(14f, 18f)
    }
}

@Composable
public fun JvdmBackIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmBackIcon, modifier = modifier, size = size)
}
