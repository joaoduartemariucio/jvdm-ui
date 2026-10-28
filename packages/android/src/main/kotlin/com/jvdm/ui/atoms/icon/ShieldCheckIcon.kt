package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmShieldCheckIcon: ImageVector by lazy {
    jvdmIcon("shield-check") {
        moveTo(12f, 2.8f)
        lineTo(4.5f, 5.9f)
        lineTo(4.5f, 11.5f)
        curveTo(4.5f, 15.9f, 7.6f, 20f, 12f, 21.2f)
        curveTo(16.4f, 20f, 19.5f, 15.9f, 19.5f, 11.5f)
        lineTo(19.5f, 5.9f)
        close()
        moveTo(9f, 11.8f)
        lineTo(11.2f, 14f)
        lineTo(15.2f, 10f)
    }
}

@Composable
public fun JvdmShieldCheckIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmShieldCheckIcon, modifier = modifier, size = size)
}
