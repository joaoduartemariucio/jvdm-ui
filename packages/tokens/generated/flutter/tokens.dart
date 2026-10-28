class JvdmOklch {
  const JvdmOklch(this.l, this.c, this.h, [this.alpha = 1.0]);

  final double l;
  final double c;
  final double h;
  final double alpha;
}

class JvdmRgb {
  const JvdmRgb(this.red, this.green, this.blue, [this.alpha = 1.0]);

  final double red;
  final double green;
  final double blue;
  final double alpha;
}

class JvdmColorValue {
  const JvdmColorValue(this.oklch, this.srgb, this.displayP3, this.argb);

  final JvdmOklch oklch;
  final JvdmRgb srgb;
  final JvdmRgb displayP3;
  final int argb;
}

class JvdmColorPair {
  const JvdmColorPair(this.light, this.dark);

  final JvdmColorValue light;
  final JvdmColorValue dark;
}

class JvdmTextSize {
  const JvdmTextSize(this.size, this.lineHeight);

  final double size;
  final double lineHeight;
}

class JvdmBezier {
  const JvdmBezier(this.x1, this.y1, this.x2, this.y2);

  final double x1;
  final double y1;
  final double x2;
  final double y2;
}

class JvdmShadowLayer {
  const JvdmShadowLayer(this.x, this.y, this.blur, this.spread, this.color);

  final double x;
  final double y;
  final double blur;
  final double spread;
  final JvdmColorPair color;
}

enum JvdmColorToken {
  app('app'),
  rail('rail'),
  panel('panel'),
  surface('surface'),
  field('field'),
  raised('raised'),
  line('line'),
  lineStrong('line-strong'),
  ink('ink'),
  inkSoft('ink-soft'),
  inkMuted('ink-muted'),
  inkDim('ink-dim'),
  accent('accent'),
  accentInk('accent-ink'),
  accentSoft('accent-soft'),
  onAccent('on-accent'),
  ok('ok'),
  okSoft('ok-soft'),
  warn('warn'),
  warnSoft('warn-soft'),
  danger('danger'),
  dangerSoft('danger-soft'),
  info('info'),
  infoSoft('info-soft');

  const JvdmColorToken(this.token);

  final String token;
}

enum JvdmTextStep {
  xxs('2xs'),
  xs('xs'),
  sm('sm'),
  base('base'),
  lg('lg'),
  xl('xl'),
  xxl('2xl'),
  display('display');

  const JvdmTextStep(this.token);

  final String token;
}

enum JvdmTrackingStep {
  caps('caps'),
  code('code'),
  tight('tight'),
  display('display');

  const JvdmTrackingStep(this.token);

  final String token;
}

enum JvdmWeightStep {
  normal('normal'),
  medium('medium'),
  bold('bold');

  const JvdmWeightStep(this.token);

  final String token;
}

enum JvdmRadiusStep {
  xs('xs'),
  sm('sm'),
  md('md'),
  lg('lg'),
  xl('xl');

  const JvdmRadiusStep(this.token);

  final String token;
}

enum JvdmEaseStep {
  out('out'),
  inOut('in-out'),
  over('over');

  const JvdmEaseStep(this.token);

  final String token;
}

enum JvdmDurationStep {
  instant('instant'),
  fast('fast'),
  base('base'),
  slow('slow');

  const JvdmDurationStep(this.token);

  final String token;
}

enum JvdmShadowStep {
  raised('raised'),
  popover('popover'),
  modal('modal');

  const JvdmShadowStep(this.token);

  final String token;
}

const List<String> jvdmFontSans = <String>['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'];
const List<String> jvdmFontMono = <String>['ui-monospace', 'SF Mono', 'JetBrains Mono', 'Menlo', 'Consolas', 'monospace'];

const double jvdmSpacing = 4.0;

const Map<JvdmColorToken, JvdmColorPair> jvdmColors = <JvdmColorToken, JvdmColorPair>{
  JvdmColorToken.app: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.965, 0.012, 78.0, 1.0), JvdmRgb(0.972549, 0.952941, 0.921569, 1.0), JvdmRgb(0.968627, 0.952941, 0.92549, 1.0), 0xFFF8F3EB),
    JvdmColorValue(JvdmOklch(0.18, 0.015, 78.0, 1.0), JvdmRgb(0.082353, 0.066667, 0.039216, 1.0), JvdmRgb(0.082353, 0.066667, 0.043137, 1.0), 0xFF15110A),
  ),
  JvdmColorToken.rail: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.945, 0.014, 78.0, 1.0), JvdmRgb(0.94902, 0.92549, 0.890196, 1.0), JvdmRgb(0.945098, 0.92549, 0.894118, 1.0), 0xFFF2ECE3),
    JvdmColorValue(JvdmOklch(0.15, 0.018, 78.0, 1.0), JvdmRgb(0.058824, 0.039216, 0.015686, 1.0), JvdmRgb(0.058824, 0.039216, 0.019608, 1.0), 0xFF0F0A04),
  ),
  JvdmColorToken.panel: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.95, 0.01, 78.0, 1.0), JvdmRgb(0.94902, 0.933333, 0.905882, 1.0), JvdmRgb(0.945098, 0.933333, 0.909804, 1.0), 0xFFF2EEE7),
    JvdmColorValue(JvdmOklch(0.17, 0.016, 78.0, 1.0), JvdmRgb(0.07451, 0.058824, 0.031373, 1.0), JvdmRgb(0.07451, 0.058824, 0.031373, 1.0), 0xFF130F08),
  ),
  JvdmColorToken.surface: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.99, 0.008, 78.0, 1.0), JvdmRgb(1.0, 0.984314, 0.964706, 1.0), JvdmRgb(0.996078, 0.984314, 0.964706, 1.0), 0xFFFFFBF6),
    JvdmColorValue(JvdmOklch(0.23, 0.015, 78.0, 1.0), JvdmRgb(0.129412, 0.109804, 0.082353, 1.0), JvdmRgb(0.12549, 0.109804, 0.086275, 1.0), 0xFF211C15),
  ),
  JvdmColorToken.field: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.98, 0.008, 78.0, 1.0), JvdmRgb(0.984314, 0.972549, 0.952941, 1.0), JvdmRgb(0.984314, 0.972549, 0.952941, 1.0), 0xFFFBF8F3),
    JvdmColorValue(JvdmOklch(0.215, 0.015, 78.0, 1.0), JvdmRgb(0.113725, 0.098039, 0.070588, 1.0), JvdmRgb(0.113725, 0.098039, 0.070588, 1.0), 0xFF1D1912),
  ),
  JvdmColorToken.raised: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.93, 0.012, 78.0, 1.0), JvdmRgb(0.92549, 0.905882, 0.87451, 1.0), JvdmRgb(0.921569, 0.905882, 0.878431, 1.0), 0xFFECE7DF),
    JvdmColorValue(JvdmOklch(0.3, 0.02, 78.0, 1.0), JvdmRgb(0.2, 0.176471, 0.137255, 1.0), JvdmRgb(0.196078, 0.176471, 0.141176, 1.0), 0xFF332D23),
  ),
  JvdmColorToken.line: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.89, 0.015, 78.0, 1.0), JvdmRgb(0.878431, 0.854902, 0.815686, 1.0), JvdmRgb(0.87451, 0.854902, 0.819608, 1.0), 0xFFE0DAD0),
    JvdmColorValue(JvdmOklch(0.275, 0.018, 78.0, 1.0), JvdmRgb(0.176471, 0.152941, 0.117647, 1.0), JvdmRgb(0.172549, 0.152941, 0.121569, 1.0), 0xFF2D271E),
  ),
  JvdmColorToken.lineStrong: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.82, 0.018, 78.0, 1.0), JvdmRgb(0.796078, 0.764706, 0.717647, 1.0), JvdmRgb(0.788235, 0.764706, 0.72549, 1.0), 0xFFCBC3B7),
    JvdmColorValue(JvdmOklch(0.35, 0.02, 78.0, 1.0), JvdmRgb(0.25098, 0.223529, 0.184314, 1.0), JvdmRgb(0.247059, 0.227451, 0.188235, 1.0), 0xFF40392F),
  ),
  JvdmColorToken.ink: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.23, 0.02, 78.0, 1.0), JvdmRgb(0.133333, 0.109804, 0.070588, 1.0), JvdmRgb(0.129412, 0.109804, 0.07451, 1.0), 0xFF221C12),
    JvdmColorValue(JvdmOklch(0.95, 0.01, 78.0, 1.0), JvdmRgb(0.94902, 0.933333, 0.905882, 1.0), JvdmRgb(0.945098, 0.933333, 0.909804, 1.0), 0xFFF2EEE7),
  ),
  JvdmColorToken.inkSoft: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.36, 0.018, 78.0, 1.0), JvdmRgb(0.258824, 0.235294, 0.2, 1.0), JvdmRgb(0.254902, 0.235294, 0.203922, 1.0), 0xFF423C33),
    JvdmColorValue(JvdmOklch(0.82, 0.016, 78.0, 1.0), JvdmRgb(0.792157, 0.764706, 0.72549, 1.0), JvdmRgb(0.788235, 0.764706, 0.729412, 1.0), 0xFFCAC3B9),
  ),
  JvdmColorToken.inkMuted: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.51, 0.014, 78.0, 1.0), JvdmRgb(0.419608, 0.396078, 0.364706, 1.0), JvdmRgb(0.415686, 0.396078, 0.368627, 1.0), 0xFF6B655D),
    JvdmColorValue(JvdmOklch(0.65, 0.012, 78.0, 1.0), JvdmRgb(0.576471, 0.556863, 0.529412, 1.0), JvdmRgb(0.572549, 0.560784, 0.533333, 1.0), 0xFF938E87),
  ),
  JvdmColorToken.inkDim: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.56, 0.012, 78.0, 1.0), JvdmRgb(0.470588, 0.454902, 0.427451, 1.0), JvdmRgb(0.470588, 0.454902, 0.427451, 1.0), 0xFF78746D),
    JvdmColorValue(JvdmOklch(0.57, 0.012, 78.0, 1.0), JvdmRgb(0.482353, 0.466667, 0.439216, 1.0), JvdmRgb(0.478431, 0.466667, 0.439216, 1.0), 0xFF7B7770),
  ),
  JvdmColorToken.accent: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.25, 0.025, 78.0, 1.0), JvdmRgb(0.156863, 0.12549, 0.078431, 1.0), JvdmRgb(0.152941, 0.129412, 0.082353, 1.0), 0xFF282014),
    JvdmColorValue(JvdmOklch(0.94, 0.015, 78.0, 1.0), JvdmRgb(0.945098, 0.917647, 0.878431, 1.0), JvdmRgb(0.941176, 0.917647, 0.882353, 1.0), 0xFFF1EAE0),
  ),
  JvdmColorToken.accentInk: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.33, 0.022, 78.0, 1.0), JvdmRgb(0.235294, 0.203922, 0.160784, 1.0), JvdmRgb(0.227451, 0.203922, 0.164706, 1.0), 0xFF3C3429),
    JvdmColorValue(JvdmOklch(0.87, 0.018, 78.0, 1.0), JvdmRgb(0.858824, 0.827451, 0.780392, 1.0), JvdmRgb(0.85098, 0.827451, 0.788235, 1.0), 0xFFDBD3C7),
  ),
  JvdmColorToken.accentSoft: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.92, 0.025, 78.0, 1.0), JvdmRgb(0.933333, 0.890196, 0.827451, 1.0), JvdmRgb(0.92549, 0.890196, 0.831373, 1.0), 0xFFEEE3D3),
    JvdmColorValue(JvdmOklch(0.29, 0.02, 78.0, 1.0), JvdmRgb(0.192157, 0.164706, 0.12549, 1.0), JvdmRgb(0.188235, 0.164706, 0.129412, 1.0), 0xFF312A20),
  ),
  JvdmColorToken.onAccent: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.99, 0.008, 78.0, 1.0), JvdmRgb(1.0, 0.984314, 0.964706, 1.0), JvdmRgb(0.996078, 0.984314, 0.964706, 1.0), 0xFFFFFBF6),
    JvdmColorValue(JvdmOklch(0.16, 0.018, 78.0, 1.0), JvdmRgb(0.070588, 0.047059, 0.019608, 1.0), JvdmRgb(0.066667, 0.05098, 0.023529, 1.0), 0xFF120C05),
  ),
  JvdmColorToken.ok: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.5, 0.13, 155.0, 1.0), JvdmRgb(0.0, 0.470588, 0.25098, 1.0), JvdmRgb(0.184314, 0.462745, 0.27451, 1.0), 0xFF007840),
    JvdmColorValue(JvdmOklch(0.78, 0.12, 155.0, 1.0), JvdmRgb(0.45098, 0.807843, 0.584314, 1.0), JvdmRgb(0.537255, 0.8, 0.603922, 1.0), 0xFF73CE95),
  ),
  JvdmColorToken.okSoft: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.94, 0.04, 155.0, 1.0), JvdmRgb(0.843137, 0.956863, 0.878431, 1.0), JvdmRgb(0.866667, 0.952941, 0.882353, 1.0), 0xFFD7F4E0),
    JvdmColorValue(JvdmOklch(0.29, 0.05, 155.0, 1.0), JvdmRgb(0.078431, 0.2, 0.12549, 1.0), JvdmRgb(0.109804, 0.196078, 0.133333, 1.0), 0xFF143320),
  ),
  JvdmColorToken.warn: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.58, 0.14, 62.0, 1.0), JvdmRgb(0.701961, 0.388235, 0.0, 1.0), JvdmRgb(0.658824, 0.403922, 0.105882, 1.0), 0xFFB36300),
    JvdmColorValue(JvdmOklch(0.78, 0.14, 62.0, 1.0), JvdmRgb(0.964706, 0.631373, 0.309804, 1.0), JvdmRgb(0.917647, 0.647059, 0.372549, 1.0), 0xFFF6A14F),
  ),
  JvdmColorToken.warnSoft: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.94, 0.05, 62.0, 1.0), JvdmRgb(1.0, 0.898039, 0.792157, 1.0), JvdmRgb(1.0, 0.901961, 0.803922, 1.0), 0xFFFFE5CA),
    JvdmColorValue(JvdmOklch(0.31, 0.06, 62.0, 1.0), JvdmRgb(0.27451, 0.160784, 0.043137, 1.0), JvdmRgb(0.254902, 0.164706, 0.066667, 1.0), 0xFF46290B),
  ),
  JvdmColorToken.danger: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.51, 0.21, 22.0, 1.0), JvdmRgb(0.760784, 0.0, 0.156863, 1.0), JvdmRgb(0.694118, 0.12549, 0.184314, 1.0), 0xFFC20028),
    JvdmColorValue(JvdmOklch(0.7, 0.18, 22.0, 1.0), JvdmRgb(0.980392, 0.407843, 0.415686, 1.0), JvdmRgb(0.913725, 0.443137, 0.431373, 1.0), 0xFFFA686A),
  ),
  JvdmColorToken.dangerSoft: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.94, 0.05, 22.0, 1.0), JvdmRgb(1.0, 0.87451, 0.862745, 1.0), JvdmRgb(1.0, 0.878431, 0.866667, 1.0), 0xFFFFDFDC),
    JvdmColorValue(JvdmOklch(0.29, 0.07, 22.0, 1.0), JvdmRgb(0.282353, 0.105882, 0.105882, 1.0), JvdmRgb(0.262745, 0.113725, 0.109804, 1.0), 0xFF481B1B),
  ),
  JvdmColorToken.info: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.5, 0.14, 250.0, 1.0), JvdmRgb(0.015686, 0.396078, 0.686275, 1.0), JvdmRgb(0.168627, 0.392157, 0.662745, 1.0), 0xFF0465AF),
    JvdmColorValue(JvdmOklch(0.72, 0.11, 245.0, 1.0), JvdmRgb(0.4, 0.670588, 0.898039, 1.0), JvdmRgb(0.462745, 0.666667, 0.878431, 1.0), 0xFF66ABE5),
  ),
  JvdmColorToken.infoSoft: JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.94, 0.035, 250.0, 1.0), JvdmRgb(0.854902, 0.933333, 1.0, 1.0), JvdmRgb(0.870588, 0.929412, 1.0, 1.0), 0xFFDAEEFF),
    JvdmColorValue(JvdmOklch(0.29, 0.055, 245.0, 1.0), JvdmRgb(0.062745, 0.180392, 0.270588, 1.0), JvdmRgb(0.094118, 0.176471, 0.262745, 1.0), 0xFF102E45),
  ),
};

const Map<JvdmTextStep, JvdmTextSize> jvdmText = <JvdmTextStep, JvdmTextSize>{
  JvdmTextStep.xxs: JvdmTextSize(11.0, 1.45),
  JvdmTextStep.xs: JvdmTextSize(12.0, 1.45),
  JvdmTextStep.sm: JvdmTextSize(13.0, 1.5),
  JvdmTextStep.base: JvdmTextSize(15.0, 1.55),
  JvdmTextStep.lg: JvdmTextSize(18.0, 1.45),
  JvdmTextStep.xl: JvdmTextSize(23.0, 1.3),
  JvdmTextStep.xxl: JvdmTextSize(29.0, 1.2),
  JvdmTextStep.display: JvdmTextSize(58.0, 0.98),
};

const Map<JvdmTrackingStep, double> jvdmTracking = <JvdmTrackingStep, double>{
  JvdmTrackingStep.caps: 0.06,
  JvdmTrackingStep.code: 0.4,
  JvdmTrackingStep.tight: -0.015,
  JvdmTrackingStep.display: -0.025,
};

const Map<JvdmWeightStep, int> jvdmWeight = <JvdmWeightStep, int>{
  JvdmWeightStep.normal: 400,
  JvdmWeightStep.medium: 500,
  JvdmWeightStep.bold: 700,
};

const Map<JvdmRadiusStep, double> jvdmRadius = <JvdmRadiusStep, double>{
  JvdmRadiusStep.xs: 3.0,
  JvdmRadiusStep.sm: 5.0,
  JvdmRadiusStep.md: 8.0,
  JvdmRadiusStep.lg: 12.0,
  JvdmRadiusStep.xl: 20.0,
};

const Map<JvdmEaseStep, JvdmBezier> jvdmEase = <JvdmEaseStep, JvdmBezier>{
  JvdmEaseStep.out: JvdmBezier(0.16, 1.0, 0.3, 1.0),
  JvdmEaseStep.inOut: JvdmBezier(0.65, 0.0, 0.35, 1.0),
  JvdmEaseStep.over: JvdmBezier(0.34, 1.42, 0.64, 1.0),
};

const Map<JvdmDurationStep, Duration> jvdmDuration = <JvdmDurationStep, Duration>{
  JvdmDurationStep.instant: Duration(milliseconds: 90),
  JvdmDurationStep.fast: Duration(milliseconds: 160),
  JvdmDurationStep.base: Duration(milliseconds: 240),
  JvdmDurationStep.slow: Duration(milliseconds: 420),
};

const Map<JvdmShadowStep, List<JvdmShadowLayer>> jvdmShadow = <JvdmShadowStep, List<JvdmShadowLayer>>{
  JvdmShadowStep.raised: <JvdmShadowLayer>[
    JvdmShadowLayer(0.0, 1.0, 1.0, 0.0, JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.23, 0.02, 78.0, 0.05), JvdmRgb(0.133333, 0.109804, 0.070588, 0.05), JvdmRgb(0.129412, 0.109804, 0.07451, 0.05), 0x0D221C12),
    JvdmColorValue(JvdmOklch(0.0, 0.0, 0.0, 0.36), JvdmRgb(0.0, 0.0, 0.0, 0.36), JvdmRgb(0.0, 0.0, 0.0, 0.36), 0x5C000000),
  )),
    JvdmShadowLayer(0.0, 2.0, 4.0, -1.0, JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.23, 0.02, 78.0, 0.06), JvdmRgb(0.133333, 0.109804, 0.070588, 0.06), JvdmRgb(0.129412, 0.109804, 0.07451, 0.06), 0x0F221C12),
    JvdmColorValue(JvdmOklch(0.0, 0.0, 0.0, 0.4), JvdmRgb(0.0, 0.0, 0.0, 0.4), JvdmRgb(0.0, 0.0, 0.0, 0.4), 0x66000000),
  )),
  ],
  JvdmShadowStep.popover: <JvdmShadowLayer>[
    JvdmShadowLayer(0.0, 2.0, 4.0, -2.0, JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.23, 0.02, 78.0, 0.06), JvdmRgb(0.133333, 0.109804, 0.070588, 0.06), JvdmRgb(0.129412, 0.109804, 0.07451, 0.06), 0x0F221C12),
    JvdmColorValue(JvdmOklch(0.0, 0.0, 0.0, 0.4), JvdmRgb(0.0, 0.0, 0.0, 0.4), JvdmRgb(0.0, 0.0, 0.0, 0.4), 0x66000000),
  )),
    JvdmShadowLayer(0.0, 10.0, 24.0, -6.0, JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.23, 0.02, 78.0, 0.12), JvdmRgb(0.133333, 0.109804, 0.070588, 0.12), JvdmRgb(0.129412, 0.109804, 0.07451, 0.12), 0x1F221C12),
    JvdmColorValue(JvdmOklch(0.0, 0.0, 0.0, 0.52), JvdmRgb(0.0, 0.0, 0.0, 0.52), JvdmRgb(0.0, 0.0, 0.0, 0.52), 0x85000000),
  )),
  ],
  JvdmShadowStep.modal: <JvdmShadowLayer>[
    JvdmShadowLayer(0.0, 4.0, 10.0, -4.0, JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.23, 0.02, 78.0, 0.08), JvdmRgb(0.133333, 0.109804, 0.070588, 0.08), JvdmRgb(0.129412, 0.109804, 0.07451, 0.08), 0x14221C12),
    JvdmColorValue(JvdmOklch(0.0, 0.0, 0.0, 0.44), JvdmRgb(0.0, 0.0, 0.0, 0.44), JvdmRgb(0.0, 0.0, 0.0, 0.44), 0x70000000),
  )),
    JvdmShadowLayer(0.0, 28.0, 64.0, -16.0, JvdmColorPair(
    JvdmColorValue(JvdmOklch(0.23, 0.02, 78.0, 0.18), JvdmRgb(0.133333, 0.109804, 0.070588, 0.18), JvdmRgb(0.129412, 0.109804, 0.07451, 0.18), 0x2E221C12),
    JvdmColorValue(JvdmOklch(0.0, 0.0, 0.0, 0.64), JvdmRgb(0.0, 0.0, 0.0, 0.64), JvdmRgb(0.0, 0.0, 0.0, 0.64), 0xA3000000),
  )),
  ],
};
