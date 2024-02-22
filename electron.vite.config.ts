import { defineConfig } from "electron-vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    renderer: {
        root: "src/",
        build: {
            outDir: "../dist/renderer",
            rollupOptions: { input: "index.html" }
        },
        plugins: [vue()]
    },
    main: {
        build: {
            outDir: "dist/core",
            lib: {
                entry: "src-core/main.ts",
                formats: ["es"]
            }
        }
    }
});