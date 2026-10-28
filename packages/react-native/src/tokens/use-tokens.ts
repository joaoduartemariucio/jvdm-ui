import { useColorScheme } from "react-native";

import { darkTokens, lightTokens, type JvdmTokens } from "./theme";

export function useJvdmTokens(): JvdmTokens {
  return useColorScheme() === "light" ? lightTokens : darkTokens;
}
