import { useState, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { ChevronIcon } from "../../atoms";
import { useJvdmTokens } from "../../tokens";
import { toggledAccordion } from "./accordion-style";

export { toggledAccordion } from "./accordion-style";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({
  items,
  exclusive = false,
}: {
  items: readonly AccordionItem[];
  exclusive?: boolean;
}) {
  const tokens = useJvdmTokens();
  const [open, setOpen] = useState<string[]>(() =>
    items.filter((item) => item.defaultOpen).map((item) => item.id),
  );

  return (
    <View
      style={{
        backgroundColor: tokens.color("surface"),
        borderColor: tokens.color("line"),
        borderRadius: tokens.radius("md"),
        borderWidth: 1,
        overflow: "hidden",
      }}
    >
      {items.map((item, index) => {
        const isOpen = open.includes(item.id);

        return (
          <View
            key={item.id}
            style={
              index === 0 ? undefined : { borderTopColor: tokens.color("line"), borderTopWidth: 1 }
            }
          >
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              onPress={() => setOpen(toggledAccordion(open, item.id, exclusive))}
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: tokens.spacing(3),
                justifyContent: "space-between",
                minHeight: tokens.spacing(12),
                paddingHorizontal: tokens.spacing(4),
              }}
            >
              <Text style={{ color: tokens.color("ink"), fontSize: tokens.fontSize("sm") }}>
                {item.title}
              </Text>
              <ChevronIcon color={tokens.color("ink-muted")} size="md" />
            </Pressable>
            {isOpen ? (
              <View
                style={{
                  paddingBottom: tokens.spacing(4),
                  paddingHorizontal: tokens.spacing(4),
                }}
              >
                {item.content}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
