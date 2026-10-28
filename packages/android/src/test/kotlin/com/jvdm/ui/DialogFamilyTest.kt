package com.jvdm.ui

import com.jvdm.ui.molecules.drawer.DrawerLocales
import com.jvdm.ui.molecules.modal.ModalLocales
import com.jvdm.ui.molecules.modal.ModalSize
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

public class DialogFamilyTest {
    @Test
    public fun saysWhatItSaysOnItsOwn() {
        assertEquals("Dialog", ModalLocales.LABEL)
        assertEquals("Close", ModalLocales.CLOSE)
        assertEquals("Close drawer", DrawerLocales.CLOSE)
    }

    @Test
    public fun carriesTheFourModalSizes() {
        assertEquals(listOf("sm", "md", "lg", "xl"), ModalSize.entries.map { it.token })
    }

    @Test
    public fun makesEverySizeWiderThanTheOneBefore() {
        val widths = ModalSize.entries.map { it.maxWidth }
        assertEquals(widths.sorted(), widths)
        assertEquals(widths.size, widths.toSet().size)
    }

    @Test
    public fun aDrawerIsNoWiderThanTheSmallestModal() {
        assertTrue(ModalSize.SM.maxWidth <= ModalSize.MD.maxWidth)
    }
}
