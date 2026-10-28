package com.jvdm.ui

import com.jvdm.ui.atoms.progressbar.ProgressSize
import com.jvdm.ui.atoms.progressbar.ProgressTone
import com.jvdm.ui.atoms.spinner.SPINNER_PERIOD_MILLIS
import com.jvdm.ui.atoms.spinner.SPINNER_STROKE
import com.jvdm.ui.atoms.spinner.SpinnerLocales
import com.jvdm.ui.atoms.tag.TagLocales
import com.jvdm.ui.molecules.breadcrumb.BreadcrumbLocales
import com.jvdm.ui.molecules.loaderror.LoadErrorLocales
import com.jvdm.ui.molecules.metriccard.MetricTrend
import com.jvdm.ui.theme.JvdmScales
import com.jvdm.ui.tokens.JvdmColorToken
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.test.assertTrue

public class LocalesTest {
    @Test
    public fun defaultsToEnglishNonEmpty() {
        assertEquals("Loading", SpinnerLocales.LABEL)
        assertEquals("Remove", TagLocales.REMOVE)
        assertEquals("Breadcrumb", BreadcrumbLocales.LABEL)
        assertEquals("Try again", LoadErrorLocales.RETRY)
    }

    @Test
    public fun givesEveryStringAValueAReaderCanSee() {
        val strings =
            listOf(
                SpinnerLocales.LABEL,
                TagLocales.REMOVE,
                BreadcrumbLocales.LABEL,
                LoadErrorLocales.RETRY,
            )
        for (value in strings) {
            assertTrue(value.trim().isNotEmpty())
        }
    }
}

public class ProgressBarTest {
    @Test
    public fun clampsTheValueToTheTrack() {
        assertEquals(0.5f, ProgressSize.ratio(0.5f))
        assertEquals(0f, ProgressSize.ratio(-1f))
        assertEquals(1f, ProgressSize.ratio(9f))
        assertEquals(0f, ProgressSize.ratio(0f))
        assertEquals(1f, ProgressSize.ratio(1f))
    }

    @Test
    public fun carriesTheFourTonesAndTwoSizes() {
        assertEquals(
            listOf("accent", "ok", "warn", "danger"),
            ProgressTone.entries.map { it.token },
        )
        assertEquals(listOf("md", "xs"), ProgressSize.entries.map { it.token })
        assertEquals(2f, ProgressSize.MD.steps)
        assertEquals(1f, ProgressSize.XS.steps)
    }

    @Test
    public fun everyToneDrawsFromThePalette() {
        for (tone in ProgressTone.entries) {
            assertNotEquals(
                JvdmScales.light.argb(tone.fill),
                JvdmScales.light.argb(JvdmColorToken.RAISED),
                tone.token,
            )
        }
    }
}

public class MetricTrendTest {
    @Test
    public fun colorsTheChangeByItsTrend() {
        assertEquals(listOf("neutral", "up", "down"), MetricTrend.entries.map { it.token })
        assertEquals(JvdmColorToken.OK, MetricTrend.UP.color)
        assertEquals(JvdmColorToken.DANGER, MetricTrend.DOWN.color)
        assertEquals(JvdmColorToken.INK_MUTED, MetricTrend.NEUTRAL.color)
    }
}

public class SpinnerTest {
    @Test
    public fun turnsOncePerPeriod() {
        assertEquals(1000, SPINNER_PERIOD_MILLIS)
        assertEquals(2.4f, SPINNER_STROKE)
    }
}
