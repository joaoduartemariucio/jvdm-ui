package com.jvdm.ui.atoms.icon

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.jvdm.ui.theme.JvdmIconSize

public val JvdmStudentsIcon: ImageVector by lazy {
    jvdmIcon("students") {
        moveTo(5.8f, 8f)
        curveTo(5.8f, 9.14325f, 6.409917f, 10.199656f, 7.4f, 10.771281f)
        curveTo(8.390083f, 11.342906f, 9.609917f, 11.342906f, 10.6f, 10.771281f)
        curveTo(11.590083f, 10.199656f, 12.2f, 9.14325f, 12.2f, 8f)
        curveTo(12.2f, 6.85675f, 11.590083f, 5.800344f, 10.6f, 5.228719f)
        curveTo(9.609917f, 4.657094f, 8.390083f, 4.657094f, 7.4f, 5.228719f)
        curveTo(6.409917f, 5.800344f, 5.8f, 6.85675f, 5.8f, 8f)
        close()
        moveTo(3.5f, 19f)
        curveTo(3.5f, 16f, 6f, 14.4f, 9f, 14.4f)
        curveTo(12f, 14.4f, 14.5f, 16f, 14.5f, 19f)
        moveTo(16.5f, 6.6f)
        curveTo(17.658526f, 7.045632f, 18.422967f, 8.158722f, 18.422967f, 9.4f)
        curveTo(18.422967f, 10.641278f, 17.658526f, 11.754368f, 16.5f, 12.2f)
        moveTo(18f, 14.6f)
        curveTo(20f, 15.2f, 21.2f, 16.6f, 21.2f, 19f)
    }
}

@Composable
public fun JvdmStudentsIcon(
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
) {
    JvdmIcon(JvdmStudentsIcon, modifier = modifier, size = size)
}
