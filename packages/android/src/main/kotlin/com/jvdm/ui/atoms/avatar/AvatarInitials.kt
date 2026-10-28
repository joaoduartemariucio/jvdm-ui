package com.jvdm.ui.atoms.avatar

public object AvatarInitials {
    public fun of(name: String): String {
        val parts = name.trim().split(Regex("\\s+")).filter { it.isNotEmpty() }
        if (parts.isEmpty()) {
            return ""
        }
        val first = parts.first().first()
        val last = if (parts.size > 1) parts.last().first().toString() else ""
        return (first + last).uppercase()
    }
}
