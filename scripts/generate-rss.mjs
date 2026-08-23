import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { loadProjectEnv } from "./shared/load-env.mjs";

loadProjectEnv();

function loadAllPages() {
  const generatedPath = join(process.cwd(), "src", "generated", "all-pages.json");
  const source = readFileSync(generatedPath, "utf8");
  try {
    return JSON.parse(source);
  } catch (e) {
    throw new Error(`Failed to parse all-pages.json: ${e.message}`);
  }
}

const allPages = loadAllPages();
const articles = allPages.filter((p) => p.section === "blog");

function loadSiteConfig() {
  const configPath = join(process.cwd(), "src", "generated", "site-config.json");
  try {
    return JSON.parse(readFileSync(configPath, "utf8"));
  } catch {
    return null;
  }
}

const siteConfig = loadSiteConfig();
const locale = siteConfig?.locale || process.env.VITE_LOCALE || "ru";
const siteUrl = (siteConfig?.siteUrl || process.env.VITE_SITE_URL || process.env.SITE_URL || "http://localhost:5173").replace(/\/+$/, "");
const isRu = locale === "ru";
const siteName = process.env.VITE_SITE_NAME || siteConfig?.siteName || (isRu ? "Мой Сайт" : "My Site");
const siteDescription = process.env.VITE_SITE_DESCRIPTION || (isRu
  ? "Статический сайт. Markdown в JSON-LD и деплой."
  : "Static site. Markdown to JSON-LD and deploy.");
const rssLanguage = isRu ? "ru" : "en";

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toRfc822(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toUTCString();
}

const items = articles
  .map((a) => {
    const slug = a.frontmatter.slug;
    const link = `${siteUrl}/blog/${slug}/`;
    const pubDate = toRfc822(a.frontmatter.date);
    if (!pubDate) return null;

    const description = esc(a.frontmatter.description || "");
    const title = esc(a.frontmatter.title || "");
    const guid = link;
    const category = a.frontmatter.category ? `<category>${esc(a.frontmatter.category)}</category>` : "";

    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${esc(a.frontmatter.author || "")}</author>
      ${category}
    </item>`;
  })
  .filter(Boolean);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteName)}</title>
    <link>${siteUrl}/</link>
    <description>${esc(siteDescription)}</description>
    <language>${rssLanguage}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
  </channel>
</rss>
`;

const outputDir = join(process.cwd(), "dist");
try {
  writeFileSync(join(outputDir, "rss.xml"), rss, "utf8");
} catch (e) {
  console.error(`Failed to write RSS feed: ${e.message}`);
  process.exit(1);
}

console.log(`RSS feed generated with ${items.length} item(s).`);
