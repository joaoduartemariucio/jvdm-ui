package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmCalendarIcon: ImageVector by lazy {
    jvdmIcon("calendar") {
        moveTo(6f, 5f)
        lineTo(18f, 5f)
        curveTo(19.380712f, 5f, 20.5f, 6.119288f, 20.5f, 7.5f)
        lineTo(20.5f, 18.5f)
        curveTo(20.5f, 19.880712f, 19.380712f, 21f, 18f, 21f)
        lineTo(6f, 21f)
        curveTo(4.619288f, 21f, 3.5f, 19.880712f, 3.5f, 18.5f)
        lineTo(3.5f, 7.5f)
        curveTo(3.5f, 6.119288f, 4.619288f, 5f, 6f, 5f)
        close()
        moveTo(3.5f, 10f)
        lineTo(20.5f, 10f)
        moveTo(8f, 3.5f)
        lineTo(8f, 6.5f)
        moveTo(16f, 3.5f)
        lineTo(16f, 6.5f)
    }
}

@Composable
public fun JvdmCalendarIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmCalendarIcon, modifier = modifier, size = size)
}
