import { Text, View } from "react-native";

import { Button } from "../../atoms";
import { useJvdmTokens } from "../../tokens";
import { clampPage } from "./pagination-style";
import { locales } from "./locales";

export { clampPage } from "./pagination-style";

export function Pagination({
  page,
  pages,
  onPageChange,
  previousLabel = locales.previous,
  nextLabel = locales.next,
  pageLabel = locales.page,
  label = locales.label,
}: {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  pageLabel?: (page: number) => string;
  label?: string;
}) {
  const tokens = useJvdmTokens();
  const current = clampPage(page, pages);

  return (
    <View
      accessibilityLabel={label}
      style={{
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: tokens.spacing(2),
      }}
    >
      <Button disabled={current === 1} onPress={() => onPageChange(current - 1)}>
        {previousLabel}
      </Button>
      <Text
        style={{
          color: tokens.color("ink-muted"),
          fontSize: tokens.fontSize("sm"),
          paddingHorizontal: tokens.spacing(2),
        }}
      >
        {pageLabel(current)}
      </Text>
      <Button disabled={current === pages} onPress={() => onPageChange(current + 1)}>
        {nextLabel}
      </Button>
    </View>
  );
}
