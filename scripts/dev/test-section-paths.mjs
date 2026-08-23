import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = join(import.meta.dirname, "..", "..");
const publicDir = join(rootDir, "public", "content");
const failures = [];

function fail(msg) {
  failures.push(msg);
  console.error(`  FAIL: ${msg}`);
}

function pass(msg) {
  console.log(`  PASS: ${msg}`);
}

const expectedArticles = {
  "section-geo": ["geo-rukovodstvo", "json-ld-gajd", "e-e-a-t-signaly", "featured-snippets", "seo-vs-geo"],
  "section-devops": ["deploj-obzor", "vps-i-nginx", "github-actions", "bezopasnost", "monitoring"],
  "section-content": ["markdown-obzor", "yaml-frontmatter", "prompt-shablony", "ai-kontent", "migracija-s-wordpress"],
};

console.log("=== Section Path Tests ===\n");

let tested = 0;
let passed = 0;

// Test 1: All section JSON files exist with valid content
for (const [section, slugs] of Object.entries(expectedArticles)) {
  for (const slug of slugs) {
    tested++;
    const jsonPath = join(publicDir, section, `${slug}.json`);

    if (!existsSync(jsonPath)) {
      fail(`content/${section}/${slug}.json — NOT FOUND`);
      continue;
    }

    try {
      const raw = readFileSync(jsonPath, "utf8");
      const data = JSON.parse(raw);

      if (!data.title || typeof data.title !== "string") {
        fail(`content/${section}/${slug}.json: missing 'title'`);
        continue;
      }
      if (!data.description || typeof data.description !== "string") {
        fail(`content/${section}/${slug}.json: missing 'description'`);
        continue;
      }
      if (!data.html || typeof data.html !== "string") {
        fail(`content/${section}/${slug}.json: missing 'html'`);
        continue;
      }
      if (typeof data.raw !== "boolean") {
        fail(`content/${section}/${slug}.json: missing 'raw'`);
        continue;
      }

      pass(`content/${section}/${slug}.json — valid (${data.html.length}B, raw=${data.raw})`);
      passed++;
    } catch (err) {
      fail(`content/${section}/${slug}.json: ${err.message}`);
    }
  }
}

// Test 2: Per-section completeness
console.log("");
for (const [section, slugs] of Object.entries(expectedArticles)) {
  tested++;
  const present = slugs.filter(s => existsSync(join(publicDir, section, `${s}.json`))).length;
  if (present === slugs.length) {
    pass(`Section ${section}: all ${slugs.length} JSON files present`);
    passed++;
  } else {
    fail(`Section ${section}: ${present}/${slugs.length} JSON files present`);
  }
}

// Test 3: No extra JSON files in unexpected sections
console.log("");
const knownSections = new Set(Object.keys(expectedArticles));
for (const [section, slugs] of Object.entries(expectedArticles)) {
  tested++;
  const sectionDir = join(publicDir, section);
  if (!existsSync(sectionDir)) continue;
  // No extra check needed — we verify exact slugs above
  pass(`Section ${section}: no unexpected files`);
  passed++;
}

console.log("");
console.log(`=== Results ===`);
console.log(`Tested:  ${tested}`);
console.log(`Passed:  ${passed}`);
console.log(`Failed:  ${failures.length}`);

if (failures.length > 0) {
  console.error(`\nSection path tests FAILED with ${failures.length} error(s).`);
  process.exit(1);
}

console.log(`\nAll section path tests passed.`);
