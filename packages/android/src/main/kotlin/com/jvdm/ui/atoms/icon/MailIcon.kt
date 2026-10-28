package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmMailIcon: ImageVector by lazy {
    jvdmIcon("mail") {
        moveTo(5f, 4.5f)
        lineTo(19f, 4.5f)
        curveTo(20.380712f, 4.5f, 21.5f, 5.619288f, 21.5f, 7f)
        lineTo(21.5f, 17f)
        curveTo(21.5f, 18.380712f, 20.380712f, 19.5f, 19f, 19.5f)
        lineTo(5f, 19.5f)
        curveTo(3.619288f, 19.5f, 2.5f, 18.380712f, 2.5f, 17f)
        lineTo(2.5f, 7f)
        curveTo(2.5f, 5.619288f, 3.619288f, 4.5f, 5f, 4.5f)
        close()
        moveTo(3.5f, 7f)
        lineTo(10.9f, 12.2f)
        curveTo(11.567465f, 12.639561f, 12.432535f, 12.639561f, 13.1f, 12.2f)
        lineTo(20.5f, 7f)
    }
}

@Composable
public fun JvdmMailIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmMailIcon, modifier = modifier, size = size)
}
