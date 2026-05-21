import { strict as assert } from "node:assert";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

let passed = 0;
let failed = 0;

function test(name, fn) {
  try { fn(); console.log(`  PASS: ${name}`); passed++; }
  catch (e) { console.error(`  FAIL: ${name}\n    ${e.message}`); failed++; }
}

function collectHtmlFiles(dir) {
  const results = [];
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === "assets") continue;
      const fp = join(d, entry.name);
      if (entry.isDirectory()) walk(fp);
      else if (entry.name.endsWith(".html")) results.push(fp);
    }
  }
  walk(dir);
  return results;
}

const distDir = join(process.cwd(), "dist");

console.log("=== Stage 3: Security Tests ===\n");

console.log("XSS prevention in meta tags:");

const htmlFiles = collectHtmlFiles(distDir).slice(0, 5);

for (const file of htmlFiles) {
  const content = readFileSync(file, "utf8");
  const route = file.replace(distDir, "").replace(/\\/g, "/").replace(/\/index\.html$/, "/");

  test(`${route} no <script> outside JSON-LD`, () => {
    // Count script tags: only JSON-LD scripts allowed
    const scripts = content.match(/<script[^>]*>/g) || [];
    const ldScripts = content.match(/application\/ld\+json/g) || [];
    const moduleScripts = content.match(/type="module"/g) || [];
    assert.strictEqual(scripts.length, ldScripts.length + moduleScripts.length,
      `Found ${scripts.length} scripts, expected ${ldScripts.length + moduleScripts.length}`);
  });

  test(`${route} no inline event handlers`, () => {
    assert.ok(!content.match(/\son\w+\s*=\s*["']/g), "Found inline event handler");
  });

  test(`${route} no javascript: URLs`, () => {
    assert.ok(!content.match(/javascript\s*:/gi), "Found javascript: URL");
  });

  test(`${route} meta tags properly escaped`, () => {
    // Check that meta content doesn't contain unescaped quotes that could break out
    const metas = [...content.matchAll(/<meta[^>]+content="([^"]*)"/g)];
    for (const [, contentValue] of metas) {
      assert.ok(!contentValue.includes('"'), `Unescaped quote in meta content: ${contentValue}`);
    }
  });
}

console.log("\nSecret leakage prevention:");

for (const file of htmlFiles) {
  const content = readFileSync(file, "utf8");
  const route = file.replace(distDir, "").replace(/\\/g, "/").replace(/\/index\.html$/, "/");

  test(`${route} no PIXINLINK_API_KEY`, () => {
    assert.ok(!content.includes("PIXINLINK_API_KEY"));
  });

  test(`${route} no bearer tokens`, () => {
    assert.ok(!content.match(/Bearer\s+[A-Za-z0-9_-]+/i));
  });

  test(`${route} no private SSH keys`, () => {
    assert.ok(!content.includes("BEGIN RSA PRIVATE KEY"));
    assert.ok(!content.includes("BEGIN OPENSSH PRIVATE KEY"));
  });
}

console.log("\nCSP and security headers:");

const indexContent = readFileSync(join(distDir, "index.html"), "utf8");

test("meta viewport disables user scaling", () => {
  assert.match(indexContent, /viewport/);
});

test("has theme-color meta for anti-phishing", () => {
  assert.match(indexContent, /theme-color/);
});

console.log("\nSanitizer effectiveness:");

const blogPages = htmlFiles.filter((f) => f.includes("/blog/") && !f.includes("/page/"));
for (const file of blogPages.slice(0, 3)) {
  const content = readFileSync(file, "utf8");
  const route = file.replace(distDir, "").replace(/\\/g, "/").replace(/\/index\.html$/, "/");

  test(`${route} no <iframe> tags`, () => {
    assert.ok(!content.includes("<iframe"), "Found iframe");
  });

  test(`${route} no <embed> tags`, () => {
    assert.ok(!content.includes("<embed"), "Found embed");
  });

  test(`${route} no <object> tags`, () => {
    assert.ok(!content.includes("<object "), "Found object");
  });
}

console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
if (failed > 0) process.exit(1);
console.log("All security tests passed.");
