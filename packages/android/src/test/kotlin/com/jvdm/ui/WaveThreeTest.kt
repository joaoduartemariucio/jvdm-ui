package com.jvdm.ui

import com.jvdm.ui.molecules.banner.NoticeTone
import com.jvdm.ui.molecules.statcard.StatCardStyle
import com.jvdm.ui.molecules.stepper.StepState
import com.jvdm.ui.theme.JvdmScales
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

public class NoticeToneTest {
    @Test
    public fun carriesTheFourTonesTheContractNames() {
        assertEquals(listOf("info", "ok", "warn", "danger"), NoticeTone.entries.map { it.token })
    }

    @Test
    public fun pairsEachToneWithItsOwnSoftBackground() {
        for (tone in NoticeTone.entries) {
            assertEquals("${tone.foreground.token}-soft", tone.background.token)
        }
    }

    @Test
    public fun keepsTheTextReadableAgainstItsOwnBackground() {
        for (scales in listOf(JvdmScales.light, JvdmScales.dark)) {
            for (tone in NoticeTone.entries) {
                assertNotEquals(
                    scales.argb(tone.foreground),
                    scales.argb(tone.background),
                    tone.token,
                )
            }
        }
    }

    @Test
    public fun drawsTheBorderFromTheTextColor() {
        assertEquals(0.4f, NoticeTone.BORDER_OPACITY)
    }
}

public class StatCardStyleTest {
    @Test
    public fun shrinksTheValueStepAsTheValueGrows() {
        assertEquals(JvdmTextStep.XXL, StatCardStyle.step("42"))
        assertEquals(JvdmTextStep.XXL, StatCardStyle.step("1234567"))
        assertEquals(JvdmTextStep.LG, StatCardStyle.step("12345678"))
        assertEquals(JvdmTextStep.LG, StatCardStyle.step("123456789012"))
        assertEquals(JvdmTextStep.SM, StatCardStyle.step("1234567890123"))
        assertEquals(JvdmTextStep.XXL, StatCardStyle.step(""))
    }
}

public class StepStateTest {
    @Test
    public fun readsAStepStateFromItsIndexAgainstTheCurrentOne() {
        assertEquals(StepState.DONE, StepState.of(0, 1))
        assertEquals(StepState.CURRENT, StepState.of(1, 1))
        assertEquals(StepState.TODO, StepState.of(2, 1))
        assertEquals(StepState.CURRENT, StepState.of(0, 0))
    }

    @Test
    public fun marksOnlyTheUntouchedStepsAsMuted() {
        assertEquals(listOf("done", "current", "todo"), StepState.entries.map { it.token })
        assertEquals(JvdmColorToken.RAISED, StepState.TODO.dot)
        assertEquals(JvdmColorToken.INK_MUTED, StepState.TODO.label)
        assertEquals(JvdmColorToken.ACCENT, StepState.DONE.dot)
    }
}
