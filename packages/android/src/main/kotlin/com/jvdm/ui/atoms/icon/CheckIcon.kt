package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmCheckIcon: ImageVector by lazy {
    jvdmIcon("check") {
        moveTo(5f, 12.5f)
        lineTo(9.5f, 17f)
        lineTo(19f, 7.5f)
    }
}

@Composable
public fun JvdmCheckIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmCheckIcon, modifier = modifier, size = size)
}
