import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yaml from "@rollup/plugin-yaml";

export default defineConfig({
  root: "example", // demo app lives here
  plugins: [react(), yaml()],
  build: {
    outDir: "../dist-demo", // keep demo build separate
  },
});