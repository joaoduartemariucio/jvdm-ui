package com.jvdm.ui

import com.jvdm.ui.atoms.badge.BadgeStyle
import com.jvdm.ui.atoms.badge.BadgeTone
import com.jvdm.ui.theme.JvdmScales
import com.jvdm.ui.theme.JvdmThemeMode
import com.jvdm.ui.theme.JvdmThemeStorage
import com.jvdm.ui.theme.JvdmThemeStore
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmDurationStep
import com.jvdm.ui.tokens.JvdmEaseStep
import com.jvdm.ui.tokens.JvdmRadiusStep
import com.jvdm.ui.tokens.JvdmShadowStep
import com.jvdm.ui.tokens.JvdmTextStep
import com.jvdm.ui.tokens.JvdmTokens
import com.jvdm.ui.tokens.JvdmTrackingStep
import com.jvdm.ui.tokens.JvdmWeightStep
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

public class JvdmTokensTest {
    @Test
    public fun everyColorResolvesInBothSchemes() {
        for (token in JvdmColorToken.entries) {
            assertNotEquals(JvdmScales.light.argb(token), JvdmScales.dark.argb(token), token.token)
        }
        assertEquals(24, JvdmColorToken.entries.size)
    }

    @Test
    public fun everyScaleIsComplete() {
        assertEquals(JvdmTextStep.entries.size, JvdmTokens.text.size)
        assertEquals(JvdmRadiusStep.entries.size, JvdmTokens.radius.size)
        assertEquals(JvdmEaseStep.entries.size, JvdmTokens.ease.size)
        assertEquals(JvdmDurationStep.entries.size, JvdmTokens.duration.size)
        assertEquals(JvdmShadowStep.entries.size, JvdmTokens.shadow.size)
        assertEquals(JvdmTrackingStep.entries.size, JvdmTokens.tracking.size)
        assertEquals(JvdmWeightStep.entries.size, JvdmTokens.weight.size)
    }

    @Test
    public fun theContractNameSurvivesTheTrip() {
        assertEquals("line-strong", JvdmColorToken.LINE_STRONG.token)
        assertEquals("on-accent", JvdmColorToken.ON_ACCENT.token)
        assertEquals("2xs", JvdmTextStep.XXS.token)
        assertEquals("2xl", JvdmTextStep.XXL.token)
        assertEquals("in-out", JvdmEaseStep.IN_OUT.token)
        assertEquals(JvdmColorToken.LINE_STRONG, JvdmColorToken.of("line-strong"))
    }

    @Test
    public fun theSpacingScaleIsAFourDpBase() {
        assertEquals(4f, JvdmScales.light.spacing(1f))
        assertEquals(2f, JvdmScales.light.spacing(0.5f))
        assertEquals(8f, JvdmScales.light.spacing(2f))
    }

    @Test
    public fun everyColorIsOpaqueArgb() {
        for (token in JvdmColorToken.entries) {
            assertEquals(0xFFL, JvdmScales.light.argb(token) ushr 24, token.token)
        }
    }
}

public class BadgeStyleTest {
    @Test
    public fun carriesTheSixTonesTheContractNames() {
        assertEquals(
            listOf("neutral", "accent", "ok", "warn", "danger", "info"),
            BadgeTone.entries.map { it.name.lowercase() },
        )
    }

    @Test
    public fun pairsTheSameTokensTheWebTablePairs() {
        val expected =
            mapOf(
                BadgeTone.NEUTRAL to (JvdmColorToken.RAISED to JvdmColorToken.INK_SOFT),
                BadgeTone.ACCENT to (JvdmColorToken.ACCENT_SOFT to JvdmColorToken.ACCENT_INK),
                BadgeTone.OK to (JvdmColorToken.OK_SOFT to JvdmColorToken.OK),
                BadgeTone.WARN to (JvdmColorToken.WARN_SOFT to JvdmColorToken.WARN),
                BadgeTone.DANGER to (JvdmColorToken.DANGER_SOFT to JvdmColorToken.DANGER),
                BadgeTone.INFO to (JvdmColorToken.INFO_SOFT to JvdmColorToken.INFO),
            )

        for (tone in BadgeTone.entries) {
            assertEquals(expected[tone]?.first, tone.background)
            assertEquals(expected[tone]?.second, tone.foreground)
        }
    }

    @Test
    public fun staysOnTheScaleRFiveNames() {
        val style = BadgeStyle.resolve(JvdmScales.light, BadgeTone.NEUTRAL)
        assertEquals(3f, style.radius)
        assertEquals(8f, style.horizontalPadding)
        assertEquals(2f, style.verticalPadding)
        assertEquals(11f, style.fontSize)
        assertEquals(500, style.weight)
    }

    @Test
    public fun repaintsEveryToneWhenTheSchemeFlips() {
        for (tone in BadgeTone.entries) {
            assertNotEquals(
                BadgeStyle.resolve(JvdmScales.light, tone).background,
                BadgeStyle.resolve(JvdmScales.dark, tone).background,
            )
        }
    }

    @Test
    public fun neverPaintsTheLabelInTheBackgroundColor() {
        for (scales in listOf(JvdmScales.light, JvdmScales.dark)) {
            for (tone in BadgeTone.entries) {
                val style = BadgeStyle.resolve(scales, tone)
                assertNotEquals(style.background, style.foreground)
            }
        }
    }
}

public class JvdmThemeStoreTest {
    private class Memory : JvdmThemeStorage {
        val entries: MutableMap<String, String> = mutableMapOf()

        override fun read(key: String): String? = entries[key]

        override fun write(key: String, value: String) {
            entries[key] = value
        }

        override fun remove(key: String) {
            entries.remove(key)
        }
    }

    @Test
    public fun usesTheKeyTheWebWrites() {
        assertEquals("jvdm-ui.theme", JvdmThemeStore.STORAGE_KEY)
    }

    @Test
    public fun readsNothingStoredAsFollowingTheSystem() {
        assertEquals(JvdmThemeMode.SYSTEM, JvdmThemeStore(Memory()).read())
    }

    @Test
    public fun roundTripsLightAndDark() {
        val store = JvdmThemeStore(Memory())
        for (mode in listOf(JvdmThemeMode.LIGHT, JvdmThemeMode.DARK)) {
            store.write(mode)
            assertEquals(mode, store.read())
        }
    }

    @Test
    public fun clearsTheKeyForSystem() {
        val storage = Memory()
        val store = JvdmThemeStore(storage)
        store.write(JvdmThemeMode.DARK)
        store.write(JvdmThemeMode.SYSTEM)
        assertFalse(storage.entries.containsKey(JvdmThemeStore.STORAGE_KEY))
        assertNull(storage.entries[JvdmThemeStore.STORAGE_KEY])
        assertEquals(JvdmThemeMode.SYSTEM, store.read())
    }

    @Test
    public fun readsAValueTheWebNeverWritesAsSystem() {
        val storage = Memory()
        storage.write(JvdmThemeStore.STORAGE_KEY, "sepia")
        assertEquals(JvdmThemeMode.SYSTEM, JvdmThemeStore(storage).read())
        assertTrue(storage.entries.isNotEmpty())
    }
}
