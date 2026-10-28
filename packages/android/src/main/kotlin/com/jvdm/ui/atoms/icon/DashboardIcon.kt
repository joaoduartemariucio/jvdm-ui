package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmDashboardIcon: ImageVector by lazy {
    jvdmIcon("dashboard") {
        moveTo(4.5f, 3f)
        lineTo(8.5f, 3f)
        curveTo(9.328427f, 3f, 10f, 3.671573f, 10f, 4.5f)
        lineTo(10f, 8.5f)
        curveTo(10f, 9.328427f, 9.328427f, 10f, 8.5f, 10f)
        lineTo(4.5f, 10f)
        curveTo(3.671573f, 10f, 3f, 9.328427f, 3f, 8.5f)
        lineTo(3f, 4.5f)
        curveTo(3f, 3.671573f, 3.671573f, 3f, 4.5f, 3f)
        close()
        moveTo(15.5f, 3f)
        lineTo(19.5f, 3f)
        curveTo(20.328427f, 3f, 21f, 3.671573f, 21f, 4.5f)
        lineTo(21f, 8.5f)
        curveTo(21f, 9.328427f, 20.328427f, 10f, 19.5f, 10f)
        lineTo(15.5f, 10f)
        curveTo(14.671573f, 10f, 14f, 9.328427f, 14f, 8.5f)
        lineTo(14f, 4.5f)
        curveTo(14f, 3.671573f, 14.671573f, 3f, 15.5f, 3f)
        close()
        moveTo(4.5f, 14f)
        lineTo(8.5f, 14f)
        curveTo(9.328427f, 14f, 10f, 14.671573f, 10f, 15.5f)
        lineTo(10f, 19.5f)
        curveTo(10f, 20.328427f, 9.328427f, 21f, 8.5f, 21f)
        lineTo(4.5f, 21f)
        curveTo(3.671573f, 21f, 3f, 20.328427f, 3f, 19.5f)
        lineTo(3f, 15.5f)
        curveTo(3f, 14.671573f, 3.671573f, 14f, 4.5f, 14f)
        close()
        moveTo(15.5f, 14f)
        lineTo(19.5f, 14f)
        curveTo(20.328427f, 14f, 21f, 14.671573f, 21f, 15.5f)
        lineTo(21f, 19.5f)
        curveTo(21f, 20.328427f, 20.328427f, 21f, 19.5f, 21f)
        lineTo(15.5f, 21f)
        curveTo(14.671573f, 21f, 14f, 20.328427f, 14f, 19.5f)
        lineTo(14f, 15.5f)
        curveTo(14f, 14.671573f, 14.671573f, 14f, 15.5f, 14f)
        close()
    }
}

@Composable
public fun JvdmDashboardIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmDashboardIcon, modifier = modifier, size = size)
}
