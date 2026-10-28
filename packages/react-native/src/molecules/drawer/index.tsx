import type { ReactNode } from "react";
import { Modal as NativeModal, Pressable, Text, View } from "react-native";

import { CloseIcon, IconButton } from "../../atoms";
import { dialogSurfaceStyle } from "../modal";
import { useJvdmTokens } from "../../tokens";
import { locales } from "./locales";

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  closeLabel = locales.close,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  closeLabel?: string;
}) {
  const tokens = useJvdmTokens();
  const style = dialogSurfaceStyle(tokens);

  return (
    <NativeModal animationType="slide" onRequestClose={onClose} transparent visible={isOpen}>
      <Pressable accessibilityLabel={closeLabel} onPress={onClose} style={style.backdrop}>
        <Pressable accessibilityViewIsModal style={[style.surface, { flex: 1, maxHeight: "100%" }]}>
          {title === undefined ? null : (
            <View style={style.header}>
              <Text style={style.title}>{title}</Text>
              <IconButton label={closeLabel} onPress={onClose}>
                <CloseIcon color={tokens.color("ink-muted")} size="md" />
              </IconButton>
            </View>
          )}
          <View style={style.body}>{children}</View>
        </Pressable>
      </Pressable>
    </NativeModal>
  );
}
