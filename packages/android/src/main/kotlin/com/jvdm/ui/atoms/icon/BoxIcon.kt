package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmBoxIcon: ImageVector by lazy {
    jvdmIcon("box") {
        moveTo(20.5f, 8.2f)
        lineTo(20.5f, 15.8f)
        curveTo(20.505163f, 16.376748f, 20.199512f, 16.911637f, 19.7f, 17.2f)
        lineTo(12.8f, 21f)
        curveTo(12.304958f, 21.285812f, 11.695042f, 21.285812f, 11.2f, 21f)
        lineTo(4.3f, 17.2f)
        curveTo(3.800488f, 16.911637f, 3.494837f, 16.376748f, 3.5f, 15.8f)
        lineTo(3.5f, 8.2f)
        moveTo(3.9f, 7.3f)
        lineTo(11.2f, 3.3f)
        curveTo(11.695042f, 3.014188f, 12.304958f, 3.014188f, 12.8f, 3.3f)
        lineTo(20.1f, 7.3f)
        curveTo(20.394217f, 7.482339f, 20.573217f, 7.803862f, 20.573217f, 8.15f)
        curveTo(20.573217f, 8.496138f, 20.394217f, 8.817661f, 20.1f, 9f)
        lineTo(12.8f, 13f)
        curveTo(12.304958f, 13.285812f, 11.695042f, 13.285812f, 11.2f, 13f)
        lineTo(3.9f, 9f)
        curveTo(3.605783f, 8.817661f, 3.426783f, 8.496138f, 3.426783f, 8.15f)
        curveTo(3.426783f, 7.803862f, 3.605783f, 7.482339f, 3.9f, 7.3f)
        close()
        moveTo(12f, 12.8f)
        lineTo(12f, 20.8f)
    }
}

@Composable
public fun JvdmBoxIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmBoxIcon, modifier = modifier, size = size)
}
