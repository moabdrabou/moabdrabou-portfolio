import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Make CSS non-render-blocking so the static boot screen paints instantly
function asyncCssPlugin(): Plugin {
  return {
    name: "async-css",
    enforce: "post",
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"([^>]*?)>/g,
        `<link rel="stylesheet"$1 media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet"$1></noscript>`
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), asyncCssPlugin()],
  build: {
    outDir: "./Live",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/preact") || id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react": "preact/compat",
      "react-dom/client": "preact/compat/client",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
});
