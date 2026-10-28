package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmBuildingIcon: ImageVector by lazy {
    jvdmIcon("building") {
        moveTo(4.5f, 20.5f)
        lineTo(4.5f, 5f)
        curveTo(4.5f, 4.171573f, 5.171573f, 3.5f, 6f, 3.5f)
        lineTo(13f, 3.5f)
        curveTo(13.828427f, 3.5f, 14.5f, 4.171573f, 14.5f, 5f)
        lineTo(14.5f, 20.5f)
        moveTo(14.5f, 10f)
        lineTo(18.5f, 10f)
        curveTo(19.328427f, 10f, 20f, 10.671573f, 20f, 11.5f)
        lineTo(20f, 20.5f)
        moveTo(3f, 20.5f)
        lineTo(21f, 20.5f)
        moveTo(7.5f, 7.5f)
        lineTo(11.5f, 7.5f)
        moveTo(7.5f, 11f)
        lineTo(11.5f, 11f)
        moveTo(7.5f, 14.5f)
        lineTo(11.5f, 14.5f)
        moveTo(7.5f, 18f)
        lineTo(11.5f, 18f)
    }
}

@Composable
public fun JvdmBuildingIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmBuildingIcon, modifier = modifier, size = size)
}
