import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const dirIndex = args.indexOf("--dir");
const rawDir = dirIndex === -1 ? "dist" : args[dirIndex + 1];
if (!rawDir || rawDir.startsWith("--")) {
  console.error("Error: --dir requires a directory path argument.");
  process.exit(1);
}
const outputDir = path.resolve(rawDir);
const locale = process.env.VITE_LOCALE || "ru";
const edition = process.env.VITE_EDITION || "free";
const isPro = edition === "pro";
const contentDir = path.join(process.cwd(), "content", locale, "blog");
const pagesDir = path.join(process.cwd(), "content", locale, "pages");
const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || process.env.SITE_URL || "https://example.com");
const failures = [];

function normalizeSiteUrl(value) {
  return String(value).trim().replace(/\/+$/, "");
}

function fail(message) {
  failures.push(message);
}

const translitMap = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "j", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
  р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch",
  ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(text) {
  return String(text).toLowerCase().split("").map((c) => translitMap[c] ?? c).join("")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
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

function readTextFile(filePath) {
  if (!existsSync(filePath)) {
    fail(`Missing file: ${path.relative(process.cwd(), filePath).replaceAll(path.sep, "/")}`);
    return "";
  }

  return readFileSync(filePath, "utf8");
}

function extractTags(xml, tagName) {
  const pattern = new RegExp(`<${tagName}>([^<]+)</${tagName}>`, "g");
  return [...xml.matchAll(pattern)].map((match) => match[1]);
}

function validateRobots(robots) {
  const requiredLines = ["User-agent: *", "Allow: /", `Sitemap: ${absoluteUrl("/sitemap.xml")}`];

  for (const line of requiredLines) {
    if (!robots.includes(line)) {
      fail(`robots.txt must contain: ${line}`);
    }
  }
}

function validateSitemap(sitemap, expectedRoutes) {
  if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    fail("sitemap.xml must start with XML declaration.");
  }

  if (!sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    fail("sitemap.xml must use the sitemap.org urlset namespace.");
  }

  const locs = new Set(extractTags(sitemap, "loc"));
  const lastmods = extractTags(sitemap, "lastmod");

  for (const route of expectedRoutes) {
    const expectedLoc = absoluteUrl(route.path);
    if (!locs.has(expectedLoc)) {
      fail(`sitemap.xml is missing loc: ${expectedLoc}`);
    }

    if (route.lastmod && !lastmods.includes(route.lastmod)) {
      fail(`sitemap.xml is missing lastmod ${route.lastmod} for ${route.path}`);
    }
  }

  if (locs.size !== expectedRoutes.length) {
    fail(`sitemap.xml must contain ${expectedRoutes.length} loc entries, found ${locs.size}.`);
  }
}

function validateHealthz(healthz) {
  if (healthz !== "ok\n") {
    fail("healthz must contain exactly: ok");
  }
}

function readArticleRoutes() {
  if (!existsSync(contentDir)) return [];
  return readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = readFileSync(path.join(contentDir, file), "utf8");
      const parsed = matter(source);
      const slug = String(parsed.data.slug ?? "").trim();

      if (!slug) {
        fail(`Missing slug in content/blog/${file}.`);
      }

      return {
        path: `/blog/${slug}/`,
        lastmod: toLastmod(parsed.data.updated ?? parsed.data.date),
      };
    })
    .filter((route) => route.path !== "/blog//")
    .sort((a, b) => a.path.localeCompare(b.path));
}

function readPageRoutes() {
  const localeDir = path.join(process.cwd(), "content", locale);
  const seenSlugs = new Set();
  const routes = [];

  // Method 1: Legacy flat pages/ dir
  if (existsSync(pagesDir)) {
    for (const file of readdirSync(pagesDir).filter((f) => f.endsWith(".md"))) {
      const source = readFileSync(path.join(pagesDir, file), "utf8");
      const parsed = matter(source);
      const slug = String(parsed.data.slug ?? "").trim();
      if (!slug) { fail(`Missing slug in content/pages/${file}.`); continue; }
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      routes.push({ path: `/${slug}/`, lastmod: toLastmod(parsed.data.updated ?? parsed.data.date) });
    }
  }

  // Method 2: New folder-based structure
  const skipDirs = new Set(["blog", "pages", "templates"]);
  if (existsSync(localeDir)) {
    for (const entry of readdirSync(localeDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || skipDirs.has(entry.name)) continue;
      const sectionDir = path.join(localeDir, entry.name);
      if (!existsSync(sectionDir)) continue;
      for (const file of readdirSync(sectionDir).filter((f) => f.endsWith(".md"))) {
        const source = readFileSync(path.join(sectionDir, file), "utf8");
        const parsed = matter(source);
        const layout = String(parsed.data.layout ?? "");
        if (["product", "section", "shop"].includes(layout)) continue;
        const slug = String(parsed.data.slug ?? "").trim();
        if (!slug) { fail(`Missing slug in content/${locale}/${entry.name}/${file}.`); continue; }
        if (seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);
        routes.push({ path: `/${slug}/`, lastmod: toLastmod(parsed.data.updated ?? parsed.data.date) });
      }
    }
  }

  return routes.filter((r) => r.path !== "//").sort((a, b) => a.path.localeCompare(b.path));
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
      for (const tag of parsed.data.tags) {
        tags.add(slugify(String(tag)));
      }
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

if (!siteUrl.startsWith("https://")) {
  fail("SITE_URL/VITE_SITE_URL must start with https:// for SEO file validation.");
}

const expectedRoutes = [
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
  ...(isPro ? readShopRoutes() : []),
];

function readShopRoutes() {
  // Must match scripts/generate-seo-files.mjs (the sitemap source of truth).
  const routes = [{ path: "/shop/" }, { path: "/payment/success/" }];
  const shopSections = ["shop-section-1", "shop-section-2", "shop-section-3", "shop-section-4", "shop-section-5"];
  for (const section of shopSections) {
    routes.push({ path: `/shop/${section}/` });
  }
  const productSlugs = [
    "galaxy-s25-ultra", "macbook-air-m4", "ipad-pro-m4", "airpods-pro-3", "watch-ultra-2", "power-bank-20000",
    "lg-side-by-side", "bosch-washing", "xiaomi-x10", "samsung-microwave", "electrolux-stove", "bosch-dishwasher",
    "sofa-milan", "table-loft", "ergo-chair", "wardrobe-premium", "bed-oslo", "dresser-scandi",
    "kettler-tr1", "trek-bike", "salomon-tent", "nike-zoom", "protein-on", "garmin-venu",
    "svetocopy-paper", "parker-jotter", "desk-organizer", "hp-laserjet", "epson-projector", "rexel-shredder",
  ];
  for (let i = 0; i < shopSections.length; i++) {
    const section = shopSections[i];
    const slugs = productSlugs.slice(i * 6, i * 6 + 6);
    for (const slug of slugs) {
      routes.push({ path: `/shop/${section}/${slug}/` });
    }
  }
  return routes;
}

const robots = readTextFile(path.join(outputDir, "robots.txt"));
const sitemap = readTextFile(path.join(outputDir, "sitemap.xml"));
const healthz = readTextFile(path.join(outputDir, "healthz"));

validateRobots(robots);
validateSitemap(sitemap, expectedRoutes);
validateHealthz(healthz);

if (failures.length > 0) {
  console.error("SEO file validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`SEO file validation passed for ${expectedRoutes.length} route(s).`);
