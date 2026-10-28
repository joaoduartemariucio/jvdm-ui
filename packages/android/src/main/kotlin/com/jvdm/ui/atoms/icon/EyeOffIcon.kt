package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmEyeOffIcon: ImageVector by lazy {
    jvdmIcon("eye-off") {
        moveTo(9.9f, 5.8f)
        curveTo(10.586267f, 5.620231f, 11.290849f, 5.519577f, 12f, 5.5f)
        curveTo(18f, 5.5f, 21.5f, 12f, 21.5f, 12f)
        curveTo(20.619508f, 13.529689f, 19.506168f, 14.912928f, 18.2f, 16.1f)
        moveTo(6.4f, 7.6f)
        curveTo(4.854311f, 8.829019f, 3.534577f, 10.31795f, 2.5f, 12f)
        curveTo(2.5f, 12f, 6f, 18.5f, 12f, 18.5f)
        curveTo(13.267686f, 18.515889f, 14.52573f, 18.27788f, 15.7f, 17.8f)
        moveTo(10f, 10f)
        curveTo(8.895431f, 11.104569f, 8.895431f, 12.895431f, 10f, 14f)
        curveTo(11.104569f, 15.104569f, 12.895431f, 15.104569f, 14f, 14f)
        moveTo(4f, 4f)
        lineTo(20f, 20f)
    }
}

@Composable
public fun JvdmEyeOffIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmEyeOffIcon, modifier = modifier, size = size)
}
