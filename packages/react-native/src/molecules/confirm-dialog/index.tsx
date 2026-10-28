import type { ReactNode } from "react";
import { Modal as NativeModal, Pressable, Text, View } from "react-native";

import { Button } from "../../atoms";
import { dialogSurfaceStyle } from "../modal";
import { useJvdmTokens } from "../../tokens";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  pending = false,
  children,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel: string;
  pending?: boolean;
  children?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const tokens = useJvdmTokens();
  const style = dialogSurfaceStyle(tokens);

  return (
    <NativeModal animationType="fade" onRequestClose={onCancel} transparent visible={open}>
      <Pressable accessibilityLabel={cancelLabel} onPress={onCancel} style={style.backdrop}>
        <Pressable accessibilityViewIsModal style={style.surface}>
          <View style={{ gap: tokens.spacing(4), padding: tokens.spacing(5) }}>
            <View style={{ gap: tokens.spacing(2) }}>
              <Text style={style.title}>{title}</Text>
              {description === undefined ? null : (
                <Text style={{ color: tokens.color("ink-muted"), fontSize: tokens.fontSize("sm") }}>
                  {description}
                </Text>
              )}
            </View>

            {children}

            <View
              style={{
                flexDirection: "row",
                gap: tokens.spacing(3),
                justifyContent: "flex-end",
              }}
            >
              <Button disabled={pending} onPress={onCancel}>
                {cancelLabel}
              </Button>
              <Button disabled={pending} onPress={onConfirm} variant="danger">
                {confirmLabel}
              </Button>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </NativeModal>
  );
}
