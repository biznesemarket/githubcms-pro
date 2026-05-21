import { readFileSync } from "node:fs";
import { join } from "node:path";
import { existsSync, readdirSync } from "node:fs";

export function loadEnvFile(envPath) {
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

export function loadArticles() {
  const generatedPath = join(process.cwd(), "src", "generated", "articles.ts");
  const source = readFileSync(generatedPath, "utf8");
  const match = source.match(/export const articles = (\[[\s\S]*\])\s*as const/);
  if (!match) throw new Error("Could not parse articles.ts");
  return JSON.parse(match[1]);
}

export function loadPages() {
  const generatedPath = join(process.cwd(), "src", "generated", "pages.ts");
  if (!existsSync(generatedPath)) return [];
  const source = readFileSync(generatedPath, "utf8");
  const match = source.match(/export const pages = (\[[\s\S]*\])\s*as const/);
  if (!match) return [];
  return JSON.parse(match[1]);
}

const translitMap = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "j", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
  р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch",
  ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .split("")
    .map((c) => translitMap[c] ?? c)
    .join("")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function collectPageHtmlFiles(dir) {
  const results = [];
  const rootIndex = join(dir, "index.html");
  if (existsSync(rootIndex)) results.push({ file: rootIndex, route: "/" });

  function walk(currentDir, baseRoute) {
    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === "assets") continue;
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, baseRoute + entry.name + "/");
      } else if (entry.name === "index.html" && fullPath !== rootIndex) {
        results.push({ file: fullPath, route: baseRoute });
      }
    }
  }

  walk(dir, "/");
  return results;
}

export function getLocaleConfig() {
  const locale = process.env.VITE_LOCALE || "ru";
  const isRu = locale === "ru";
  const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || "https://githubcms.com").replace(/\/+$/, "");
  const alternateUrl = siteUrl.includes("githubcms.ru")
    ? siteUrl.replace("githubcms.ru", "githubcms.com")
    : siteUrl.replace("githubcms.com", "githubcms.ru");
  const siteName = "GitHub CMS";
  const siteDescription = isRu
    ? "Статический сайт с AI-видимостью из коробки. Markdown → JSON-LD → деплой за 2 минуты."
    : "Static site with AI visibility out of the box. Markdown → JSON-LD → deploy in 2 minutes.";
  const defaultImage = "https://pixinlink.ru/api/v1/1200x630/github-cms";
  const bcHome = isRu ? "Главная" : "Home";
  const bcBlog = isRu ? "Блог" : "Blog";
  return { locale, isRu, siteUrl, alternateUrl, siteName, siteDescription, defaultImage, bcHome, bcBlog };
}
