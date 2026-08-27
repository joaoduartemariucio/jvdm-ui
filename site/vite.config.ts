import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: process.env.SITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "jvdm-ui/atoms": fileURLToPath(new URL("../src/atoms", import.meta.url)),
      "jvdm-ui/molecules": fileURLToPath(new URL("../src/molecules", import.meta.url)),
      "jvdm-ui/organisms": fileURLToPath(new URL("../src/organisms", import.meta.url)),
      "jvdm-ui/tokens": fileURLToPath(new URL("../src/tokens", import.meta.url)),
      "jvdm-ui/theme": fileURLToPath(new URL("../src/theme", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("../site-dist", import.meta.url)),
    emptyOutDir: true,
  },
});
