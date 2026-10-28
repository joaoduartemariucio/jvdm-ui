package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmGavelIcon: ImageVector by lazy {
    jvdmIcon("gavel") {
        moveTo(13.4f, 6.6f)
        lineTo(17.4f, 10.6f)
        moveTo(15.9f, 2.9f)
        curveTo(16.677687f, 2.137714f, 17.922313f, 2.137714f, 18.7f, 2.9f)
        lineTo(21.1f, 5.3f)
        curveTo(21.862286f, 6.077687f, 21.862286f, 7.322313f, 21.1f, 8.1f)
        lineTo(19.1f, 10.1f)
        curveTo(18.322313f, 10.862286f, 17.077687f, 10.862286f, 16.3f, 10.1f)
        lineTo(13.9f, 7.7f)
        curveTo(13.137714f, 6.922313f, 13.137714f, 5.677687f, 13.9f, 4.9f)
        close()
        moveTo(14.2f, 9.8f)
        lineTo(6.6f, 17.4f)
        curveTo(5.837714f, 18.177687f, 5.837714f, 19.422313f, 6.6f, 20.2f)
        curveTo(7.377687f, 20.962286f, 8.622313f, 20.962286f, 9.4f, 20.2f)
        lineTo(17f, 12.6f)
        moveTo(3.5f, 21.5f)
        lineTo(10.5f, 21.5f)
    }
}

@Composable
public fun JvdmGavelIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmGavelIcon, modifier = modifier, size = size)
}
