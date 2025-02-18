import { defineConfig } from "vite";
import { codeInspectorPlugin } from "code-inspector-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";

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
    // host: "0.0.0.0",
  },
});
