package com.jvdm.ui.atoms.link

import androidx.compose.foundation.clickable
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextDecoration
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep

public enum class LinkTone(
    public val token: String,
    public val color: JvdmColorToken,
    public val underline: JvdmColorToken,
) {
    ACCENT("accent", JvdmColorToken.ACCENT_INK, JvdmColorToken.ACCENT),
    INK("ink", JvdmColorToken.INK, JvdmColorToken.LINE_STRONG),
    MUTED("muted", JvdmColorToken.INK_MUTED, JvdmColorToken.LINE),
}

@Composable
public fun JvdmLink(
    text: String,
    modifier: Modifier = Modifier,
    tone: LinkTone = LinkTone.ACCENT,
    onClick: () -> Unit = {},
) {
    Text(
        text = text,
        modifier = modifier.clickable(onClick = onClick),
        color = JvdmTokensAccess.color(tone.color),
        style =
            JvdmTokensAccess.textStyle(JvdmTextStep.SM).copy(
                textDecoration = TextDecoration.Underline,
            ),
    )
}
