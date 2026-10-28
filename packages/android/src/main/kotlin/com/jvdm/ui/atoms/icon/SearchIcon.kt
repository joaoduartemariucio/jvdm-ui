package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmSearchIcon: ImageVector by lazy {
    jvdmIcon("search") {
        moveTo(4.5f, 11f)
        curveTo(4.5f, 14.589851f, 7.410149f, 17.5f, 11f, 17.5f)
        curveTo(14.589851f, 17.5f, 17.5f, 14.589851f, 17.5f, 11f)
        curveTo(17.5f, 7.410149f, 14.589851f, 4.5f, 11f, 4.5f)
        curveTo(7.410149f, 4.5f, 4.5f, 7.410149f, 4.5f, 11f)
        close()
        moveTo(16f, 16f)
        lineTo(20.5f, 20.5f)
    }
}

@Composable
public fun JvdmSearchIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmSearchIcon, modifier = modifier, size = size)
}
