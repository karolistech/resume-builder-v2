import { defineConfig } from "vite";

export default defineConfig({
  base: "/resume-builder-v2/",

  build: {
    assetsInlineLimit: 0
  },

  resolve: {
    tsconfigPaths: true
  }
});
