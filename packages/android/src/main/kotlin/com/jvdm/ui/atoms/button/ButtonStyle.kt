package com.jvdm.ui.atoms.button

import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmWeightStep

public enum class ButtonVariant(
    public val token: String,
    public val background: JvdmColorToken?,
    public val foreground: JvdmColorToken,
    public val border: JvdmColorToken?,
    public val weight: JvdmWeightStep,
) {
    PRIMARY(
        "primary",
        JvdmColorToken.ACCENT,
        JvdmColorToken.ON_ACCENT,
        null,
        JvdmWeightStep.MEDIUM,
    ),
    SECONDARY(
        "secondary",
        null,
        JvdmColorToken.INK,
        JvdmColorToken.LINE_STRONG,
        JvdmWeightStep.NORMAL,
    ),
    GHOST("ghost", null, JvdmColorToken.INK_MUTED, null, JvdmWeightStep.NORMAL),
    DANGER(
        "danger",
        null,
        JvdmColorToken.DANGER,
        JvdmColorToken.DANGER,
        JvdmWeightStep.NORMAL,
    ),
}

public enum class ButtonSize(
    public val token: String,
    public val horizontal: Float,
    public val vertical: Float,
    public val square: Float?,
    public val text: JvdmTextStep,
) {
    SM("sm", 3f, 2f, null, JvdmTextStep.XS),
    MD("md", 4f, 3f, null, JvdmTextStep.SM),
    LG("lg", 4f, 4f, null, JvdmTextStep.BASE),
    ICON("icon", 0f, 0f, 40f, JvdmTextStep.SM),
    ICON_SM("icon-sm", 0f, 0f, 32f, JvdmTextStep.SM),
}
