import { ru } from "./ru";
import { en } from "./en";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const viteEnv = (typeof import.meta !== "undefined" ? (import.meta as any).env : undefined) as Record<string, string> | undefined;
const locale: string =
  viteEnv?.VITE_LOCALE ??
  (typeof process !== "undefined" ? process.env.VITE_LOCALE : undefined) ??
  "ru";

export const t = locale === "en" ? en : ru;
export { locale };
