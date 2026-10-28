package com.jvdm.ui.molecules.pagination

public object PaginationLocales {
    public const val LABEL: String = "Pagination"
    public const val PREVIOUS: String = "Previous"
    public const val NEXT: String = "Next"

    public val page: (Int) -> String = { "Page $it" }
}

public fun clampPage(
    page: Int,
    pages: Int,
): Int = page.coerceIn(1, maxOf(pages, 1))
