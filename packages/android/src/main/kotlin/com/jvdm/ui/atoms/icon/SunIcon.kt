package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmSunIcon: ImageVector by lazy {
    jvdmIcon("sun") {
        moveTo(8f, 12f)
        curveTo(8f, 14.209139f, 9.790861f, 16f, 12f, 16f)
        curveTo(14.209139f, 16f, 16f, 14.209139f, 16f, 12f)
        curveTo(16f, 9.790861f, 14.209139f, 8f, 12f, 8f)
        curveTo(9.790861f, 8f, 8f, 9.790861f, 8f, 12f)
        close()
        moveTo(12f, 2.5f)
        lineTo(12f, 4.5f)
        moveTo(12f, 19.5f)
        lineTo(12f, 21.5f)
        moveTo(4.6f, 4.6f)
        lineTo(6f, 6f)
        moveTo(18f, 18f)
        lineTo(19.4f, 19.4f)
        moveTo(2.5f, 12f)
        lineTo(4.5f, 12f)
        moveTo(19.5f, 12f)
        lineTo(21.5f, 12f)
        moveTo(4.6f, 19.4f)
        lineTo(6f, 18f)
        moveTo(18f, 6f)
        lineTo(19.4f, 4.6f)
    }
}

@Composable
public fun JvdmSunIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmSunIcon, modifier = modifier, size = size)
}
