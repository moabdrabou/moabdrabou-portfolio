import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Move all Vite-injected scripts, modulepreloads, and stylesheets from <head>
// to end of <body>, so the browser paints the inline boot screen immediately
// without waiting for any network resource discovery in the <head>.
function deferAssetsPlugin(): Plugin {
  return {
    name: "defer-assets",
    enforce: "post",
    transformIndexHtml(html) {
      // Collect Vite-injected tags from <head>
      const scriptRe = /<script type="module"[^>]*src="\/assets\/[^>]*><\/script>\n?\s*/g;
      const modulepreloadRe = /<link rel="modulepreload"[^>]*>\n?\s*/g;
      const cssRe = /<link rel="stylesheet"[^>]*href="\/assets\/[^>]*>\n?\s*/g;

      const scripts = html.match(scriptRe) || [];
      const modulepreloads = html.match(modulepreloadRe) || [];
      const cssLinks = html.match(cssRe) || [];

      // Remove them from <head>
      let result = html;
      for (const tag of [...scripts, ...modulepreloads, ...cssLinks]) {
        result = result.replace(tag, "");
      }

      // Build deferred block: CSS as async, then scripts at end of body
      const asyncCss = cssLinks
        .map((link) => {
          const href = link.match(/href="([^"]+)"/)?.[1] || "";
          return `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">\n    <noscript><link rel="stylesheet" href="${href}"></noscript>`;
        })
        .join("\n    ");

      const deferredTags = [
        asyncCss,
        ...modulepreloads.map((t) => t.trim()),
        ...scripts.map((t) => t.trim()),
      ]
        .filter(Boolean)
        .join("\n    ");

      // Insert before </body>
      result = result.replace("</body>", `    ${deferredTags}\n  </body>`);

      return result;
    },
  };
}

export default defineConfig({
  plugins: [react(), deferAssetsPlugin()],
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
