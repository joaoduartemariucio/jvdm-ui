import '../../tokens/tokens.dart';

const double jvdmSwitchTrackWidth = 40;

const double jvdmSwitchTrackHeight = 24;

const double jvdmSwitchThumb = 16;

const double jvdmSwitchInset = 4;

const double jvdmSwitchTravel =
    jvdmSwitchTrackWidth - jvdmSwitchThumb - jvdmSwitchInset * 2;

JvdmColorToken jvdmSwitchTrack(bool checked) =>
    checked ? JvdmColorToken.accent : JvdmColorToken.raised;

JvdmColorToken jvdmSwitchThumbColor(bool checked) =>
    checked ? JvdmColorToken.onAccent : JvdmColorToken.ink;
