import { writeFileSync } from "node:fs";
import { join } from "node:path";

function loadArticles() {
  const generatedPath = join(process.cwd(), "src", "generated", "articles.ts");
  const source = readFileSync(generatedPath, "utf8");
  const match = source.match(/export const articles = (\[[\s\S]*\])\s*as const/);
  if (!match) throw new Error("Could not parse articles.ts");
  return JSON.parse(match[1]);
}

import { readFileSync, existsSync } from "node:fs";

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
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(join(process.cwd(), ".env"));

const articles = loadArticles();
const locale = process.env.VITE_LOCALE || "ru";
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || "https://githubcms.com").replace(/\/+$/, "");
const isRu = locale === "ru";
const siteName = "GitHub CMS";
const siteDescription = isRu
  ? "Статический сайт с AI-видимостью из коробки. Markdown → JSON-LD → деплой за 2 минуты."
  : "Static site with AI visibility out of the box. Markdown → JSON-LD → deploy in 2 minutes.";
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

    const description = esc(a.frontmatter.description);
    const title = esc(a.frontmatter.title);
    const guid = link;
    const category = a.frontmatter.category ? `<category>${esc(a.frontmatter.category)}</category>` : "";

    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${esc(a.frontmatter.author)}</author>
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
    <lastBuildDate>${toRfc822(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
  </channel>
</rss>
`;

const outputDir = join(process.cwd(), "dist");
writeFileSync(join(outputDir, "rss.xml"), rss, "utf8");

console.log(`RSS feed generated with ${items.length} item(s).`);
