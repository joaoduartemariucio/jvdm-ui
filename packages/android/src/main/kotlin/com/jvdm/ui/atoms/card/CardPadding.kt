package com.jvdm.ui.atoms.card

public enum class CardPadding(
    public val token: String,
    public val steps: Float,
) {
    NONE("none", 0f),
    SM("sm", 4f),
    MD("md", 5f),
    LG("lg", 6f),
}
