package com.jvdm.ui

import com.jvdm.ui.atoms.avatar.AvatarInitials
import com.jvdm.ui.atoms.avatar.AvatarSize
import com.jvdm.ui.atoms.card.CardPadding
import com.jvdm.ui.atoms.label.LabelTone
import com.jvdm.ui.atoms.skeleton.SkeletonOpacity
import com.jvdm.ui.theme.JvdmScales
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

public class AvatarTest {
    @Test
    public fun takesTheFirstAndLastInitialUpperCased() {
        assertEquals("JM", AvatarInitials.of("João Vitor Duarte Mariucio"))
        assertEquals("A", AvatarInitials.of("ada"))
        assertEquals("GH", AvatarInitials.of("  grace   hopper  "))
        assertEquals("", AvatarInitials.of(""))
        assertEquals("", AvatarInitials.of("   "))
    }

    @Test
    public fun sizesSitOnTheScaleTheWebUses() {
        assertEquals(listOf(32f, 40f, 48f), AvatarSize.entries.map { it.points })
        assertEquals(
            listOf(JvdmTextStep.XS, JvdmTextStep.SM, JvdmTextStep.BASE),
            AvatarSize.entries.map { it.text },
        )
        assertEquals(listOf("sm", "md", "lg"), AvatarSize.entries.map { it.token })
    }
}

public class WaveOneScaleTest {
    @Test
    public fun cardPaddingIsWholeStepsOfTheSpacingScale() {
        assertEquals(listOf(0f, 4f, 5f, 6f), CardPadding.entries.map { it.steps })
        assertEquals(listOf("none", "sm", "md", "lg"), CardPadding.entries.map { it.token })
        assertEquals(20f, JvdmScales.light.spacing(CardPadding.MD.steps))
    }

    @Test
    public fun everyLabelToneDrawsFromThePalette() {
        assertEquals(listOf("muted", "dim", "accent"), LabelTone.entries.map { it.token })
        assertEquals(
            listOf(
                JvdmColorToken.INK_MUTED,
                JvdmColorToken.INK_DIM,
                JvdmColorToken.ACCENT_INK,
            ),
            LabelTone.entries.map { it.color },
        )
        for (tone in LabelTone.entries) {
            assertNotEquals(
                JvdmScales.light.argb(tone.color),
                JvdmScales.light.argb(JvdmColorToken.APP),
            )
        }
    }

    @Test
    public fun theSkeletonFadesBetweenTheTwoDocumentedOpacities() {
        assertEquals(1f, SkeletonOpacity.FROM)
        assertEquals(0.5f, SkeletonOpacity.TO)
    }

    @Test
    public fun theKeyCapIsSixStepsWide() {
        assertEquals(24f, JvdmScales.light.spacing(6f))
    }
}
