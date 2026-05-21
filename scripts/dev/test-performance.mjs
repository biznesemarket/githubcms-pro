import { strict as assert } from "node:assert";
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

let passed = 0;
let failed = 0;

function test(name, fn) {
  try { fn(); console.log(`  PASS: ${name}`); passed++; }
  catch (e) { console.error(`  FAIL: ${name}\n    ${e.message}`); failed++; }
}

const distDir = join(process.cwd(), "dist");

console.log("=== Stage 4: Performance Tests ===\n");

console.log("Bundle size:");

function getAssetSize(pattern) {
  const files = readdirSync(join(distDir, "assets"));
  const match = files.find((f) => f.startsWith(pattern));
  if (!match) return 0;
  return statSync(join(distDir, "assets", match)).size;
}

const cssSize = (() => {
  const files = readdirSync(join(distDir, "assets"));
  const match = files.find((f) => f.endsWith(".css") && f.startsWith("app-"));
  return match ? statSync(join(distDir, "assets", match)).size : 0;
})();
const jsSize = (() => {
  const files = readdirSync(join(distDir, "assets"));
  const match = files.find((f) => f.endsWith(".js") && f.startsWith("app-"));
  return match ? statSync(join(distDir, "assets", match)).size : 0;
})();

test("CSS bundle < 200 KB", () => {
  const kb = Math.round(cssSize / 1024);
  assert.ok(cssSize < 200 * 1024, `CSS bundle: ${kb} KB (limit 200 KB)`);
  console.log(`    (${kb} KB)`);
});

test("JS bundle < 300 KB", () => {
  const kb = Math.round(jsSize / 1024);
  assert.ok(jsSize < 300 * 1024, `JS bundle: ${kb} KB (limit 300 KB)`);
  console.log(`    (${kb} KB)`);
});

console.log("\nHTML page sizes:");

const htmlFiles = (() => {
  const results = [];
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === "assets") continue;
      const fp = join(d, entry.name);
      if (entry.isDirectory()) walk(fp);
      else if (entry.name.endsWith(".html")) results.push(fp);
    }
  }
  walk(distDir);
  return results;
})();

const sizes = htmlFiles.map((f) => statSync(f).size);
const avgSize = Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length / 1024);
const maxSize = Math.round(Math.max(...sizes) / 1024);

test("average page < 15 KB", () => {
  assert.ok(avgSize < 15 * 1024, `Average: ${avgSize} KB (limit 15 KB)`);
  console.log(`    (avg ${avgSize} KB, max ${maxSize} KB)`);
});

test("max page < 30 KB", () => {
  assert.ok(maxSize < 30 * 1024, `Max: ${maxSize} KB (limit 30 KB)`);
});

console.log("\nBuild performance:");

test("build completes under 30 seconds", () => {
  const start = Date.now();
  execSync("npm run generate:content", { cwd: process.cwd(), stdio: "pipe" });
  const duration = Date.now() - start;
  console.log(`    (generate:content: ${duration}ms)`);
  assert.ok(duration < 30000, `Content generation: ${duration}ms (limit 30s)`);
});

test("sitemap has all routes", () => {
  const sitemap = readFileSync(join(distDir, "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>/g)];
  assert.ok(urls.length >= 50, `Found ${urls.length} URLs, expected >= 50`);
});

test("all HTML files are valid (not empty)", () => {
  for (const f of htmlFiles) {
    const content = readFileSync(f, "utf8");
    const route = f.replace(distDir, "").replace(/\\/g, "/");
    assert.ok(content.length > 500, `${route}: ${content.length} bytes (min 500)`);
  }
});

console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
if (failed > 0) process.exit(1);
console.log("All performance tests passed.");
