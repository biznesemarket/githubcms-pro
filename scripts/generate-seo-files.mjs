import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "./shared/slugify.mjs";

function loadEnvFile(envPath) {
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(process.cwd(), ".env"));

const args = process.argv.slice(2);
const dirIndex = args.indexOf("--dir");
const outputDir = path.resolve(dirIndex === -1 ? "dist" : args[dirIndex + 1]);
const locale = process.env.VITE_LOCALE || "ru";
const edition = process.env.VITE_EDITION || "free";
const isPro = edition === "pro";
const contentDir = path.join(process.cwd(), "content", locale, "blog");
const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || process.env.SITE_URL || "https://githubcms.com");

function normalizeSiteUrl(value) {
  return String(value).trim().replace(/\/+$/, "");
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function absoluteUrl(routePath) {
  return `${siteUrl}${routePath.startsWith("/") ? routePath : `/${routePath}`}`;
}

function toLastmod(value) {
  const rawValue = String(value ?? "").trim();
  if (!rawValue) {
    return undefined;
  }

  const date = new Date(rawValue);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString().slice(0, 10);
}

function readArticleRoutes() {
  return readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = readFileSync(path.join(contentDir, file), "utf8");
      const parsed = matter(source);
      const slug = String(parsed.data.slug ?? "").trim();

      if (!slug) {
        throw new Error(`Missing slug in ${path.join("content", "blog", file)}`);
      }

      return {
        path: `/blog/${slug}/`,
        lastmod: toLastmod(parsed.data.updated ?? parsed.data.date),
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

function readPageRoutes() {
  const pagesDir = path.join(contentDir, "..", "pages");

  if (!existsSync(pagesDir)) return [];

  return readdirSync(pagesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = readFileSync(path.join(pagesDir, file), "utf8");
      const parsed = matter(source);
      const slug = String(parsed.data.slug ?? "").trim();

      if (!slug) {
        throw new Error(`Missing slug in ${path.join("content", "pages", file)}`);
      }

      return {
        path: `/${slug}/`,
        lastmod: toLastmod(parsed.data.updated ?? parsed.data.date),
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

function renderSitemap(routes) {
  const urls = routes
    .map((route) => {
      const lastmod = route.lastmod ? `\n    <lastmod>${xmlEscape(route.lastmod)}</lastmod>` : "";
      return `  <url>\n    <loc>${xmlEscape(absoluteUrl(route.path))}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`;
}

function readCategoryRoutes() {
  const categories = new Set();
  const blogFiles = readdirSync(contentDir).filter((f) => f.endsWith(".md"));
  for (const file of blogFiles) {
    const source = readFileSync(path.join(contentDir, file), "utf8");
    const parsed = matter(source);
    const category = String(parsed.data.category ?? "").trim();
    if (category) categories.add(slugify(category));
  }
  return [...categories].map((slug) => ({ path: `/category/${slug}/`, lastmod: undefined })).sort((a, b) => a.path.localeCompare(b.path));
}

function readTagRoutes() {
  const tags = new Set();
  const blogFiles = readdirSync(contentDir).filter((f) => f.endsWith(".md"));
  for (const file of blogFiles) {
    const source = readFileSync(path.join(contentDir, file), "utf8");
    const parsed = matter(source);
    if (Array.isArray(parsed.data.tags)) {
      for (const tag of parsed.data.tags) tags.add(slugify(String(tag)));
    }
  }
  return [...tags].map((slug) => ({ path: `/tag/${slug}/`, lastmod: undefined })).sort((a, b) => a.path.localeCompare(b.path));
}

function readPaginationRoutes() {
  const blogFiles = readdirSync(contentDir).filter((f) => f.endsWith(".md"));
  const totalPages = Math.ceil(blogFiles.length / 5);
  const routes = [];
  for (let i = 2; i <= totalPages; i++) {
    routes.push({ path: `/blog/page/${i}/`, lastmod: undefined });
  }
  return routes;
}

const routes = [
  {
    path: "/",
    lastmod: undefined,
  },
  {
    path: "/blog/",
    lastmod: undefined,
  },
  {
    path: "/templates/",
    lastmod: undefined,
  },
  ...readArticleRoutes(),
  ...readPageRoutes(),
  ...readCategoryRoutes(),
  ...readTagRoutes(),
  ...readPaginationRoutes(),
  ...(isPro ? [
  // Shop routes
  { path: "/shop/", lastmod: undefined },
  ...["shop-section-1","shop-section-2","shop-section-3","shop-section-4","shop-section-5"].flatMap(s => [
    { path: `/shop/${s}/`, lastmod: undefined },
  ]),
  // Product detail pages
  { path: "/shop/shop-section-1/galaxy-s25-ultra/", lastmod: undefined },
  { path: "/shop/shop-section-1/macbook-air-m4/", lastmod: undefined },
  { path: "/shop/shop-section-1/ipad-pro-m4/", lastmod: undefined },
  { path: "/shop/shop-section-1/airpods-pro-3/", lastmod: undefined },
  { path: "/shop/shop-section-1/watch-ultra-2/", lastmod: undefined },
  { path: "/shop/shop-section-1/power-bank-20000/", lastmod: undefined },
  // Payment
  { path: "/payment/success/", lastmod: undefined },
  ] : []),
];

mkdirSync(outputDir, { recursive: true });
writeFileSync(path.join(outputDir, "sitemap.xml"), renderSitemap(routes), "utf8");
writeFileSync(path.join(outputDir, "robots.txt"), renderRobots(), "utf8");
writeFileSync(path.join(outputDir, "healthz"), "ok\n", "utf8");

console.log(`Generated robots.txt, sitemap.xml and healthz for ${routes.length} route(s).`);
