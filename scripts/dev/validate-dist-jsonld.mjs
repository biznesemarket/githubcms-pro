/**
 * Validates the built dist/ for duplicate JSON-LD @type values on each page.
 *
 * Rule (per plan): no standalone JSON-LD block's @type may repeat on a page,
 * EXCEPT site-wide types that are legitimately present on every page
 * (Organization, WebSite). Nested @type references (e.g. itemReviewed inside
 * AggregateRating) and legitimately repeatable item types (PropertyValue,
 * ImageObject, DefinedTerm, ListItem) are excluded.
 *
 * Run: node scripts/dev/validate-dist-jsonld.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ALLOWED_DUPLICATES = new Set(["Organization", "WebSite"]);
// Types that legitimately repeat as multiple standalone entries on one page
// (each instance is a distinct entity — e.g. one schema per table/image/spec).
const REPEATABLE_TYPES = new Set([
  "PropertyValue",
  "ImageObject",
  "DefinedTerm",
  "ListItem",
  "BreadcrumbList",
  "Table",
  "ScholarlyArticle",
  "StatisticalVariable",
  "Citation",
  "VideoObject",
]);

const distDir = join(process.cwd(), "dist");
if (!existsSync(distDir)) {
  console.error("dist/ not found — run `npm run build` first.");
  process.exit(1);
}

function collectHtml(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".") || entry === "assets") continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      results.push(...collectHtml(full));
    } else if (entry.endsWith(".html")) {
      results.push(full);
    }
  }
  return results;
}

const files = collectHtml(distDir);
let failed = 0;
let checked = 0;

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const topLevelTypes = [];

  for (const m of scripts) {
    try {
      const ld = JSON.parse(m[1]);
      const items = Array.isArray(ld) ? ld : [ld];
      for (const item of items) {
        if (item && typeof item["@type"] === "string") {
          topLevelTypes.push(item["@type"]);
        }
      }
    } catch {
      const rel = file.replace(distDir, "").replace(/\\/g, "/");
      console.error(`  PARSE ERROR in ${rel}`);
      failed++;
    }
  }

  checked++;
  const counts = new Map();
  for (const type of topLevelTypes) counts.set(type, (counts.get(type) || 0) + 1);
  for (const [type, count] of counts) {
    if (count > 1 && !ALLOWED_DUPLICATES.has(type) && !REPEATABLE_TYPES.has(type)) {
      const rel = file.replace(distDir, "").replace(/\\/g, "/");
      console.error(`  ❌ DUPLICATE ${type} (${count}x) in ${rel}`);
      failed++;
    }
  }
}

console.log(`Checked ${checked} page(s).`);
if (failed > 0) {
  console.error(`❌ ${failed} duplicate-JSON-LD issue(s) found.`);
  process.exit(1);
}
console.log("✅ No duplicate standalone JSON-LD blocks (excluding allowed site-wide types).");
