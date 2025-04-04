import path from "path";

import react from "@vitejs/plugin-react-swc";
import { codeInspectorPlugin } from "code-inspector-plugin";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/CoolBI/",
  plugins: [
    react(),
    codeInspectorPlugin({
      bundler: "vite",
      editor: "code",
      hideDomPathAttr: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@comp": path.resolve(__dirname, "src/components"),
    },
  },
  envDir: "./env",
  server: {
    // 开启host之后可以局域网连接
    // host: "0.0.0.0",
  },
});
