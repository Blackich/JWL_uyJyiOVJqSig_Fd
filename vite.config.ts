import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src/",
      "@Admin": "/src/_Admin/",
      "@User": "/src/_User/",
      "@store": "/src/store/",
      "@assets": "/src/assets/",
      "@ui": "/src/ui/",
      "@utils": "/src/utils/",
    },
  },
  plugins: [react()],
});
