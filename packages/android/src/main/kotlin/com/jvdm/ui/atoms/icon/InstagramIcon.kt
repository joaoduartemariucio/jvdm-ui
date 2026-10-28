package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmInstagramIcon: ImageVector by lazy {
    jvdmIcon("instagram") {
        moveTo(8f, 3.5f)
        lineTo(16f, 3.5f)
        curveTo(18.485281f, 3.5f, 20.5f, 5.514719f, 20.5f, 8f)
        lineTo(20.5f, 16f)
        curveTo(20.5f, 18.485281f, 18.485281f, 20.5f, 16f, 20.5f)
        lineTo(8f, 20.5f)
        curveTo(5.514719f, 20.5f, 3.5f, 18.485281f, 3.5f, 16f)
        lineTo(3.5f, 8f)
        curveTo(3.5f, 5.514719f, 5.514719f, 3.5f, 8f, 3.5f)
        close()
        moveTo(8.2f, 12f)
        curveTo(8.2f, 14.098682f, 9.901318f, 15.8f, 12f, 15.8f)
        curveTo(14.098682f, 15.8f, 15.8f, 14.098682f, 15.8f, 12f)
        curveTo(15.8f, 9.901318f, 14.098682f, 8.2f, 12f, 8.2f)
        curveTo(9.901318f, 8.2f, 8.2f, 9.901318f, 8.2f, 12f)
        close()
        moveTo(17f, 7f)
        lineTo(17.01f, 7f)
    }
}

@Composable
public fun JvdmInstagramIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmInstagramIcon, modifier = modifier, size = size)
}
