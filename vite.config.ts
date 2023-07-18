import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
    test: {
      coverage: {
        provider: "istanbul",
      },
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/react-testing-lib/setup.ts",
    },
  };

  if (command !== "serve") {
    config.base = "/idea-board/";
  }

  return config;
});
