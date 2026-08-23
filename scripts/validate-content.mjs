import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import matter from "gray-matter";
import { parseBlocks, validateBlocks as validateBlocksShared } from "../src/markdown/blocks.mjs";

const commonFields = [
  "title",
  "description",
  "slug",
  "date",
  "author",
  "schema_type",
  "layout",
];

const articleFields = [
  "category",
  "tags",
];

const validSchemaTypes = [
  "Article",
  "BlogPosting",
  "HowTo",
  "FAQPage",
  "Service",
  "Product",
  "WebPage",
  "LocalBusiness",
  "WebSite",
];

const secretPatterns = [
  /PIXINLINK_API_KEY/i,
  /VITE_PIXINLINK_API_KEY/i,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /sk_live_/,
  /pk_live_/,
];

function collectFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === "templates") continue;
      results.push(...collectFiles(fullPath));
    } else if (extname(entry) === ".md") {
      results.push(fullPath);
    }
  }
  return results;
}

function validateDate(value) {
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "must be a valid date";
  const match = String(value).match(/^\d{4}-\d{2}-\d{2}/);
  if (!match) return "must use YYYY-MM-DD format";
  return null;
}

function validateSlug(value) {
  const str = String(value);
  if (!str || str.length > 200) return "must be 1-200 characters";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str)) return "must be lowercase alphanumeric with hyphens (kebab-case)";
  return null;
}

function validateFrontmatter(filepath, frontmatter) {
  const failures = [];
  const relPath = relative(process.cwd(), filepath).replace(/\\/g, "/");

  for (const field of commonFields) {
    if (!(field in frontmatter)) {
      failures.push(`${relPath}: missing canonical field '${field}'`);
    }
  }

  const isArticle = frontmatter.layout === "article";
  if (isArticle) {
    for (const field of articleFields) {
      if (!(field in frontmatter)) {
        failures.push(`${relPath}: missing canonical field '${field}'`);
      }
    }
  }

  if (frontmatter.title && String(frontmatter.title).length > 70) {
    failures.push(`${relPath}: title exceeds 70 characters`);
  }

  if (frontmatter.description && String(frontmatter.description).length > 160) {
    failures.push(`${relPath}: description exceeds 160 characters`);
  }

  if (frontmatter.slug) {
    const slugErr = validateSlug(frontmatter.slug);
    if (slugErr) failures.push(`${relPath}: slug ${slugErr}`);
  }

  if (frontmatter.date) {
    const dateErr = validateDate(frontmatter.date);
    if (dateErr) failures.push(`${relPath}: date ${dateErr}`);
  }

  if (frontmatter.updated) {
    const dateErr = validateDate(frontmatter.updated);
    if (dateErr) failures.push(`${relPath}: updated ${dateErr}`);
  }

  if (frontmatter.schema_type && !validSchemaTypes.includes(frontmatter.schema_type)) {
    failures.push(`${relPath}: unknown schema_type '${frontmatter.schema_type}'`);
  }

  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    failures.push(`${relPath}: tags must be a YAML array`);
  }

  return failures;
}

function validateBlocks(filepath, body) {
  const failures = [];
  const relPath = relative(process.cwd(), filepath).replace(/\\/g, "/");

  const errors = validateBlocksShared(body);
  for (const err of errors) {
    failures.push(`${relPath}: ${err}`);
  }

  return failures;
}

// Articles must not start their body with an H1 — the H1 comes from the
// PageBanner/title. Checks the rendered body (outside block pairs).
function validateBodyHeadings(filepath, body) {
  const failures = [];
  const relPath = relative(process.cwd(), filepath).replace(/\\/g, "/");
  const { body: bodyText } = parseBlocks(body);

  const firstHeading = bodyText.match(/^\s*(#{1,6})\s+/m);
  if (firstHeading && firstHeading[1].length === 1) {
    failures.push(`${relPath}: article body must not start with an H1 heading (H1 comes from title/PageBanner)`);
  }
  return failures;
}

// Collect the set of known internal routes from all content slugs.
function buildKnownRoutes(entries) {
  const routes = new Set(["/", "/blog/", "/templates/", "/shop/"]);
  for (const entry of entries) {
    if (!entry.slug) continue;
    if (entry.section === "blog") {
      routes.add(`/blog/${entry.slug}/`);
      routes.add(`/blog/${entry.slug}`);
    } else if (entry.section === "shop") {
      routes.add(`/shop/${entry.slug}/`);
      routes.add(`/shop/${entry.slug}`);
    } else if (entry.section) {
      routes.add(`/${entry.section}/${entry.slug}/`);
      routes.add(`/${entry.section}/${entry.slug}`);
      routes.add(`/${entry.slug}/`);
      routes.add(`/${entry.slug}`);
    } else {
      routes.add(`/${entry.slug}/`);
      routes.add(`/${entry.slug}`);
    }
  }
  return routes;
}

// Validate internal links against known routes. Matches only real link
// contexts: HTML `href="..."` and Markdown `[text](/path)`.
function validateInternalLinks(filepath, body, knownRoutes) {
  const failures = [];
  const relPath = relative(process.cwd(), filepath).replace(/\\/g, "/");
  const hrefRe = /href\s*=\s*["']([^"']+)["']/gi;
  const mdLinkRe = /\]\(\s*([^)\s]+)\s*\)/g;
  const links = [];

  let m;
  hrefRe.lastIndex = 0;
  while ((m = hrefRe.exec(body)) !== null) links.push(m[1]);
  mdLinkRe.lastIndex = 0;
  while ((m = mdLinkRe.exec(body)) !== null) links.push(m[1]);

  const seen = new Set();
  for (const raw of links) {
    if (seen.has(raw)) continue;
    seen.add(raw);
    const href = raw.split(/[?#]/)[0];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const path = href.replace(/\/+$/, "") || "/";
    const candidates = [path, `${path}/`];
    if (!candidates.some((c) => knownRoutes.has(c))) {
      failures.push(`${relPath}: broken internal link "${raw}" (no matching route)`);
    }
  }
  return failures;
}

function collectLegacyWarnings(filepath, body) {
  const relPath = relative(process.cwd(), filepath).replace(/\\/g, "/");
  const { legacyWarnings } = parseBlocks(body);
  return legacyWarnings.map((w) => `${relPath}: ${w}`);
}

function validateSecrets(filepath, content) {
  const failures = [];
  const relPath = relative(process.cwd(), filepath).replace(/\\/g, "/");

  for (const pattern of secretPatterns) {
    if (pattern.test(content)) {
      failures.push(`${relPath}: contains forbidden secret-like token matching ${pattern}`);
    }
  }

  return failures;
}

function validateRawHtml(filepath, frontmatter, content) {
  const failures = [];
  const relPath = relative(process.cwd(), filepath).replace(/\\/g, "/");

  if (frontmatter.raw_html !== true) return failures;

  if (/<script[\s>]/i.test(content)) {
    failures.push(`${relPath}: raw_html pages must not contain <script> tags`);
  }
  if (/\son(?:click|load|error|mouseover|mouseout|mouseenter|mouseleave|mousedown|mouseup|keydown|keyup|keypress|change|submit|input|focus|blur|scroll|resize|dblclick|contextmenu|touchstart|touchend|pointerdown|pointerup|animationstart|transitionend|wheel)\w*\s*=/i.test(content)) {
    failures.push(`${relPath}: raw_html pages must not contain inline event handlers (on*)`);
  }
  if (/<main[\s>]/i.test(content)) {
    failures.push(`${relPath}: raw_html pages must not contain a nested <main> element (PageView wraps content in <main>)`);
  }
  return failures;
}

const contentDir = join(process.cwd(), "content");
const promptTemplatesDir = join(contentDir, "prompt-templates");
const files = collectFiles(contentDir).filter(
  (f) => !f.startsWith(promptTemplatesDir),
);
const failures = [];
const warnings = [];

// Per-file metadata collected for cross-file checks.
const allEntries = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const parsed = matter(source);
  const frontmatter = parsed.data;

  failures.push(...validateFrontmatter(file, frontmatter));
  failures.push(...validateBlocks(file, parsed.content));
  failures.push(...validateSecrets(file, source));
  failures.push(...validateRawHtml(file, frontmatter, parsed.content));
  failures.push(...validateBodyHeadings(file, parsed.content));
  warnings.push(...collectLegacyWarnings(file, parsed.content));

  const relPath = relative(process.cwd(), file).replace(/\\/g, "/");
  const localeMatch = relPath.match(/^content\/([a-z]{2})\//);
  const sectionMatch = relPath.match(/^content\/[a-z]{2}\/([^/]+)\//);
  allEntries.push({
    relPath,
    locale: localeMatch ? localeMatch[1] : null,
    section: sectionMatch ? sectionMatch[1] : null,
    slug: frontmatter.slug ? String(frontmatter.slug) : null,
    content: parsed.content,
  });
}

const knownRoutes = buildKnownRoutes(allEntries);

// Internal-link validation runs on the assembled body text.
for (const entry of allEntries) {
  failures.push(...validateInternalLinks(entry.relPath, entry.content, knownRoutes));
}

// Slug uniqueness per (locale, section).
const slugKeys = new Map();
for (const entry of allEntries) {
  if (!entry.slug) continue;
  const key = `${entry.locale}/${entry.section}/${entry.slug}`;
  if (slugKeys.has(key)) {
    failures.push(`Duplicate slug '${entry.slug}' in ${key} (${slugKeys.get(key)} and ${entry.relPath})`);
  } else {
    slugKeys.set(key, entry.relPath);
  }
}

// Locale parity: every path under content/ru must have a counterpart in content/en and vice versa.
function localePathSet(locale) {
  return new Set(
    allEntries
      .filter((e) => e.locale === locale)
      .map((e) => e.relPath.replace(/^content\/[a-z]{2}\//, "")),
  );
}
const ruPaths = localePathSet("ru");
const enPaths = localePathSet("en");
for (const p of ruPaths) {
  if (!enPaths.has(p)) {
    warnings.push(`Locale parity: ${p} exists in content/ru but not content/en`);
  }
}
for (const p of enPaths) {
  if (!ruPaths.has(p)) {
    warnings.push(`Locale parity: ${p} exists in content/en but not content/ru`);
  }
}

if (warnings.length > 0) {
  for (const warning of warnings) {
    console.warn(`  warning: ${warning}`);
  }
}

if (failures.length > 0) {
  console.error(`Content validation failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(`Content validation passed for ${files.length} file(s).`);
