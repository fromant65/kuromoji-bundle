import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      path: resolve(__dirname, "src/path-polyfill.js"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/kuromoji-service.js"),
      name: "kuromojiService",
      formats: ["es"],
      fileName: () => "kuromoji.bundle.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  publicDir: "public",
});
