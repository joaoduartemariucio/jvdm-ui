package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmPlansIcon: ImageVector by lazy {
    jvdmIcon("plans") {
        moveTo(5f, 5f)
        lineTo(19f, 5f)
        curveTo(20.380712f, 5f, 21.5f, 6.119288f, 21.5f, 7.5f)
        lineTo(21.5f, 16.5f)
        curveTo(21.5f, 17.880712f, 20.380712f, 19f, 19f, 19f)
        lineTo(5f, 19f)
        curveTo(3.619288f, 19f, 2.5f, 17.880712f, 2.5f, 16.5f)
        lineTo(2.5f, 7.5f)
        curveTo(2.5f, 6.119288f, 3.619288f, 5f, 5f, 5f)
        close()
        moveTo(2.5f, 10f)
        lineTo(21.5f, 10f)
    }
}

@Composable
public fun JvdmPlansIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmPlansIcon, modifier = modifier, size = size)
}
