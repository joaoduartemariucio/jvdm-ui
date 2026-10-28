package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmAlertIcon: ImageVector by lazy {
    jvdmIcon("alert") {
        moveTo(12f, 8.5f)
        lineTo(12f, 13.5f)
        moveTo(12f, 16.7f)
        lineTo(12.01f, 16.7f)
        moveTo(10.3f, 3.9f)
        lineTo(2.6f, 17.4f)
        curveTo(2.228236f, 17.999002f, 2.218699f, 18.754604f, 2.575226f, 19.362798f)
        curveTo(2.931754f, 19.970992f, 3.595726f, 20.331779f, 4.3f, 20.3f)
        lineTo(19.7f, 20.3f)
        curveTo(20.404274f, 20.331779f, 21.068246f, 19.970992f, 21.424774f, 19.362798f)
        curveTo(21.781301f, 18.754604f, 21.771764f, 17.999002f, 21.4f, 17.4f)
        lineTo(13.7f, 3.9f)
        curveTo(13.378389f, 3.255663f, 12.720141f, 2.848528f, 12f, 2.848528f)
        curveTo(11.279859f, 2.848528f, 10.621611f, 3.255663f, 10.3f, 3.9f)
        close()
    }
}

@Composable
public fun JvdmAlertIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmAlertIcon, modifier = modifier, size = size)
}
