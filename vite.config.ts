import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "path"
import {defineConfig} from "vite"

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [["module:@preact/signals-react-transform"]],
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        target: "esnext",
    },
})
