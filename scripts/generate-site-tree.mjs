import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";

const rootDir = join(import.meta.dirname, "..");
const outputDir = join(rootDir, "src", "generated");
const locale = process.env.VITE_LOCALE || "ru";

function loadConfig() {
  const configPath = join(rootDir, "site-tree.config.yaml");
  const raw = readFileSync(configPath, "utf8");
  return yaml.load(raw);
}

function loadAllPages() {
  const jsonPath = join(outputDir, "all-pages.json");
  const raw = readFileSync(jsonPath, "utf8");
  return JSON.parse(raw);
}

function discoverContentSections() {
  const ruDir = join(rootDir, "content", "ru");
  const sections = new Set();
  for (const entry of readdirSync(ruDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    try {
      readFileSync(join(ruDir, entry.name, "index.md"), "utf8");
      sections.add(entry.name);
    } catch {}
  }
  return sections;
}

function readFrontmatterTitle(sectionDir, locale) {
  const indexPath = join(rootDir, "content", locale, sectionDir, "index.md");
  try {
    const raw = readFileSync(indexPath, "utf8");
    const m = raw.match(/^---\n([\s\S]*?)\n---/);
    if (m) return yaml.load(m[1]).title || sectionDir;
  } catch {}
  return sectionDir;
}

function buildSiteTree(config, allPages) {
  const skipSlugs = new Set(config.skipSlugs ?? []);
  const legacyMap = config.legacySections?.sections ?? {};
  const legacySectionEntries = Object.entries(legacyMap);

  const sections = [];

  for (const sectionConfig of config.order) {
    const { id, path, title, dropdown } = sectionConfig;

    // Collect pages for this section
    let sectionPages = [];

    // Method 1: pages already in this section folder (new structure)
    sectionPages = allPages.filter(
      (p) => p.section === id && !skipSlugs.has(p.frontmatter.slug),
    );

    // Method 2: legacy mapping — pages from flat "sections/" or "pages/" dirs
    if (sectionPages.length === 0) {
      for (const [legacySection, slugs] of legacySectionEntries) {
        if (slugs.includes("*") || legacySection === id) {
          // This section matches a legacy section key
        }
        if (id === legacySection) {
          const slugSet = new Set(slugs);
          sectionPages = allPages.filter(
            (p) =>
              (p.section === "sections" || p.section === "pages") &&
              slugSet.has(p.frontmatter.slug) &&
              !skipSlugs.has(p.frontmatter.slug),
          );
          break;
        }
      }
    }

    // Method 3: pages from flat "pages/" that match the section by slug prefix
    if (sectionPages.length === 0) {
      sectionPages = allPages.filter(
        (p) =>
          p.section === "pages" &&
          !skipSlugs.has(p.frontmatter.slug) &&
          (p.frontmatter.slug === id ||
            p.frontmatter.slug.startsWith(`${id}-`) ||
            p.frontmatter.slug.startsWith(`${id}/`)),
      );
    }

    // Find the index page (if any) and put it first
    const indexPage = sectionPages.find(
      (p) => p.isIndex || p.frontmatter.slug === id,
    );
    const otherPages = sectionPages.filter(
      (p) => p !== indexPage && (p.isIndex ? false : p.frontmatter.slug !== id),
    );

    const orderedPages = indexPage
      ? [indexPage, ...otherPages]
      : otherPages;

    // Build page entries for site-tree
    const pages = orderedPages.map((p) => ({
      slug: p.frontmatter.slug,
      title: p.frontmatter.title,
      description: p.frontmatter.description,
      isIndex: p.isIndex || p.frontmatter.slug === id,
      path: p.path,
    }));

    sections.push({
      id,
      path,
      title: title[locale] ?? title.ru ?? title.en ?? id,
      titleRu: title.ru ?? id,
      titleEn: title.en ?? id,
      dropdown: dropdown ?? false,
      pages,
      component: sectionConfig.component ?? null,
    });
  }

  return { sections };
}

function buildSectionNav(config, allPages) {
  const skipSlugs = new Set(config.skipSlugs ?? []);
  const legacyMap = config.legacySections?.sections ?? {};
  const result = {};

  for (const sectionConfig of config.order) {
    const { id, title } = sectionConfig;
    const articles = {};

    // Find pages for this section (same logic as buildSiteTree)
    let sectionPages = allPages.filter(
      (p) => p.section === id && !skipSlugs.has(p.frontmatter.slug) && !p.isIndex && p.frontmatter.slug !== id,
    );

    if (sectionPages.length === 0 && legacyMap[id]) {
      const slugSet = new Set(legacyMap[id]);
      sectionPages = allPages.filter(
        (p) =>
          (p.section === "sections" || p.section === "pages") &&
          slugSet.has(p.frontmatter.slug) &&
          !skipSlugs.has(p.frontmatter.slug),
      );
    }

    if (sectionPages.length === 0) {
      sectionPages = allPages.filter(
        (p) =>
          p.section === "pages" &&
          !skipSlugs.has(p.frontmatter.slug) &&
          p.frontmatter.slug !== id &&
          (p.frontmatter.slug.startsWith(`${id}-`) || p.frontmatter.slug.startsWith(`${id}/`)),
      );
    }

    for (const p of sectionPages) {
      articles[p.frontmatter.slug] = p.frontmatter.title;
    }

    result[id] = {
      title: title[locale] ?? title.ru ?? title.en ?? id,
      titleRu: title.ru ?? id,
      titleEn: title.en ?? id,
      articles,
    };
  }

  return result;
}

function generate() {
  const config = loadConfig();
  const allPages = loadAllPages();

  // Auto-discover content folders not in site-tree.config.yaml
  const configuredIds = new Set(config.order.map((s) => s.id));
  for (const folderName of discoverContentSections()) {
    if (!configuredIds.has(folderName)) {
      config.order.push({
        id: folderName,
        path: `/${folderName}/`,
        title: {
          ru: readFrontmatterTitle(folderName, "ru"),
          en: readFrontmatterTitle(folderName, "en"),
        },
        dropdown: true,
      });
    }
  }

  const siteTree = buildSiteTree(config, allPages);
  const sectionNav = buildSectionNav(config, allPages);

  mkdirSync(outputDir, { recursive: true });

  // site-tree.ts
  writeFileSync(
    join(outputDir, "site-tree.ts"),
    `/* This file is generated by scripts/generate-site-tree.mjs. */\n` +
      `export const siteTree = ${JSON.stringify(siteTree, null, 2)} as const;\n` +
      `export type SiteTree = typeof siteTree;\n`,
    "utf8",
  );

  // section-nav.ts
  writeFileSync(
    join(outputDir, "section-nav.ts"),
    `/* This file is generated by scripts/generate-site-tree.mjs. */\n` +
      `export const sectionNav = ${JSON.stringify(sectionNav, null, 2)} as const;\n`,
    "utf8",
  );

  const totalPages = siteTree.sections.reduce((sum, s) => sum + s.pages.length, 0);
  console.log(
    `Generated site-tree: ${siteTree.sections.length} sections, ${totalPages} pages.`,
  );
}

generate();
