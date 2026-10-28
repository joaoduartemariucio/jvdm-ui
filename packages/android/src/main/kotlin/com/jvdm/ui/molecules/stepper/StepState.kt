package com.jvdm.ui.molecules.stepper

import com.jvdm.ui.tokens.JvdmColorToken

public data class Step(
    public val id: String,
    public val label: String,
    public val description: String? = null,
)

public enum class StepState(
    public val token: String,
    public val dot: JvdmColorToken,
    public val label: JvdmColorToken,
) {
    DONE("done", JvdmColorToken.ACCENT, JvdmColorToken.INK),
    CURRENT("current", JvdmColorToken.ACCENT, JvdmColorToken.INK),
    TODO("todo", JvdmColorToken.RAISED, JvdmColorToken.INK_MUTED),
    ;

    public companion object {
        public fun of(
            index: Int,
            current: Int,
        ): StepState =
            when {
                index < current -> DONE
                index == current -> CURRENT
                else -> TODO
            }
    }
}
