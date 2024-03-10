import { defineConfig } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
    renderer: {
        root: "src/",
        build: {
            outDir: "../dist/renderer",
            rollupOptions: { input: { main: resolve(__dirname, "src/index.html"), dynamic_island: resolve(__dirname, "src/dynamic_island/index.html") } }
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