import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "./shared/slugify.mjs";
import { loadProjectEnv } from "./shared/load-env.mjs";

loadProjectEnv();

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
const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || process.env.SITE_URL || "http://localhost:5173");

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
  const contentDir = path.join(process.cwd(), "content", locale, "blog");
  if (!existsSync(contentDir)) return [];

  const errors = [];
  const routes = readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = readFileSync(path.join(contentDir, file), "utf8");
      const parsed = matter(source);
      const slug = String(parsed.data.slug ?? "").trim();

      if (!slug) {
        errors.push(`Missing slug in content/${locale}/blog/${file} — skipped`);
        return null;
      }

      return {
        path: `/blog/${slug}/`,
        lastmod: toLastmod(parsed.data.updated ?? parsed.data.date),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.path.localeCompare(b.path));

  if (errors.length) console.warn(`Blog slug warnings:\n  ${errors.join("\n  ")}`);
  return routes;
}

function readPageRoutes() {
  // Legacy flat dir: content/{locale}/pages/
  const pagesDir = path.join(process.cwd(), "content", locale, "pages");
  // New folder-based structure: content/{locale}/{home,about,contact,...}/
  const localeDir = path.join(process.cwd(), "content", locale);

  const errors = [];
  const seenSlugs = new Set();
  const routes = [];

  // Method 1: Legacy flat pages/ dir
  if (existsSync(pagesDir)) {
    for (const file of readdirSync(pagesDir).filter((f) => f.endsWith(".md"))) {
      const source = readFileSync(path.join(pagesDir, file), "utf8");
      const parsed = matter(source);
      const slug = String(parsed.data.slug ?? "").trim();
      if (!slug) { errors.push(`Missing slug in content/${locale}/pages/${file} — skipped`); continue; }
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      routes.push({ path: `/${slug}/`, lastmod: toLastmod(parsed.data.updated ?? parsed.data.date) });
    }
  }

  // Method 2: New folder-based structure — walk subdirs, find index.md + other .md files
  const skipDirs = new Set(["blog", "pages", "templates"]);
  if (existsSync(localeDir)) {
    for (const entry of readdirSync(localeDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || skipDirs.has(entry.name)) continue;
      const sectionDir = path.join(localeDir, entry.name);
      for (const file of readdirSync(sectionDir).filter((f) => f.endsWith(".md"))) {
        const source = readFileSync(path.join(sectionDir, file), "utf8");
        const parsed = matter(source);
        // Skip shop content (product/section/shop layouts) — handled by dedicated shop routes
        const layout = String(parsed.data.layout ?? "");
        if (["product", "section", "shop"].includes(layout)) continue;
        const slug = String(parsed.data.slug ?? "").trim();
        if (!slug) { errors.push(`Missing slug in content/${locale}/${entry.name}/${file} — skipped`); continue; }
        if (seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);
        // For index.md, the slug IS the folder name (e.g., about, contact)
        // Use the slug from frontmatter — it's already correct
        const routePath = file === "index.md" ? `/${slug}/` : `/${slug}/`;
        routes.push({ path: routePath, lastmod: toLastmod(parsed.data.updated ?? parsed.data.date) });
      }
    }
  }

  if (errors.length) console.warn(`Page slug warnings:\n  ${errors.join("\n  ")}`);
  return routes.sort((a, b) => a.path.localeCompare(b.path));
}

function renderSitemap(routes) {
  const urls = routes
    .map((route) => {
      const lastmod = route.lastmod ? `\n    <lastmod>${xmlEscape(route.lastmod)}</lastmod>` : "";
      const isBlog = route.path.startsWith("/blog/") && !route.path.startsWith("/blog/page/");
      const isPaginated = route.path.includes("/page/");
      // Blog articles: weekly, high priority. Pages: monthly. Pagination: daily, low.
      const changefreq = isBlog ? "weekly" : isPaginated ? "daily" : "monthly";
      const priority = isBlog ? "0.8" : isPaginated ? "0.4" : route.path === "/" ? "1.0" : "0.6";
      return `  <url>\n    <loc>${xmlEscape(absoluteUrl(route.path))}</loc>${lastmod}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
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
  // ⚠️ Shop routes must match src/routes.ts + scripts/inject-seo.mjs product slugs.
  // Shop sections
  { path: "/shop/", lastmod: undefined },
  ...["shop-section-1","shop-section-2","shop-section-3","shop-section-4","shop-section-5"].flatMap(s => [
    { path: `/shop/${s}/`, lastmod: undefined },
  ]),
  // Product detail pages
  ...["shop-section-1","shop-section-2","shop-section-3","shop-section-4","shop-section-5"].flatMap((s, i) => {
    const slugs = [
      "galaxy-s25-ultra", "macbook-air-m4", "ipad-pro-m4", "airpods-pro-3", "watch-ultra-2", "power-bank-20000",
      "lg-side-by-side", "bosch-washing", "xiaomi-x10", "samsung-microwave", "electrolux-stove", "bosch-dishwasher",
      "sofa-milan", "table-loft", "ergo-chair", "wardrobe-premium", "bed-oslo", "dresser-scandi",
      "kettler-tr1", "trek-bike", "salomon-tent", "nike-zoom", "protein-on", "garmin-venu",
      "svetocopy-paper", "parker-jotter", "desk-organizer", "hp-laserjet", "epson-projector", "rexel-shredder",
    ];
    return slugs.slice(i * 6, i * 6 + 6).map(slug => ({ path: `/shop/${s}/${slug}/`, lastmod: undefined }));
  }),
  // Payment
  { path: "/payment/success/", lastmod: undefined },
  ] : []),
];

mkdirSync(outputDir, { recursive: true });
writeFileSync(path.join(outputDir, "sitemap.xml"), renderSitemap(routes), "utf8");
writeFileSync(path.join(outputDir, "robots.txt"), renderRobots(), "utf8");
writeFileSync(path.join(outputDir, "healthz"), "ok\n", "utf8");

console.log(`Generated robots.txt, sitemap.xml and healthz for ${routes.length} route(s).`);
