import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Inline CSS into HTML and move JS to end of body.
// Uses generateBundle hook so CSS content is available from the bundle.
function inlineCssAndDeferJsPlugin(): Plugin {
  return {
    name: "inline-css-defer-js",
    enforce: "post",
    generateBundle(_, bundle) {
      // Find the HTML asset
      const htmlAsset = Object.values(bundle).find(
        (a) => a.type === "asset" && a.fileName === "index.html"
      );
      if (!htmlAsset || htmlAsset.type !== "asset") return;

      let html = typeof htmlAsset.source === "string"
        ? htmlAsset.source
        : new TextDecoder().decode(htmlAsset.source);

      // Find all CSS assets in the bundle
      const cssAssets = Object.values(bundle).filter(
        (a) => a.type === "asset" && a.fileName.endsWith(".css")
      );

      // Remove Vite-injected tags from <head>
      const scriptRe = /<script type="module"[^>]*src="\/assets\/[^>]*><\/script>\n?\s*/g;
      const modulepreloadRe = /<link rel="modulepreload"[^>]*>\n?\s*/g;
      const cssLinkRe = /<link rel="stylesheet"[^>]*href="\/assets\/[^>]*>\n?\s*/g;

      const scripts = html.match(scriptRe) || [];
      const modulepreloads = html.match(modulepreloadRe) || [];
      const cssLinks = html.match(cssLinkRe) || [];

      for (const tag of [...scripts, ...modulepreloads, ...cssLinks]) {
        html = html.replace(tag, "");
      }

      // Inline CSS content directly into <head>
      let inlinedStyle = "";
      for (const css of cssAssets) {
        const content = typeof css.source === "string"
          ? css.source
          : new TextDecoder().decode(css.source);
        inlinedStyle += `<style>${content}</style>\n`;
      }

      // Deferred JS at end of body
      const deferredJs = [
        ...modulepreloads.map((t) => t.trim()),
        ...scripts.map((t) => t.trim()),
      ]
        .filter(Boolean)
        .join("\n    ");

      // Find the LCP image to preload
      const lcpImageAsset = Object.values(bundle).find(
        (a) => a.type === "asset" && a.fileName.includes("MBS") && a.fileName.endsWith(".webp")
      );
      const lcpPreloadLink = lcpImageAsset 
        ? `\n    <link rel="preload" as="image" href="/${lcpImageAsset.fileName}" />` 
        : "";

      html = html.replace("</head>", `${inlinedStyle}${lcpPreloadLink}\n  </head>`);
      html = html.replace("</body>", `    ${deferredJs}\n  </body>`);

      htmlAsset.source = html;

      // Remove CSS files from bundle since they're now inlined
      for (const [key, asset] of Object.entries(bundle)) {
        if (asset.type === "asset" && asset.fileName.endsWith(".css")) {
          delete bundle[key];
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), inlineCssAndDeferJsPlugin()],
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
