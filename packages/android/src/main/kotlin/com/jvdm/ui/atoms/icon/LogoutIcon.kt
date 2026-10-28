package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmLogoutIcon: ImageVector by lazy {
    jvdmIcon("logout") {
        moveTo(9f, 4.5f)
        lineTo(6f, 4.5f)
        curveTo(5.171573f, 4.5f, 4.5f, 5.171573f, 4.5f, 6f)
        lineTo(4.5f, 18f)
        curveTo(4.5f, 18.828427f, 5.171573f, 19.5f, 6f, 19.5f)
        lineTo(9f, 19.5f)
        moveTo(15.5f, 15.5f)
        lineTo(19.5f, 12f)
        lineTo(15.5f, 8.5f)
        moveTo(19f, 12f)
        lineTo(9.5f, 12f)
    }
}

@Composable
public fun JvdmLogoutIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmLogoutIcon, modifier = modifier, size = size)
}
