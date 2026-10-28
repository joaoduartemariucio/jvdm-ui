package com.jvdm.ui

import com.jvdm.ui.atoms.button.ButtonSize
import com.jvdm.ui.atoms.button.ButtonVariant
import com.jvdm.ui.atoms.checkbox.ChoiceStyle
import com.jvdm.ui.atoms.iconbutton.IconButtonSize
import com.jvdm.ui.atoms.input.ControlSize
import com.jvdm.ui.atoms.link.LinkTone
import com.jvdm.ui.atoms.slider.SliderStyle
import com.jvdm.ui.atoms.switch.SwitchStyle
import com.jvdm.ui.theme.JvdmScales
import com.jvdm.ui.tokens.JvdmColorToken
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.test.assertNull

public class ButtonScaleTest {
    @Test
    public fun carriesTheFourVariantsAndFiveSizes() {
        assertEquals(
            listOf("primary", "secondary", "ghost", "danger"),
            ButtonVariant.entries.map { it.token },
        )
        assertEquals(
            listOf("sm", "md", "lg", "icon", "icon-sm"),
            ButtonSize.entries.map { it.token },
        )
    }

    @Test
    public fun paintsABackgroundForThePrimaryVariantAlone() {
        assertEquals(JvdmColorToken.ACCENT, ButtonVariant.PRIMARY.background)
        for (variant in ButtonVariant.entries.filter { it != ButtonVariant.PRIMARY }) {
            assertNull(variant.background)
        }
    }

    @Test
    public fun keepsEveryLabelReadableAgainstWhatItSitsOn() {
        for (variant in ButtonVariant.entries) {
            val background = variant.background ?: JvdmColorToken.SURFACE
            assertNotEquals(
                JvdmScales.light.argb(background),
                JvdmScales.light.argb(variant.foreground),
                variant.token,
            )
        }
    }

    @Test
    public fun makesTheIconSizesSquareAndTheRestPadded() {
        assertEquals(40f, ButtonSize.ICON.square)
        assertEquals(32f, ButtonSize.ICON_SM.square)
        assertNull(ButtonSize.MD.square)
        assertEquals(16f, JvdmScales.light.spacing(ButtonSize.MD.horizontal))
    }

    @Test
    public fun narrowsTheIconButtonToTheTwoSquareSizes() {
        assertEquals(listOf("icon", "icon-sm"), IconButtonSize.entries.map { it.token })
        assertEquals(ButtonSize.ICON, IconButtonSize.ICON.button)
    }
}

public class WaveTwoScaleTest {
    @Test
    public fun padsBothControlSizesInWholeSteps() {
        assertEquals(listOf("sm", "md"), ControlSize.entries.map { it.token })
        for (size in ControlSize.entries) {
            assertEquals(0f, JvdmScales.light.spacing(size.horizontal) % 4f)
            assertEquals(0f, JvdmScales.light.spacing(size.vertical) % 4f)
        }
    }

    @Test
    public fun pairsATextAndAnUnderlineTokenForEachLinkTone() {
        assertEquals(listOf("accent", "ink", "muted"), LinkTone.entries.map { it.token })
        for (tone in LinkTone.entries) {
            assertNotEquals(tone.color, tone.underline)
        }
    }

    @Test
    public fun travelsTheSwitchThumbByTheTrackMinusThumbAndInsets() {
        assertEquals(40f, SwitchStyle.TRACK_WIDTH)
        assertEquals(16f, SwitchStyle.THUMB)
        assertEquals(16f, SwitchStyle.travel)
        assertEquals(JvdmColorToken.ACCENT, SwitchStyle.track(checked = true))
        assertEquals(JvdmColorToken.ON_ACCENT, SwitchStyle.thumb(checked = true))
    }

    @Test
    public fun keepsTheThumbReadableAgainstItsTrack() {
        for (checked in listOf(true, false)) {
            assertNotEquals(
                JvdmScales.dark.argb(SwitchStyle.track(checked)),
                JvdmScales.dark.argb(SwitchStyle.thumb(checked)),
            )
        }
    }

    @Test
    public fun clampsTheSliderRatioToTheTrack() {
        assertEquals(0.5f, SliderStyle.ratio(50f, 0f, 100f))
        assertEquals(0f, SliderStyle.ratio(-10f, 0f, 100f))
        assertEquals(1f, SliderStyle.ratio(999f, 0f, 100f))
        assertEquals(0f, SliderStyle.ratio(5f, 5f, 5f))
        assertEquals(0.5f, SliderStyle.ratio(3f, 1f, 5f))
    }

    @Test
    public fun sharesOneBoxBetweenCheckboxAndRadio() {
        assertEquals(5f, ChoiceStyle.BOX)
        assertEquals(2.5f, ChoiceStyle.DOT)
        assertEquals(20f, JvdmScales.light.spacing(ChoiceStyle.BOX))
        assertEquals(JvdmColorToken.ACCENT, ChoiceStyle.fill(selected = true))
        assertEquals(JvdmColorToken.FIELD, ChoiceStyle.fill(selected = false))
    }
}
