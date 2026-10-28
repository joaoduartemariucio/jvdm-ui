package com.jvdm.ui.molecules.accordion

public object AccordionState {
    public fun toggled(
        open: List<String>,
        id: String,
        exclusive: Boolean,
    ): List<String> {
        if (open.contains(id)) {
            return open.filterNot { it == id }
        }
        return if (exclusive) listOf(id) else open + id
    }
}
