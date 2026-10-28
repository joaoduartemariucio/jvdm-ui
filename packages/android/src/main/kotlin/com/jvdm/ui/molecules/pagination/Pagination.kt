package com.jvdm.ui.molecules.pagination

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.jvdm.ui.atoms.button.JvdmButton
import com.jvdm.ui.theme.JvdmTokensAccess
import com.jvdm.ui.tokens.JvdmColorToken
import com.jvdm.ui.tokens.JvdmTextStep

@Composable
public fun JvdmPagination(
    page: Int,
    pages: Int,
    onPageChange: (Int) -> Unit,
    modifier: Modifier = Modifier,
    previousLabel: String = PaginationLocales.PREVIOUS,
    nextLabel: String = PaginationLocales.NEXT,
    pageLabel: (Int) -> String = PaginationLocales.page,
    label: String = PaginationLocales.LABEL,
) {
    val scales = JvdmTokensAccess.scales
    val current = clampPage(page, pages)

    FlowRow(
        modifier = modifier.semantics { contentDescription = label },
        horizontalArrangement = Arrangement.spacedBy(scales.spacing(2f).dp),
        verticalArrangement = Arrangement.spacedBy(scales.spacing(2f).dp),
    ) {
        JvdmButton(enabled = current > 1, onClick = { onPageChange(current - 1) }) {
            Text(previousLabel)
        }
        Text(
            text = pageLabel(current),
            modifier =
                Modifier
                    .align(Alignment.CenterVertically)
                    .padding(horizontal = scales.spacing(2f).dp),
            color = JvdmTokensAccess.color(JvdmColorToken.INK_MUTED),
            style = JvdmTokensAccess.textStyle(JvdmTextStep.SM),
        )
        JvdmButton(enabled = current < pages, onClick = { onPageChange(current + 1) }) {
            Text(nextLabel)
        }
    }
}
