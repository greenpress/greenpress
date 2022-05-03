import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    target: "esnext",
    lib: {
      entry: "./src/index.ts",
      name: "ViewBuilder",
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [dts()]
});
