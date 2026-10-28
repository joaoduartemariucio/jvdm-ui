package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmFaceIcon: ImageVector by lazy {
    jvdmIcon("face") {
        moveTo(8.4f, 9.5f)
        curveTo(8.4f, 10.786156f, 9.086156f, 11.974613f, 10.2f, 12.617692f)
        curveTo(11.313844f, 13.26077f, 12.686156f, 13.26077f, 13.8f, 12.617691f)
        curveTo(14.913844f, 11.974613f, 15.6f, 10.786156f, 15.6f, 9.5f)
        curveTo(15.6f, 8.213844f, 14.913844f, 7.025387f, 13.8f, 6.382308f)
        curveTo(12.686156f, 5.73923f, 11.313844f, 5.73923f, 10.2f, 6.382309f)
        curveTo(9.086156f, 7.025387f, 8.4f, 8.213844f, 8.4f, 9.5f)
        close()
        moveTo(4.5f, 20f)
        curveTo(4.5f, 16.4f, 7.9f, 14.4f, 12f, 14.4f)
        curveTo(16.1f, 14.4f, 19.5f, 16.4f, 19.5f, 20f)
    }
}

@Composable
public fun JvdmFaceIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmFaceIcon, modifier = modifier, size = size)
}
