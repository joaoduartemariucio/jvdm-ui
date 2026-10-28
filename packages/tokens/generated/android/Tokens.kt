package com.jvdm.ui.tokens

public data class JvdmOklch(
    public val l: Float,
    public val c: Float,
    public val h: Float,
    public val alpha: Float = 1f,
)

public data class JvdmRgb(
    public val red: Float,
    public val green: Float,
    public val blue: Float,
    public val alpha: Float = 1f,
)

public data class JvdmColorValue(
    public val oklch: JvdmOklch,
    public val srgb: JvdmRgb,
    public val displayP3: JvdmRgb,
    public val argb: Long,
)

public data class JvdmColorPair(
    public val light: JvdmColorValue,
    public val dark: JvdmColorValue,
)

public data class JvdmTextSize(
    public val size: Float,
    public val lineHeight: Float,
)

public data class JvdmBezier(
    public val x1: Float,
    public val y1: Float,
    public val x2: Float,
    public val y2: Float,
)

public data class JvdmShadowLayer(
    public val x: Float,
    public val y: Float,
    public val blur: Float,
    public val spread: Float,
    public val color: JvdmColorPair,
)

public enum class JvdmColorToken(public val token: String) {
    APP("app"),
    RAIL("rail"),
    PANEL("panel"),
    SURFACE("surface"),
    FIELD("field"),
    RAISED("raised"),
    LINE("line"),
    LINE_STRONG("line-strong"),
    INK("ink"),
    INK_SOFT("ink-soft"),
    INK_MUTED("ink-muted"),
    INK_DIM("ink-dim"),
    ACCENT("accent"),
    ACCENT_INK("accent-ink"),
    ACCENT_SOFT("accent-soft"),
    ON_ACCENT("on-accent"),
    OK("ok"),
    OK_SOFT("ok-soft"),
    WARN("warn"),
    WARN_SOFT("warn-soft"),
    DANGER("danger"),
    DANGER_SOFT("danger-soft"),
    INFO("info"),
    INFO_SOFT("info-soft"),
    ;

    public companion object {
        public fun of(token: String): JvdmColorToken = entries.first { it.token == token }
    }
}

public enum class JvdmTextStep(public val token: String) {
    XXS("2xs"),
    XS("xs"),
    SM("sm"),
    BASE("base"),
    LG("lg"),
    XL("xl"),
    XXL("2xl"),
    DISPLAY("display"),
    ;

    public companion object {
        public fun of(token: String): JvdmTextStep = entries.first { it.token == token }
    }
}

public enum class JvdmTrackingStep(public val token: String) {
    CAPS("caps"),
    CODE("code"),
    TIGHT("tight"),
    DISPLAY("display"),
    ;

    public companion object {
        public fun of(token: String): JvdmTrackingStep = entries.first { it.token == token }
    }
}

public enum class JvdmWeightStep(public val token: String) {
    NORMAL("normal"),
    MEDIUM("medium"),
    BOLD("bold"),
    ;

    public companion object {
        public fun of(token: String): JvdmWeightStep = entries.first { it.token == token }
    }
}

public enum class JvdmRadiusStep(public val token: String) {
    XS("xs"),
    SM("sm"),
    MD("md"),
    LG("lg"),
    XL("xl"),
    ;

    public companion object {
        public fun of(token: String): JvdmRadiusStep = entries.first { it.token == token }
    }
}

public enum class JvdmEaseStep(public val token: String) {
    OUT("out"),
    IN_OUT("in-out"),
    OVER("over"),
    ;

    public companion object {
        public fun of(token: String): JvdmEaseStep = entries.first { it.token == token }
    }
}

public enum class JvdmDurationStep(public val token: String) {
    INSTANT("instant"),
    FAST("fast"),
    BASE("base"),
    SLOW("slow"),
    ;

    public companion object {
        public fun of(token: String): JvdmDurationStep = entries.first { it.token == token }
    }
}

public enum class JvdmShadowStep(public val token: String) {
    RAISED("raised"),
    POPOVER("popover"),
    MODAL("modal"),
    ;

    public companion object {
        public fun of(token: String): JvdmShadowStep = entries.first { it.token == token }
    }
}

public object JvdmTokens {
    public val fontSans: List<String> = listOf("ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif")
    public val fontMono: List<String> = listOf("ui-monospace", "SF Mono", "JetBrains Mono", "Menlo", "Consolas", "monospace")

    public val spacing: Float = 4f

    public val colors: Map<JvdmColorToken, JvdmColorPair> = mapOf(
        JvdmColorToken.APP to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.965f, 0.012f, 78f, 1f), JvdmRgb(0.972549f, 0.952941f, 0.921569f, 1f), JvdmRgb(0.968627f, 0.952941f, 0.92549f, 1f), 0xFFF8F3EBL),
            JvdmColorValue(JvdmOklch(0.18f, 0.015f, 78f, 1f), JvdmRgb(0.082353f, 0.066667f, 0.039216f, 1f), JvdmRgb(0.082353f, 0.066667f, 0.043137f, 1f), 0xFF15110AL),
        ),
        JvdmColorToken.RAIL to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.945f, 0.014f, 78f, 1f), JvdmRgb(0.94902f, 0.92549f, 0.890196f, 1f), JvdmRgb(0.945098f, 0.92549f, 0.894118f, 1f), 0xFFF2ECE3L),
            JvdmColorValue(JvdmOklch(0.15f, 0.018f, 78f, 1f), JvdmRgb(0.058824f, 0.039216f, 0.015686f, 1f), JvdmRgb(0.058824f, 0.039216f, 0.019608f, 1f), 0xFF0F0A04L),
        ),
        JvdmColorToken.PANEL to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.95f, 0.01f, 78f, 1f), JvdmRgb(0.94902f, 0.933333f, 0.905882f, 1f), JvdmRgb(0.945098f, 0.933333f, 0.909804f, 1f), 0xFFF2EEE7L),
            JvdmColorValue(JvdmOklch(0.17f, 0.016f, 78f, 1f), JvdmRgb(0.07451f, 0.058824f, 0.031373f, 1f), JvdmRgb(0.07451f, 0.058824f, 0.031373f, 1f), 0xFF130F08L),
        ),
        JvdmColorToken.SURFACE to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.99f, 0.008f, 78f, 1f), JvdmRgb(1f, 0.984314f, 0.964706f, 1f), JvdmRgb(0.996078f, 0.984314f, 0.964706f, 1f), 0xFFFFFBF6L),
            JvdmColorValue(JvdmOklch(0.23f, 0.015f, 78f, 1f), JvdmRgb(0.129412f, 0.109804f, 0.082353f, 1f), JvdmRgb(0.12549f, 0.109804f, 0.086275f, 1f), 0xFF211C15L),
        ),
        JvdmColorToken.FIELD to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.98f, 0.008f, 78f, 1f), JvdmRgb(0.984314f, 0.972549f, 0.952941f, 1f), JvdmRgb(0.984314f, 0.972549f, 0.952941f, 1f), 0xFFFBF8F3L),
            JvdmColorValue(JvdmOklch(0.215f, 0.015f, 78f, 1f), JvdmRgb(0.113725f, 0.098039f, 0.070588f, 1f), JvdmRgb(0.113725f, 0.098039f, 0.070588f, 1f), 0xFF1D1912L),
        ),
        JvdmColorToken.RAISED to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.93f, 0.012f, 78f, 1f), JvdmRgb(0.92549f, 0.905882f, 0.87451f, 1f), JvdmRgb(0.921569f, 0.905882f, 0.878431f, 1f), 0xFFECE7DFL),
            JvdmColorValue(JvdmOklch(0.3f, 0.02f, 78f, 1f), JvdmRgb(0.2f, 0.176471f, 0.137255f, 1f), JvdmRgb(0.196078f, 0.176471f, 0.141176f, 1f), 0xFF332D23L),
        ),
        JvdmColorToken.LINE to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.89f, 0.015f, 78f, 1f), JvdmRgb(0.878431f, 0.854902f, 0.815686f, 1f), JvdmRgb(0.87451f, 0.854902f, 0.819608f, 1f), 0xFFE0DAD0L),
            JvdmColorValue(JvdmOklch(0.275f, 0.018f, 78f, 1f), JvdmRgb(0.176471f, 0.152941f, 0.117647f, 1f), JvdmRgb(0.172549f, 0.152941f, 0.121569f, 1f), 0xFF2D271EL),
        ),
        JvdmColorToken.LINE_STRONG to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.82f, 0.018f, 78f, 1f), JvdmRgb(0.796078f, 0.764706f, 0.717647f, 1f), JvdmRgb(0.788235f, 0.764706f, 0.72549f, 1f), 0xFFCBC3B7L),
            JvdmColorValue(JvdmOklch(0.35f, 0.02f, 78f, 1f), JvdmRgb(0.25098f, 0.223529f, 0.184314f, 1f), JvdmRgb(0.247059f, 0.227451f, 0.188235f, 1f), 0xFF40392FL),
        ),
        JvdmColorToken.INK to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.23f, 0.02f, 78f, 1f), JvdmRgb(0.133333f, 0.109804f, 0.070588f, 1f), JvdmRgb(0.129412f, 0.109804f, 0.07451f, 1f), 0xFF221C12L),
            JvdmColorValue(JvdmOklch(0.95f, 0.01f, 78f, 1f), JvdmRgb(0.94902f, 0.933333f, 0.905882f, 1f), JvdmRgb(0.945098f, 0.933333f, 0.909804f, 1f), 0xFFF2EEE7L),
        ),
        JvdmColorToken.INK_SOFT to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.36f, 0.018f, 78f, 1f), JvdmRgb(0.258824f, 0.235294f, 0.2f, 1f), JvdmRgb(0.254902f, 0.235294f, 0.203922f, 1f), 0xFF423C33L),
            JvdmColorValue(JvdmOklch(0.82f, 0.016f, 78f, 1f), JvdmRgb(0.792157f, 0.764706f, 0.72549f, 1f), JvdmRgb(0.788235f, 0.764706f, 0.729412f, 1f), 0xFFCAC3B9L),
        ),
        JvdmColorToken.INK_MUTED to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.51f, 0.014f, 78f, 1f), JvdmRgb(0.419608f, 0.396078f, 0.364706f, 1f), JvdmRgb(0.415686f, 0.396078f, 0.368627f, 1f), 0xFF6B655DL),
            JvdmColorValue(JvdmOklch(0.65f, 0.012f, 78f, 1f), JvdmRgb(0.576471f, 0.556863f, 0.529412f, 1f), JvdmRgb(0.572549f, 0.560784f, 0.533333f, 1f), 0xFF938E87L),
        ),
        JvdmColorToken.INK_DIM to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.56f, 0.012f, 78f, 1f), JvdmRgb(0.470588f, 0.454902f, 0.427451f, 1f), JvdmRgb(0.470588f, 0.454902f, 0.427451f, 1f), 0xFF78746DL),
            JvdmColorValue(JvdmOklch(0.57f, 0.012f, 78f, 1f), JvdmRgb(0.482353f, 0.466667f, 0.439216f, 1f), JvdmRgb(0.478431f, 0.466667f, 0.439216f, 1f), 0xFF7B7770L),
        ),
        JvdmColorToken.ACCENT to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.25f, 0.025f, 78f, 1f), JvdmRgb(0.156863f, 0.12549f, 0.078431f, 1f), JvdmRgb(0.152941f, 0.129412f, 0.082353f, 1f), 0xFF282014L),
            JvdmColorValue(JvdmOklch(0.94f, 0.015f, 78f, 1f), JvdmRgb(0.945098f, 0.917647f, 0.878431f, 1f), JvdmRgb(0.941176f, 0.917647f, 0.882353f, 1f), 0xFFF1EAE0L),
        ),
        JvdmColorToken.ACCENT_INK to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.33f, 0.022f, 78f, 1f), JvdmRgb(0.235294f, 0.203922f, 0.160784f, 1f), JvdmRgb(0.227451f, 0.203922f, 0.164706f, 1f), 0xFF3C3429L),
            JvdmColorValue(JvdmOklch(0.87f, 0.018f, 78f, 1f), JvdmRgb(0.858824f, 0.827451f, 0.780392f, 1f), JvdmRgb(0.85098f, 0.827451f, 0.788235f, 1f), 0xFFDBD3C7L),
        ),
        JvdmColorToken.ACCENT_SOFT to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.92f, 0.025f, 78f, 1f), JvdmRgb(0.933333f, 0.890196f, 0.827451f, 1f), JvdmRgb(0.92549f, 0.890196f, 0.831373f, 1f), 0xFFEEE3D3L),
            JvdmColorValue(JvdmOklch(0.29f, 0.02f, 78f, 1f), JvdmRgb(0.192157f, 0.164706f, 0.12549f, 1f), JvdmRgb(0.188235f, 0.164706f, 0.129412f, 1f), 0xFF312A20L),
        ),
        JvdmColorToken.ON_ACCENT to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.99f, 0.008f, 78f, 1f), JvdmRgb(1f, 0.984314f, 0.964706f, 1f), JvdmRgb(0.996078f, 0.984314f, 0.964706f, 1f), 0xFFFFFBF6L),
            JvdmColorValue(JvdmOklch(0.16f, 0.018f, 78f, 1f), JvdmRgb(0.070588f, 0.047059f, 0.019608f, 1f), JvdmRgb(0.066667f, 0.05098f, 0.023529f, 1f), 0xFF120C05L),
        ),
        JvdmColorToken.OK to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.5f, 0.13f, 155f, 1f), JvdmRgb(0f, 0.470588f, 0.25098f, 1f), JvdmRgb(0.184314f, 0.462745f, 0.27451f, 1f), 0xFF007840L),
            JvdmColorValue(JvdmOklch(0.78f, 0.12f, 155f, 1f), JvdmRgb(0.45098f, 0.807843f, 0.584314f, 1f), JvdmRgb(0.537255f, 0.8f, 0.603922f, 1f), 0xFF73CE95L),
        ),
        JvdmColorToken.OK_SOFT to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.94f, 0.04f, 155f, 1f), JvdmRgb(0.843137f, 0.956863f, 0.878431f, 1f), JvdmRgb(0.866667f, 0.952941f, 0.882353f, 1f), 0xFFD7F4E0L),
            JvdmColorValue(JvdmOklch(0.29f, 0.05f, 155f, 1f), JvdmRgb(0.078431f, 0.2f, 0.12549f, 1f), JvdmRgb(0.109804f, 0.196078f, 0.133333f, 1f), 0xFF143320L),
        ),
        JvdmColorToken.WARN to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.58f, 0.14f, 62f, 1f), JvdmRgb(0.701961f, 0.388235f, 0f, 1f), JvdmRgb(0.658824f, 0.403922f, 0.105882f, 1f), 0xFFB36300L),
            JvdmColorValue(JvdmOklch(0.78f, 0.14f, 62f, 1f), JvdmRgb(0.964706f, 0.631373f, 0.309804f, 1f), JvdmRgb(0.917647f, 0.647059f, 0.372549f, 1f), 0xFFF6A14FL),
        ),
        JvdmColorToken.WARN_SOFT to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.94f, 0.05f, 62f, 1f), JvdmRgb(1f, 0.898039f, 0.792157f, 1f), JvdmRgb(1f, 0.901961f, 0.803922f, 1f), 0xFFFFE5CAL),
            JvdmColorValue(JvdmOklch(0.31f, 0.06f, 62f, 1f), JvdmRgb(0.27451f, 0.160784f, 0.043137f, 1f), JvdmRgb(0.254902f, 0.164706f, 0.066667f, 1f), 0xFF46290BL),
        ),
        JvdmColorToken.DANGER to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.51f, 0.21f, 22f, 1f), JvdmRgb(0.760784f, 0f, 0.156863f, 1f), JvdmRgb(0.694118f, 0.12549f, 0.184314f, 1f), 0xFFC20028L),
            JvdmColorValue(JvdmOklch(0.7f, 0.18f, 22f, 1f), JvdmRgb(0.980392f, 0.407843f, 0.415686f, 1f), JvdmRgb(0.913725f, 0.443137f, 0.431373f, 1f), 0xFFFA686AL),
        ),
        JvdmColorToken.DANGER_SOFT to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.94f, 0.05f, 22f, 1f), JvdmRgb(1f, 0.87451f, 0.862745f, 1f), JvdmRgb(1f, 0.878431f, 0.866667f, 1f), 0xFFFFDFDCL),
            JvdmColorValue(JvdmOklch(0.29f, 0.07f, 22f, 1f), JvdmRgb(0.282353f, 0.105882f, 0.105882f, 1f), JvdmRgb(0.262745f, 0.113725f, 0.109804f, 1f), 0xFF481B1BL),
        ),
        JvdmColorToken.INFO to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.5f, 0.14f, 250f, 1f), JvdmRgb(0.015686f, 0.396078f, 0.686275f, 1f), JvdmRgb(0.168627f, 0.392157f, 0.662745f, 1f), 0xFF0465AFL),
            JvdmColorValue(JvdmOklch(0.72f, 0.11f, 245f, 1f), JvdmRgb(0.4f, 0.670588f, 0.898039f, 1f), JvdmRgb(0.462745f, 0.666667f, 0.878431f, 1f), 0xFF66ABE5L),
        ),
        JvdmColorToken.INFO_SOFT to JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.94f, 0.035f, 250f, 1f), JvdmRgb(0.854902f, 0.933333f, 1f, 1f), JvdmRgb(0.870588f, 0.929412f, 1f, 1f), 0xFFDAEEFFL),
            JvdmColorValue(JvdmOklch(0.29f, 0.055f, 245f, 1f), JvdmRgb(0.062745f, 0.180392f, 0.270588f, 1f), JvdmRgb(0.094118f, 0.176471f, 0.262745f, 1f), 0xFF102E45L),
        ),
    )

    public val text: Map<JvdmTextStep, JvdmTextSize> = mapOf(
        JvdmTextStep.XXS to JvdmTextSize(11f, 1.45f),
        JvdmTextStep.XS to JvdmTextSize(12f, 1.45f),
        JvdmTextStep.SM to JvdmTextSize(13f, 1.5f),
        JvdmTextStep.BASE to JvdmTextSize(15f, 1.55f),
        JvdmTextStep.LG to JvdmTextSize(18f, 1.45f),
        JvdmTextStep.XL to JvdmTextSize(23f, 1.3f),
        JvdmTextStep.XXL to JvdmTextSize(29f, 1.2f),
        JvdmTextStep.DISPLAY to JvdmTextSize(58f, 0.98f),
    )

    public val tracking: Map<JvdmTrackingStep, Float> = mapOf(
        JvdmTrackingStep.CAPS to 0.06f,
        JvdmTrackingStep.CODE to 0.4f,
        JvdmTrackingStep.TIGHT to -0.015f,
        JvdmTrackingStep.DISPLAY to -0.025f,
    )

    public val weight: Map<JvdmWeightStep, Int> = mapOf(
        JvdmWeightStep.NORMAL to 400,
        JvdmWeightStep.MEDIUM to 500,
        JvdmWeightStep.BOLD to 700,
    )

    public val radius: Map<JvdmRadiusStep, Float> = mapOf(
        JvdmRadiusStep.XS to 3f,
        JvdmRadiusStep.SM to 5f,
        JvdmRadiusStep.MD to 8f,
        JvdmRadiusStep.LG to 12f,
        JvdmRadiusStep.XL to 20f,
    )

    public val ease: Map<JvdmEaseStep, JvdmBezier> = mapOf(
        JvdmEaseStep.OUT to JvdmBezier(0.16f, 1f, 0.3f, 1f),
        JvdmEaseStep.IN_OUT to JvdmBezier(0.65f, 0f, 0.35f, 1f),
        JvdmEaseStep.OVER to JvdmBezier(0.34f, 1.42f, 0.64f, 1f),
    )

    public val duration: Map<JvdmDurationStep, Int> = mapOf(
        JvdmDurationStep.INSTANT to 90,
        JvdmDurationStep.FAST to 160,
        JvdmDurationStep.BASE to 240,
        JvdmDurationStep.SLOW to 420,
    )

    public val shadow: Map<JvdmShadowStep, List<JvdmShadowLayer>> = mapOf(
        JvdmShadowStep.RAISED to listOf(
            JvdmShadowLayer(0f, 1f, 1f, 0f, JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.23f, 0.02f, 78f, 0.05f), JvdmRgb(0.133333f, 0.109804f, 0.070588f, 0.05f), JvdmRgb(0.129412f, 0.109804f, 0.07451f, 0.05f), 0x0D221C12L),
            JvdmColorValue(JvdmOklch(0f, 0f, 0f, 0.36f), JvdmRgb(0f, 0f, 0f, 0.36f), JvdmRgb(0f, 0f, 0f, 0.36f), 0x5C000000L),
        )),
            JvdmShadowLayer(0f, 2f, 4f, -1f, JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.23f, 0.02f, 78f, 0.06f), JvdmRgb(0.133333f, 0.109804f, 0.070588f, 0.06f), JvdmRgb(0.129412f, 0.109804f, 0.07451f, 0.06f), 0x0F221C12L),
            JvdmColorValue(JvdmOklch(0f, 0f, 0f, 0.4f), JvdmRgb(0f, 0f, 0f, 0.4f), JvdmRgb(0f, 0f, 0f, 0.4f), 0x66000000L),
        )),
        ),
        JvdmShadowStep.POPOVER to listOf(
            JvdmShadowLayer(0f, 2f, 4f, -2f, JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.23f, 0.02f, 78f, 0.06f), JvdmRgb(0.133333f, 0.109804f, 0.070588f, 0.06f), JvdmRgb(0.129412f, 0.109804f, 0.07451f, 0.06f), 0x0F221C12L),
            JvdmColorValue(JvdmOklch(0f, 0f, 0f, 0.4f), JvdmRgb(0f, 0f, 0f, 0.4f), JvdmRgb(0f, 0f, 0f, 0.4f), 0x66000000L),
        )),
            JvdmShadowLayer(0f, 10f, 24f, -6f, JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.23f, 0.02f, 78f, 0.12f), JvdmRgb(0.133333f, 0.109804f, 0.070588f, 0.12f), JvdmRgb(0.129412f, 0.109804f, 0.07451f, 0.12f), 0x1F221C12L),
            JvdmColorValue(JvdmOklch(0f, 0f, 0f, 0.52f), JvdmRgb(0f, 0f, 0f, 0.52f), JvdmRgb(0f, 0f, 0f, 0.52f), 0x85000000L),
        )),
        ),
        JvdmShadowStep.MODAL to listOf(
            JvdmShadowLayer(0f, 4f, 10f, -4f, JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.23f, 0.02f, 78f, 0.08f), JvdmRgb(0.133333f, 0.109804f, 0.070588f, 0.08f), JvdmRgb(0.129412f, 0.109804f, 0.07451f, 0.08f), 0x14221C12L),
            JvdmColorValue(JvdmOklch(0f, 0f, 0f, 0.44f), JvdmRgb(0f, 0f, 0f, 0.44f), JvdmRgb(0f, 0f, 0f, 0.44f), 0x70000000L),
        )),
            JvdmShadowLayer(0f, 28f, 64f, -16f, JvdmColorPair(
            JvdmColorValue(JvdmOklch(0.23f, 0.02f, 78f, 0.18f), JvdmRgb(0.133333f, 0.109804f, 0.070588f, 0.18f), JvdmRgb(0.129412f, 0.109804f, 0.07451f, 0.18f), 0x2E221C12L),
            JvdmColorValue(JvdmOklch(0f, 0f, 0f, 0.64f), JvdmRgb(0f, 0f, 0f, 0.64f), JvdmRgb(0f, 0f, 0f, 0.64f), 0xA3000000L),
        )),
        ),
    )
}
