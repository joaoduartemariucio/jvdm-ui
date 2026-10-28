import type { ReactNode } from "react";
import { Modal as NativeModal, Pressable, Text, View } from "react-native";

import { CloseIcon, IconButton } from "../../atoms";
import { useJvdmTokens } from "../../tokens";
import { dialogSurfaceStyle, MODAL_SIZES, type ModalSize } from "./modal-style";
import { locales } from "./locales";

export { MODAL_SIZES, dialogSurfaceStyle, type ModalSize } from "./modal-style";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeLabel = locales.close,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  size?: ModalSize;
  closeLabel?: string;
}) {
  const tokens = useJvdmTokens();
  const style = dialogSurfaceStyle(tokens);

  return (
    <NativeModal animationType="slide" onRequestClose={onClose} transparent visible={isOpen}>
      <Pressable accessibilityLabel={closeLabel} onPress={onClose} style={style.backdrop}>
        <Pressable
          accessibilityLabel={title === undefined ? locales.label : undefined}
          accessibilityViewIsModal
          style={[style.surface, { maxWidth: MODAL_SIZES[size] }]}
        >
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
