import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// SINGLEFILE=1 npm run build  →  one self-contained dist/index.html (everything,
// incl. KaTeX fonts, inlined) that opens by double-click / file:// or email.
// The normal build keeps relative paths + vendor chunks for GitHub Pages.
const SINGLE = !!process.env.SINGLEFILE;

export default defineConfig({
  plugins: [react(), ...(SINGLE ? [viteSingleFile()] : [])],
  base: SINGLE ? "" : "./",
  build: SINGLE
    ? {
        assetsInlineLimit: 100_000_000, // inline fonts/assets as data URIs
        cssCodeSplit: false,
        rollupOptions: { output: { inlineDynamicImports: true } },
      }
    : {
        rollupOptions: {
          output: {
            manualChunks: {
              reactflow: ["reactflow"],
              katex: ["katex"],
              react: ["react", "react-dom"],
            },
          },
        },
      },
});
