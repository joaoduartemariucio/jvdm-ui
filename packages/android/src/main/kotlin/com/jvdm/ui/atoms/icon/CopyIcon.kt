package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmCopyIcon: ImageVector by lazy {
    jvdmIcon("copy") {
        moveTo(11f, 9f)
        lineTo(18f, 9f)
        curveTo(19.104569f, 9f, 20f, 9.895431f, 20f, 11f)
        lineTo(20f, 18f)
        curveTo(20f, 19.104569f, 19.104569f, 20f, 18f, 20f)
        lineTo(11f, 20f)
        curveTo(9.895431f, 20f, 9f, 19.104569f, 9f, 18f)
        lineTo(9f, 11f)
        curveTo(9f, 9.895431f, 9.895431f, 9f, 11f, 9f)
        close()
        moveTo(5f, 15f)
        lineTo(5f, 6f)
        curveTo(5f, 4.895431f, 5.895431f, 4f, 7f, 4f)
        lineTo(15f, 4f)
    }
}

@Composable
public fun JvdmCopyIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmCopyIcon, modifier = modifier, size = size)
}
