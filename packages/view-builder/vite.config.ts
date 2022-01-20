import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    lib: {
      entry: "./src/index.ts",
      name: "ViewBuilder",
      fileName: (format) => `my-lib.${format}.js`,
    },
  },
});
