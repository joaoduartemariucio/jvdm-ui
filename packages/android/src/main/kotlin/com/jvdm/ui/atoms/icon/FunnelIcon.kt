package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmFunnelIcon: ImageVector by lazy {
    jvdmIcon("funnel") {
        moveTo(3f, 5f)
        lineTo(21f, 5f)
        lineTo(14f, 13f)
        lineTo(14f, 19f)
        lineTo(10f, 21f)
        lineTo(10f, 13f)
        close()
    }
}

@Composable
public fun JvdmFunnelIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmFunnelIcon, modifier = modifier, size = size)
}
