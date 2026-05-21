import { strict as assert } from "node:assert";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const distDir = join(process.cwd(), "dist");
let passed = 0;
let failed = 0;

const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || "https://githubcms.com").replace(/\/+$/, "");

function test(name, fn) {
  try {
    fn();
    console.log(`  PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  FAIL: ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
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

function readSitemapUrls() {
  const sitemap = readFileSync(join(distDir, "sitemap.xml"), "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return locs.map((m) => {
    const url = new URL(m[1]);
    return url.pathname.replace(/\/$/, "") || "/";
  });
}

console.log("=== Integration Tests ===\n");

// 1. Build output existence
console.log("1. Build output:");
test("dist/ exists", () => { assert.ok(existsSync(distDir)); });
test("sitemap.xml exists", () => { assert.ok(existsSync(join(distDir, "sitemap.xml"))); });
test("robots.txt exists", () => { assert.ok(existsSync(join(distDir, "robots.txt"))); });
test("rss.xml exists", () => { assert.ok(existsSync(join(distDir, "rss.xml"))); });
test("healthz exists", () => { assert.ok(existsSync(join(distDir, "healthz"))); });
test("site.webmanifest exists", () => { assert.ok(existsSync(join(distDir, "site.webmanifest"))); });

const htmlFiles = collectHtmlFiles(distDir);
test("HTML pages exist", () => { assert.ok(htmlFiles.length > 0, `Found ${htmlFiles.length} pages`); });
console.log(`    (${htmlFiles.length} HTML pages found)`);

// 2. Sitemap coverage
console.log("\n2. Sitemap coverage:");
const sitemapUrls = readSitemapUrls();
test("sitemap has URLs", () => { assert.ok(sitemapUrls.length > 0); });
console.log(`    (${sitemapUrls.length} sitemap URLs)`);

for (const path of sitemapUrls) {
  const filePath = path === "/" ? join(distDir, "index.html") : join(distDir, path, "index.html");
  test(`page exists: ${path}`, () => {
    assert.ok(existsSync(filePath), `Missing: ${filePath}`);
  });
}

// 3. SEO meta in HTML
console.log("\n3. SEO meta tags:");
for (const htmlFile of htmlFiles.slice(0, 10)) {
  const content = readFileSync(htmlFile, "utf8");
  const route = htmlFile.replace(distDir, "").replace(/\\/g, "/").replace(/\/index\.html$/, "/");

  test(`${route} has <title>`, () => {
    assert.match(content, /<title>[^<]+<\/title>/);
  });
  test(`${route} has meta description`, () => {
    assert.match(content, /<meta\s+name="description"/);
  });
  test(`${route} has OG tags`, () => {
    assert.match(content, /og:title/);
    assert.match(content, /og:description/);
  });
  test(`${route} has canonical`, () => {
    assert.match(content, /rel="canonical"/);
  });
  test(`${route} has JSON-LD`, () => {
    assert.match(content, /application\/ld\+json/);
  });
}

// 4. RSS validity
console.log("\n4. RSS feed:");
const rss = readFileSync(join(distDir, "rss.xml"), "utf8");
test("starts with XML declaration", () => { assert.ok(rss.startsWith('<?xml')); });
test("has rss channel", () => { assert.match(rss, /<rss[^>]*>/); });
test("has channel/title", () => { assert.match(rss, /<title>GitHub CMS<\/title>/); });
test("has channel/link", () => {
  const expected = `<link>${siteUrl}/</link>`;
  assert.match(rss, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});
test("has atom:link", () => { assert.match(rss, /atom:link/); });

const rssItems = [...rss.matchAll(/<item>/g)];
test("has items", () => { assert.ok(rssItems.length > 0); });
console.log(`    (${rssItems.length} RSS items)`);

// 5. robots.txt validity
console.log("\n5. robots.txt:");
const robots = readFileSync(join(distDir, "robots.txt"), "utf8");
test("has User-agent", () => { assert.match(robots, /User-agent:/); });
test("has Sitemap", () => { assert.match(robots, /Sitemap:/); });
test("has correct sitemap URL", () => {
  const expected = `Sitemap: ${siteUrl}/sitemap.xml`;
  assert.match(robots, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

// 6. healthz
console.log("\n6. Health check:");
const healthz = readFileSync(join(distDir, "healthz"), "utf8");
test("returns ok", () => { assert.strictEqual(healthz, "ok\n"); });

// 7. Breadcrumb JSON-LD on article pages
console.log("\n7. Breadcrumb JSON-LD:");
const articlePages = htmlFiles.filter((f) => {
  const normalized = f.replace(/\\/g, "/");
  return normalized.includes("/blog/") && !normalized.includes("/blog/page/") && normalized !== join(distDir, "blog", "index.html").replace(/\\/g, "/");
});
test(`article pages have BreadcrumbList: ${articlePages.length}`, () => {
  assert.ok(articlePages.length > 0);
  for (const f of articlePages) {
    const c = readFileSync(f, "utf8");
    assert.match(c, /BreadcrumbList/, `Missing BreadcrumbList in ${f}`);
  }
});

// 8. No broken internal links
console.log("\n8. Internal links:");
const baseUrl = "https://githubcms.com";
for (const htmlFile of htmlFiles.slice(0, 5)) {
  const content = readFileSync(htmlFile, "utf8");
  const links = [...content.matchAll(/href="(\/[^"]*)"/g)];
  for (const [, href] of links) {
    if (href === "/rss.xml" || href === "/site.webmanifest") continue;
    if (href.startsWith("/assets/")) continue;
    const target = href === "/" ? join(distDir, "index.html") : join(distDir, href, "index.html");
    const route = htmlFile.replace(distDir, "").replace(/\\/g, "/").replace(/\/index\.html$/, "/");
    test(`${route} → ${href}`, () => {
      assert.ok(existsSync(target), `Broken link: ${href} → ${target}`);
    });
  }
}

// 9. Manifest validity
console.log("\n9. Web manifest:");
const manifest = JSON.parse(readFileSync(join(distDir, "site.webmanifest"), "utf8"));
test("has name", () => { assert.ok(manifest.name); });
test("has start_url", () => { assert.strictEqual(manifest.start_url, "/"); });
test("has icons", () => { assert.ok(manifest.icons.length > 0); });
test("display standalone", () => { assert.strictEqual(manifest.display, "standalone"); });

// 10. Article ToC presence
console.log("\n10. Table of Contents:");
for (const f of articlePages.slice(0, 3)) {
  const c = readFileSync(f, "utf8");
  const slug = f.replace(/\\/g, "/").match(/blog\/([^/]+)/)?.[1] || "";
  test(`${slug} has TOC`, () => {
    assert.match(c, /class="toc"/);
  });
}

// Summary
console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) process.exit(1);
console.log("All integration tests passed.");
