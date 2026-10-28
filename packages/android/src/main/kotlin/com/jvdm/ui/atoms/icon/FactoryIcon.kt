package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmFactoryIcon: ImageVector by lazy {
    jvdmIcon("factory") {
        moveTo(2.5f, 20.5f)
        lineTo(2.5f, 11f)
        lineTo(8.5f, 14.5f)
        lineTo(8.5f, 11f)
        lineTo(14.5f, 14.5f)
        lineTo(14.5f, 6.5f)
        curveTo(14.5f, 5.947715f, 14.947715f, 5.5f, 15.5f, 5.5f)
        lineTo(18.5f, 5.5f)
        curveTo(19.052285f, 5.5f, 19.5f, 5.947715f, 19.5f, 6.5f)
        lineTo(19.5f, 20.5f)
        close()
        moveTo(2f, 20.5f)
        lineTo(22f, 20.5f)
    }
}

@Composable
public fun JvdmFactoryIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmFactoryIcon, modifier = modifier, size = size)
}
