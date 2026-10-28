package com.jvdm.ui

import com.jvdm.ui.atoms.thumb.THUMB_RATIO
import com.jvdm.ui.molecules.accordion.AccordionState
import com.jvdm.ui.molecules.pagination.PaginationLocales
import com.jvdm.ui.molecules.pagination.clampPage
import com.jvdm.ui.molecules.tabs.TabsLocales
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

public class PaginationTest {
    @Test
    public fun saysFourThingsOnItsOwnOneWithThePageNumber() {
        assertEquals("Pagination", PaginationLocales.LABEL)
        assertEquals("Previous", PaginationLocales.PREVIOUS)
        assertEquals("Next", PaginationLocales.NEXT)
        assertEquals("Page 3", PaginationLocales.page(3))
    }

    @Test
    public fun readsTheNumberThePageStringIsGiven() {
        assertEquals("Page 1", PaginationLocales.page(1))
        assertEquals("Page 42", PaginationLocales.page(42))
        assertNotEquals(PaginationLocales.page(1), PaginationLocales.page(2))
    }

    @Test
    public fun clampsThePageIntoTheRange() {
        assertEquals(1, clampPage(0, 5))
        assertEquals(3, clampPage(3, 5))
        assertEquals(5, clampPage(9, 5))
        assertEquals(1, clampPage(1, 0))
    }
}

public class AccordionStateTest {
    @Test
    public fun opensAndClosesARow() {
        assertEquals(listOf("a"), AccordionState.toggled(emptyList(), "a", exclusive = false))
        assertEquals(emptyList(), AccordionState.toggled(listOf("a"), "a", exclusive = false))
    }

    @Test
    public fun keepsTheOthersOpenUnlessItIsExclusive() {
        assertEquals(
            listOf("a", "b"),
            AccordionState.toggled(listOf("a"), "b", exclusive = false),
        )
        assertEquals(listOf("b"), AccordionState.toggled(listOf("a"), "b", exclusive = true))
        assertEquals(
            listOf("b"),
            AccordionState.toggled(listOf("a", "b"), "a", exclusive = true),
        )
    }
}

public class TabsThumbTest {
    @Test
    public fun tabsSayTheirOwnLabel() {
        assertEquals("Tabs", TabsLocales.LABEL)
    }

    @Test
    public fun aThumbKeepsTheFourByThreeFrame() {
        assertEquals(4f / 3f, THUMB_RATIO)
    }
}
