import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "kraftci/jsx-runtime": path.resolve(__dirname, "src/jsx-runtime.ts"),
      "kraftci/jsx-dev-runtime": path.resolve(__dirname, "src/jsx-dev-runtime.ts"),
    },
  },
});