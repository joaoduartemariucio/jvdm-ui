import { Text, View } from "react-native";

import { Button } from "../../atoms";
import { useJvdmTokens } from "../../tokens";
import { locales } from "./locales";

export function LoadError({
  message,
  onRetry,
  retryLabel = locales.retry,
}: {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  const tokens = useJvdmTokens();

  return (
    <View
      style={{
        alignItems: "center",
        gap: tokens.spacing(3),
        justifyContent: "center",
        paddingVertical: tokens.spacing(16),
      }}
    >
      <Text
        style={{
          color: tokens.color("danger"),
          fontSize: tokens.fontSize("sm"),
          textAlign: "center",
        }}
      >
        {message}
      </Text>
      {onRetry === undefined ? null : (
        <Button onPress={onRetry} variant="secondary">
          {retryLabel}
        </Button>
      )}
    </View>
  );
}
