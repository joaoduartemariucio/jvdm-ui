package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmWhatsappIcon: ImageVector by lazy {
    jvdmIcon("whatsapp") {
        moveTo(3.4f, 20.6f)
        lineTo(4.7f, 16f)
        curveTo(2.684342f, 12.45237f, 3.583684f, 7.962485f, 6.810225f, 5.464889f)
        curveTo(10.036767f, 2.967292f, 14.608751f, 3.221942f, 17.537975f, 6.062401f)
        curveTo(20.467198f, 8.90286f, 20.86237f, 13.464847f, 18.465211f, 16.766693f)
        curveTo(16.068051f, 20.068538f, 11.607957f, 21.105572f, 8f, 19.2f)
        close()
        moveTo(9f, 9.2f)
        curveTo(9f, 12.2f, 11.3f, 14.6f, 14.2f, 14.7f)
        curveTo(14.9f, 14.7f, 15.5f, 14.2f, 15.6f, 13.5f)
        lineTo(13.6f, 12.5f)
        lineTo(12.8f, 13.4f)
        curveTo(11.835717f, 12.893433f, 11.063231f, 12.085834f, 10.6f, 11.1f)
        lineTo(11.5f, 10.3f)
        lineTo(10.5f, 8.3f)
        curveTo(9.8f, 8.4f, 9.3f, 9f, 9.3f, 9.7f)
        close()
    }
}

@Composable
public fun JvdmWhatsappIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmWhatsappIcon, modifier = modifier, size = size)
}
