package com.jvdm.ui.atoms.input

public enum class ControlSize(
    public val token: String,
    public val horizontal: Float,
    public val vertical: Float,
) {
    SM("sm", 3f, 2f),
    MD("md", 4f, 3f),
}
