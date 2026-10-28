package com.jvdm.ui.molecules.statcard

import com.jvdm.ui.tokens.JvdmTextStep

public object StatCardStyle {
    public fun step(value: String): JvdmTextStep =
        when {
            value.length <= 7 -> JvdmTextStep.XXL
            value.length <= 12 -> JvdmTextStep.LG
            else -> JvdmTextStep.SM
        }
}
