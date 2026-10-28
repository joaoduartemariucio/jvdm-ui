package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmMoonIcon: ImageVector by lazy {
    jvdmIcon("moon") {
        moveTo(20f, 14.2f)
        curveTo(17.114287f, 15.059762f, 13.989493f, 14.268799f, 11.860347f, 12.139653f)
        curveTo(9.731201f, 10.010507f, 8.940238f, 6.885713f, 9.8f, 4f)
        curveTo(6.041077f, 5.119923f, 3.601556f, 8.744914f, 3.979544f, 12.648868f)
        curveTo(4.357533f, 16.552821f, 7.447179f, 19.642467f, 11.351132f, 20.020456f)
        curveTo(15.255086f, 20.398444f, 18.880077f, 17.958923f, 20f, 14.2f)
        close()
    }
}

@Composable
public fun JvdmMoonIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmMoonIcon, modifier = modifier, size = size)
}
