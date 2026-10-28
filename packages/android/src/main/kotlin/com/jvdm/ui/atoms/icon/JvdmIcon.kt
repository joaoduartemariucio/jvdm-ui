package com.jvdm.ui.atoms.icon

import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalContentColor
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.PathBuilder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import com.jvdm.ui.theme.JvdmIconSize

internal const val VIEW_BOX: Float = 24f

internal const val STROKE_WIDTH: Float = 1.6f

internal fun jvdmIcon(
    name: String,
    trace: PathBuilder.() -> Unit,
): ImageVector =
    ImageVector
        .Builder(
            name = name,
            defaultWidth = VIEW_BOX.dp,
            defaultHeight = VIEW_BOX.dp,
            viewportWidth = VIEW_BOX,
            viewportHeight = VIEW_BOX,
        ).apply {
            path(
                fill = null,
                stroke = SolidColor(Color.Black),
                strokeLineWidth = STROKE_WIDTH,
                strokeLineCap = StrokeCap.Round,
                strokeLineJoin = StrokeJoin.Round,
                pathBuilder = trace,
            )
        }.build()

@Composable
public fun JvdmIcon(
    image: ImageVector,
    modifier: Modifier = Modifier,
    size: JvdmIconSize = JvdmIconSize.MD,
    tint: Color = LocalContentColor.current,
) {
    Icon(
        imageVector = image,
        contentDescription = null,
        modifier = modifier.size(size.points.dp),
        tint = tint,
    )
}
