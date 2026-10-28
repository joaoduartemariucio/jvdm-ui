package com.jvdm.ui.atoms.iconbutton

import androidx.compose.foundation.layout.RowScope
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import com.jvdm.ui.atoms.button.ButtonSize
import com.jvdm.ui.atoms.button.ButtonVariant
import com.jvdm.ui.atoms.button.JvdmButton

public enum class IconButtonSize(
    public val token: String,
    public val button: ButtonSize,
) {
    ICON("icon", ButtonSize.ICON),
    ICON_SM("icon-sm", ButtonSize.ICON_SM),
}

@Composable
public fun JvdmIconButton(
    label: String,
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.GHOST,
    size: IconButtonSize = IconButtonSize.ICON,
    enabled: Boolean = true,
    onClick: () -> Unit = {},
    content: @Composable RowScope.() -> Unit,
) {
    JvdmButton(
        modifier = modifier.semantics { contentDescription = label },
        variant = variant,
        size = size.button,
        enabled = enabled,
        onClick = onClick,
        content = content,
    )
}
