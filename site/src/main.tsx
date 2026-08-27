import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { applyStoredTheme } from "jvdm-ui/tokens";

import { App } from "./app";
import "./styles.css";

applyStoredTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
