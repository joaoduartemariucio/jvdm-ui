package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmPencilIcon: ImageVector by lazy {
    jvdmIcon("pencil") {
        moveTo(4f, 20f)
        lineTo(8f, 20f)
        lineTo(18f, 10f)
        curveTo(19.104569f, 8.895431f, 19.104569f, 7.104569f, 18f, 6f)
        curveTo(16.895431f, 4.895431f, 15.104569f, 4.895431f, 14f, 6f)
        lineTo(4f, 16f)
        lineTo(4f, 20f)
        close()
        moveTo(13.5f, 6.5f)
        lineTo(17.5f, 10.5f)
    }
}

@Composable
public fun JvdmPencilIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmPencilIcon, modifier = modifier, size = size)
}
