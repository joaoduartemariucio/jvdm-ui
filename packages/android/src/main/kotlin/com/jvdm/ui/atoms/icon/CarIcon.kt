package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmCarIcon: ImageVector by lazy {
    jvdmIcon("car") {
        moveTo(3f, 13.5f)
        lineTo(5f, 8f)
        curveTo(5.261153f, 7.169563f, 6.029474f, 6.603431f, 6.9f, 6.6f)
        lineTo(17.1f, 6.6f)
        curveTo(17.970526f, 6.603431f, 18.738847f, 7.169563f, 19f, 8f)
        lineTo(21f, 13.5f)
        moveTo(2.5f, 13.5f)
        lineTo(21.5f, 13.5f)
        lineTo(21.5f, 17.5f)
        curveTo(21.5f, 18.052285f, 21.052285f, 18.5f, 20.5f, 18.5f)
        lineTo(3.5f, 18.5f)
        curveTo(2.947715f, 18.5f, 2.5f, 18.052285f, 2.5f, 17.5f)
        close()
        moveTo(6f, 18.5f)
        lineTo(6f, 20.5f)
        moveTo(18f, 18.5f)
        lineTo(18f, 20.5f)
        moveTo(6f, 16f)
        lineTo(7.5f, 16f)
        moveTo(16.5f, 16f)
        lineTo(18f, 16f)
    }
}

@Composable
public fun JvdmCarIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmCarIcon, modifier = modifier, size = size)
}
