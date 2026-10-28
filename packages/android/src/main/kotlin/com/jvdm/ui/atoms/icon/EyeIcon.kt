package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmEyeIcon: ImageVector by lazy {
    jvdmIcon("eye") {
        moveTo(2.5f, 12f)
        curveTo(2.5f, 12f, 6f, 5.5f, 12f, 5.5f)
        curveTo(18f, 5.5f, 21.5f, 12f, 21.5f, 12f)
        curveTo(21.5f, 12f, 18f, 18.5f, 12f, 18.5f)
        curveTo(6f, 18.5f, 2.5f, 12f, 2.5f, 12f)
        close()
        moveTo(9f, 12f)
        curveTo(9f, 13.656854f, 10.343146f, 15f, 12f, 15f)
        curveTo(13.656854f, 15f, 15f, 13.656854f, 15f, 12f)
        curveTo(15f, 10.343146f, 13.656854f, 9f, 12f, 9f)
        curveTo(10.343146f, 9f, 9f, 10.343146f, 9f, 12f)
        close()
    }
}

@Composable
public fun JvdmEyeIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmEyeIcon, modifier = modifier, size = size)
}
