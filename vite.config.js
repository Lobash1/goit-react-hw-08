import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  json: {
    stringify: true, // Позволяет импортировать JSON как строку
  },

  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
