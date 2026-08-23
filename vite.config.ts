import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";
import cspPlugin from "./plugins/csp.mjs";

function htmlLangPlugin(): Plugin {
  return {
    name: "html-lang",
    transformIndexHtml(html) {
      const locale = process.env.VITE_LOCALE || "ru";
      return html.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`);
    },
  };
}

function tinkoffTerminalPlugin(): Plugin {
  return {
    name: "tinkoff-terminal",
    transformIndexHtml(html) {
      const key = process.env.TINKOFF_TERMINAL_KEY || "1780060331835DEMO";
      const script = `<script>window.TINKOFF_TERMINAL_KEY="${key}"</script>`;
      return html.replace("</head>", `${script}\n  </head>`);
    },
  };
}

export default defineConfig({
  plugins: [vue(), htmlLangPlugin(), tinkoffTerminalPlugin(), cspPlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        // Suppressed deprecations from Sass 1.77+: Bootstrap 5.3 uses @import (→ migrate to @use),
        // global-builtin (color functions), and if-function (conditional logic).
        // TODO: remove when Bootstrap 6 (@use-based) or project migrates off @import.
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
      },
    },
  },
});
