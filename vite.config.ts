import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";

function htmlLangPlugin(): Plugin {
  return {
    name: "html-lang",
    transformIndexHtml(html) {
      const locale = process.env.VITE_LOCALE || "ru";
      return html.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`);
    },
  };
}

export default defineConfig({
  plugins: [vue(), htmlLangPlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
      },
    },
  },
});
