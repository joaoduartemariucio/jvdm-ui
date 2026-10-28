package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmAccessIcon: ImageVector by lazy {
    jvdmIcon("access") {
        moveTo(4f, 8f)
        lineTo(4f, 5.5f)
        curveTo(4f, 4.671573f, 4.671573f, 4f, 5.5f, 4f)
        lineTo(8f, 4f)
        moveTo(16f, 4f)
        lineTo(18.5f, 4f)
        curveTo(19.328427f, 4f, 20f, 4.671573f, 20f, 5.5f)
        lineTo(20f, 8f)
        moveTo(20f, 16f)
        lineTo(20f, 18.5f)
        curveTo(20f, 19.328427f, 19.328427f, 20f, 18.5f, 20f)
        lineTo(16f, 20f)
        moveTo(8f, 20f)
        lineTo(5.5f, 20f)
        curveTo(4.671573f, 20f, 4f, 19.328427f, 4f, 18.5f)
        lineTo(4f, 16f)
        moveTo(4f, 12f)
        lineTo(20f, 12f)
    }
}

@Composable
public fun JvdmAccessIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmAccessIcon, modifier = modifier, size = size)
}
