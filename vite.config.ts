import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/tzGptBot/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      app: "/src/app",
      styles: "/src/app/styles",
      assets: "/src/assets",
      entities: "/src/entities",
      features: "/src/features",
      pages: "/src/pages",
      shared: "/src/shared",
      types: "/src/types",
      widgets: "/src/widgets",
    },
  },
});
