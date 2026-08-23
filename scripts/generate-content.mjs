import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  statSync,
} from "node:fs";
import { join, relative, dirname } from "node:path";
import matter from "gray-matter";
import { parseBlocks, extractFaq, renderMarkdown } from "../src/markdown/blocks.mjs";
import { slugify } from "./shared/slugify.mjs";

const rootDir = join(import.meta.dirname, "..");
const outputDir = join(rootDir, "src", "generated");

function normalizeStringArray(value) {
  return Array.isArray(value) ? value.map(String) : [];
}

// Convert ordered block array from parseBlocks into a name-keyed map while
// keeping `position` so consumers can render in source order.
function blocksToMap(blocks) {
  const map = {};
  for (const block of blocks) {
    map[block.name] = {
      html: block.html,
      plainText: block.plainText,
      position: block.position,
    };
  }
  return map;
}

const markdownCache = new Map();

function toContentFile(absolutePath, relativePath) {
  const source = readFileSync(absolutePath, "utf8");
  const parsed = matter(source);
  const frontmatter = parsed.data;
  const filename = absolutePath.split(/[/\\]/).pop();
  const slug =
    String(
      frontmatter.slug || slugify(frontmatter.title || filename.replace(/\.md$/, "")),
    ).trim();

  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    console.warn(
      `Warning: slug "${slug}" in ${relativePath} must be kebab-case (lowercase alphanumeric with hyphens)`,
    );
  }

  const blockResult = parseBlocks(parsed.content);
  for (const warning of blockResult.legacyWarnings) {
    console.warn(`Legacy marker in ${relativePath}: ${warning}`);
  }
  for (const error of blockResult.errors) {
    console.warn(`Block parsing issue in ${relativePath}: ${error}`);
  }

  const blocks = blocksToMap(blockResult.blocks);
  const faqBlock = blockResult.blocks.find((b) => b.name === "faq");
  const faqItems = extractFaq(faqBlock?.markdown);

  const cacheKey = `${relativePath}:${blockResult.body.length}`;
  let html = markdownCache.get(cacheKey);
  if (!html) {
    html = renderMarkdown(blockResult.body);
    markdownCache.set(cacheKey, html);
    if (markdownCache.size > 500) {
      let evicted = 0;
      for (const key of markdownCache.keys()) {
        markdownCache.delete(key);
        if (++evicted >= 100) break;
      }
    }
  }

  const wordCount = blockResult.body.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const isRawHtml = frontmatter.raw_html === true;

  return {
    path: relativePath,
    frontmatter: {
      ...parsed.data,
      title: String(frontmatter.title ?? ""),
      description: String(frontmatter.description ?? ""),
      slug,
      date: String(frontmatter.date ?? ""),
      image: String(frontmatter.image ?? ""),
      price: frontmatter.price != null ? Number(frontmatter.price) : undefined,
      layout: String(frontmatter.layout ?? "article"),
      section: String(frontmatter.section ?? ""),
      section_title: String(frontmatter.section_title ?? ""),
      template_style: frontmatter.template_style != null ? Number(frontmatter.template_style) : undefined,
      updated: frontmatter.updated ? String(frontmatter.updated) : undefined,
      author: String(frontmatter.author ?? "GitHub CMS"),
      category: String(frontmatter.category ?? "General"),
      tags: normalizeStringArray(frontmatter.tags),
      schema_type: String(frontmatter.schema_type ?? "Article"),
      cover_image: frontmatter.cover_image
        ? String(frontmatter.cover_image)
        : undefined,
      geo: normalizeStringArray(frontmatter.geo),
      specs: frontmatter.specs ?? [],
      faq: frontmatter.faq ?? [],
      reviews: frontmatter.reviews ?? [],
      benefits: frontmatter.benefits ?? [],
      howto: frontmatter.howto ?? [],
      raw_html: frontmatter.raw_html,
    },
    html,
    rawHtml: isRawHtml ? parsed.content.trim() : undefined,
    blocks,
    faqItems,
    readingTime,
  };
}

function getLocale() {
  return process.env.VITE_LOCALE || "ru";
}

/**
 * Walk content/{locale}/ recursively, return all .md files grouped by section.
 * Skips content/{locale}/templates/ — those are AI prompt templates.
 */
function walkContent(locale) {
  const localeDir = join(rootDir, "content", locale);
  if (!existsSync(localeDir)) return [];

  const results = [];
  const skipDirs = new Set(["templates"]);

  function walk(dir, section) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        if (!skipDirs.has(entry)) {
          walk(fullPath, entry);
        }
      } else if (stat.isFile() && entry.endsWith(".md")) {
        const relPath = relative(rootDir, fullPath).replace(/\\/g, "/");
        const page = toContentFile(fullPath, relPath);
        const isIndex = entry === "index.md";
        results.push({ ...page, section, isIndex });
      }
    }
  }

  // Walk top-level dirs under locale (blog, pages, sections) AND subdirs of locale itself
  for (const entry of readdirSync(localeDir)) {
    const fullPath = join(localeDir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory() && !skipDirs.has(entry)) {
      // Check if this is a leaf-content dir (has .md files) or nested (has subdirs)
      const hasMd = readdirSync(fullPath).some(
        (f) => f.endsWith(".md") && statSync(join(fullPath, f)).isFile(),
      );
      const hasSubdirs = readdirSync(fullPath).some(
        (f) => statSync(join(fullPath, f)).isDirectory(),
      );

      if (hasMd && !hasSubdirs) {
        // Legacy flat dir: pages/, sections/
        walk(fullPath, entry === "blog" ? "blog" : entry === "pages" ? "pages" : entry);
      } else {
        // New folder-based structure: home/, about/, section-geo/ etc.
        walk(fullPath, entry);
      }
    } else if (stat.isFile() && entry.endsWith(".md")) {
      // Top-level .md files under locale (unlikely but handle)
      const relPath = relative(rootDir, fullPath).replace(/\\/g, "/");
      const page = toContentFile(fullPath, relPath);
      results.push({ ...page, section: "root", isIndex: false });
    }
  }

  return results;
}

function generateContentFiles(locale) {
  const allPages = walkContent(locale);

  const blogArticles = allPages
    .filter((p) => p.section === "blog")
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));

  const staticPages = allPages.filter((p) => p.section !== "blog");

  mkdirSync(outputDir, { recursive: true });

  // articles.ts — blog articles (backward compat)
  writeFileSync(
    join(outputDir, "articles.ts"),
    `/* This file is generated by scripts/generate-content.mjs. */\n` +
      `export const articles = ${JSON.stringify(blogArticles, null, 2)} as const;\n`,
    "utf8",
  );

  // pages.ts — static pages (backward compat, same format as before)
  writeFileSync(
    join(outputDir, "pages.ts"),
    `/* This file is generated by scripts/generate-content.mjs. */\n` +
      `export const pages = ${JSON.stringify(staticPages, null, 2)} as const;\n`,
    "utf8",
  );

  // all-pages.ts — full data with section metadata (new)
  writeFileSync(
    join(outputDir, "all-pages.ts"),
    `/* This file is generated by scripts/generate-content.mjs. */\n` +
      `export const allPages = ${JSON.stringify(allPages, null, 2)} as const;\n`,
    "utf8",
  );

  // Generate JSON files for section articles (replaces build-section-content.mjs)
  // These go to public/content/{section}/{slug}.json for runtime fetch
  const legacySectionMap = {
    "section-geo": ["geo-rukovodstvo", "json-ld-gajd", "e-e-a-t-signaly", "featured-snippets", "seo-vs-geo"],
    "section-devops": ["deploj-obzor", "vps-i-nginx", "github-actions", "bezopasnost", "monitoring"],
    "section-content": ["markdown-obzor", "yaml-frontmatter", "prompt-shablony", "ai-kontent", "migracija-s-wordpress"],
  };

  function getSectionDir(page) {
    // New folder structure: section is already the correct ID
    if (!["blog", "pages", "sections", "root"].includes(page.section)) {
      return page.section;
    }
    // Legacy flat sections/: map slug to correct section ID
    if (page.section === "sections") {
      for (const [id, slugs] of Object.entries(legacySectionMap)) {
        if (slugs.includes(page.frontmatter.slug)) return id;
      }
    }
    return null;
  }

  let sectionJsonCount = 0;
  for (const page of allPages) {
    if (!page.section || page.isIndex) continue;
    const secId = getSectionDir(page);
    if (!secId) continue;
    const secPath = join(rootDir, "public", "content", secId);
    mkdirSync(secPath, { recursive: true });
    const json = JSON.stringify({
      title: page.frontmatter.title,
      description: page.frontmatter.description,
      html: page.rawHtml ?? page.html,
      raw: !!page.rawHtml,
    });
    writeFileSync(
      join(secPath, `${page.frontmatter.slug}.json`),
      json,
      "utf8",
    );
    sectionJsonCount++;
  }

  // all-pages.json — read by generate-site-tree.mjs (avoids TS import complexity)
  writeFileSync(
    join(outputDir, "all-pages.json"),
    JSON.stringify(allPages, null, 2),
    "utf8",
  );

  console.log(
    `Generated: ${blogArticles.length} articles, ${staticPages.length} pages (${sectionJsonCount} section articles with JSON).`,
  );

  // Clean up — release cached HTML objects (mostly relevant for 1000+ page builds)
  markdownCache.clear();
}

const locale = getLocale();
generateContentFiles(locale);
