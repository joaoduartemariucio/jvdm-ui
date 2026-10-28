package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmStaffIcon: ImageVector by lazy {
    jvdmIcon("staff") {
        moveTo(5f, 4.5f)
        lineTo(19f, 4.5f)
        curveTo(20.380712f, 4.5f, 21.5f, 5.619288f, 21.5f, 7f)
        lineTo(21.5f, 17f)
        curveTo(21.5f, 18.380712f, 20.380712f, 19.5f, 19f, 19.5f)
        lineTo(5f, 19.5f)
        curveTo(3.619288f, 19.5f, 2.5f, 18.380712f, 2.5f, 17f)
        lineTo(2.5f, 7f)
        curveTo(2.5f, 5.619288f, 3.619288f, 4.5f, 5f, 4.5f)
        close()
        moveTo(6.3f, 10.5f)
        curveTo(6.3f, 11.285984f, 6.719318f, 12.012264f, 7.4f, 12.405256f)
        curveTo(8.080682f, 12.798248f, 8.919318f, 12.798248f, 9.6f, 12.405256f)
        curveTo(10.280682f, 12.012264f, 10.7f, 11.285984f, 10.7f, 10.5f)
        curveTo(10.7f, 9.714016f, 10.280682f, 8.987736f, 9.6f, 8.594744f)
        curveTo(8.919318f, 8.201752f, 8.080682f, 8.201752f, 7.4f, 8.594744f)
        curveTo(6.719318f, 8.987736f, 6.3f, 9.714016f, 6.3f, 10.5f)
        close()
        moveTo(5f, 16.4f)
        curveTo(5f, 14.7f, 6.6f, 13.8f, 8.5f, 13.8f)
        curveTo(10.4f, 13.8f, 12f, 14.7f, 12f, 16.4f)
        moveTo(15f, 10f)
        lineTo(19f, 10f)
        moveTo(15f, 14f)
        lineTo(19f, 14f)
    }
}

@Composable
public fun JvdmStaffIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmStaffIcon, modifier = modifier, size = size)
}
