package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmTrashIcon: ImageVector by lazy {
    jvdmIcon("trash") {
        moveTo(5f, 7f)
        lineTo(19f, 7f)
        moveTo(9f, 7f)
        lineTo(9f, 5f)
        curveTo(9f, 4.447715f, 9.447715f, 4f, 10f, 4f)
        lineTo(14f, 4f)
        curveTo(14.552285f, 4f, 15f, 4.447715f, 15f, 5f)
        lineTo(15f, 7f)
        moveTo(7f, 7f)
        lineTo(8f, 20f)
        curveTo(8f, 20.552285f, 8.447715f, 21f, 9f, 21f)
        lineTo(15f, 21f)
        curveTo(15.552285f, 21f, 16f, 20.552285f, 16f, 20f)
        lineTo(17f, 7f)
        moveTo(10f, 11f)
        lineTo(10f, 17f)
        moveTo(14f, 11f)
        lineTo(14f, 17f)
    }
}

@Composable
public fun JvdmTrashIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmTrashIcon, modifier = modifier, size = size)
}
