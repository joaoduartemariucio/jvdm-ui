package com.jvdm.ui.atoms.avatar

import com.jvdm.ui.tokens.JvdmTextStep

public enum class AvatarSize(
    public val token: String,
    public val points: Float,
    public val text: JvdmTextStep,
) {
    SM("sm", 32f, JvdmTextStep.XS),
    MD("md", 40f, JvdmTextStep.SM),
    LG("lg", 48f, JvdmTextStep.BASE),
}
