import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes } from "./routes";
import "./assets/main.scss";

export const createApp = ViteSSG(App, { routes }, async () => {
  if (!import.meta.env.SSR) {
    await import("bootstrap/js/dist/collapse");
  }
});
