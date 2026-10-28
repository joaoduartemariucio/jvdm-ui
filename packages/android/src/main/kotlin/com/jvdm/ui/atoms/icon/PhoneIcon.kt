package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmPhoneIcon: ImageVector by lazy {
    jvdmIcon("phone") {
        moveTo(8.4f, 3.5f)
        lineTo(5.2f, 3.5f)
        curveTo(4.659442f, 3.496996f, 4.143196f, 3.724386f, 3.780523f, 4.125235f)
        curveTo(3.41785f, 4.526084f, 3.24309f, 5.062438f, 3.3f, 5.6f)
        curveTo(3.7f, 9.3f, 5.1f, 12.8f, 7.4f, 15.7f)
        curveTo(8.992867f, 17.789672f, 11.001847f, 19.526248f, 13.3f, 20.8f)
        curveTo(13.737362f, 21.053026f, 14.257495f, 21.12142f, 14.745401f, 20.99006f)
        curveTo(15.233307f, 20.858701f, 15.648794f, 20.538409f, 15.9f, 20.1f)
        lineTo(17.3f, 17.8f)
        curveTo(17.779782f, 16.937329f, 17.519051f, 15.850951f, 16.7f, 15.3f)
        lineTo(14.5f, 13.9f)
        lineTo(12.2f, 16.2f)
        curveTo(10.654254f, 15.171468f, 9.328532f, 13.845746f, 8.3f, 12.3f)
        lineTo(10.6f, 10f)
        lineTo(9.2f, 7.8f)
        curveTo(8.856593f, 7.24516f, 8.252493f, 6.905354f, 7.6f, 6.9f)
        close()
    }
}

@Composable
public fun JvdmPhoneIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmPhoneIcon, modifier = modifier, size = size)
}
