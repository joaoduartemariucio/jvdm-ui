package com.jvdm.ui.molecules.modal

public object ModalLocales {
    public const val LABEL: String = "Dialog"
    public const val CLOSE: String = "Close"
}

public enum class ModalSize(
    public val token: String,
    public val maxWidth: Float,
) {
    SM("sm", 448f),
    MD("md", 672f),
    LG("lg", 896f),
    XL("xl", 1152f),
}
