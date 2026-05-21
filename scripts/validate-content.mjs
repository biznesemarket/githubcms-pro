import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import matter from "gray-matter";

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

  const markers = body.match(/<!--\s*@block:\s*(\S+)\s*-->/g) || [];
  const seen = new Set();

  for (const marker of markers) {
    const name = marker.match(/@block:\s*(\S+)/)[1];
    if (seen.has(name)) {
      failures.push(`${relPath}: duplicate block marker '${name}'`);
    }
    seen.add(name);
  }

  return failures;
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

const contentDir = join(process.cwd(), "content");
const templatesDir = join(contentDir, "templates");
const files = collectFiles(contentDir).filter(
  (f) => !f.startsWith(templatesDir),
);
const failures = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const parsed = matter(source);
  const frontmatter = parsed.data;

  failures.push(...validateFrontmatter(file, frontmatter));
  failures.push(...validateBlocks(file, parsed.content));
  failures.push(...validateSecrets(file, source));
}

if (failures.length > 0) {
  console.error(`Content validation failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(`Content validation passed for ${files.length} file(s).`);
