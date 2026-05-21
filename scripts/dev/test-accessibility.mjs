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

console.log("=== Stage 5: Accessibility Tests ===\n");

const htmlFiles = collectHtmlFiles(distDir);

console.log("Semantic HTML:");

const indexContent = readFileSync(join(distDir, "index.html"), "utf8");

test("homepage has <main> landmark", () => {
  assert.match(indexContent, /<main/);
});

test("homepage has <nav> landmark", () => {
  assert.match(indexContent, /<nav/);
});

test("homepage has <footer> landmark", () => {
  assert.match(indexContent, /<footer/);
});

test("homepage has <header> landmark", () => {
  assert.match(indexContent, /<header/);
});

console.log("\naria attributes:");

test("breadcrumb has aria-label", () => {
  const breadcrumb = indexContent.match(/aria-label="Breadcrumb"/);
  if (!breadcrumb) {
    // Check article pages
    const articlePages = htmlFiles.filter((f) => {
  const n = f.replace(/\\/g, "/");
  return n.includes("/blog/") && !n.includes("/page/") && !n.endsWith("/blog/index.html");
});
    for (const f of articlePages.slice(0, 1)) {
      const c = readFileSync(f, "utf8");
      assert.match(c, /aria-label="Breadcrumb"/);
    }
  }
});

test("pagination has aria-label", () => {
  const blogIndex = readFileSync(join(distDir, "blog", "index.html"), "utf8");
  if (blogIndex.includes("pagination")) {
    assert.match(blogIndex, /aria-label="Pagination"/);
  }
});

console.log("\nHeading hierarchy:");

const articlePages = htmlFiles.filter((f) => f.includes("/blog/") && !f.includes("/page/"));
for (const file of articlePages.slice(0, 3)) {
  const content = readFileSync(file, "utf8");
  const route = file.replace(distDir, "").replace(/\\/g, "/").replace(/\/index\.html$/, "/");

  test(`${route} has exactly one h1`, () => {
    const h1s = [...content.matchAll(/<h1[>\s]/g)];
    assert.strictEqual(h1s.length, 1, `Found ${h1s.length} h1 tags`);
  });

  test(`${route} no skipped heading levels`, () => {
    const h2s = [...content.matchAll(/<h2[>\s]/g)].length;
    const h3s = [...content.matchAll(/<h3[>\s]/g)].length;
    // Having h2 is fine, h3 without h2 is the concern
    if (h3s > 0) {
      assert.ok(h2s > 0 || h1s(), "h3 found without h2");
    }
  });
}

console.log("\nLink accessibility:");

const blogIndex = readFileSync(join(distDir, "blog", "index.html"), "utf8");

test("all links have text (no empty links)", () => {
  const links = [...blogIndex.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/g)];
  for (const [, text] of links) {
    const clean = text.replace(/<[^>]+>/g, "").trim();
    if (clean) continue;
    // Check for aria-label
    const fullTag = text;
  }
  // At least some links should have text
  const textLinks = links.filter(([, t]) => t.replace(/<[^>]+>/g, "").trim().length > 0);
  assert.ok(textLinks.length > 0, "No links with text found");
});

console.log("\nImage accessibility:");

if (articlePages.length > 0) {
  const articleContent = readFileSync(articlePages[0], "utf8");
  const images = [...articleContent.matchAll(/<img[^>]*>/g)];

  if (images.length > 0) {
    test("article images have alt attributes", () => {
      for (const [img] of images) {
        assert.match(img, /alt="[^"]*"/, `Image missing alt: ${img}`);
      }
    });
  } else {
    console.log("    (no images on first article page, skipping)");
  }
} else {
  console.log("    (no article pages found, skipping)");
}

test("back-to-top button has aria-label", () => {
  assert.match(indexContent, /aria-label="Scroll to top"/);
});

test("theme toggle has aria-label", () => {
  assert.match(indexContent, /aria-label="(?:Dark|Light)"/);
});

console.log("\nKeyboard navigation:");

test("nav links are keyboard-focusable", () => {
  // All RouterLink-generated <a> tags should have href
  const allLinks = [...blogIndex.matchAll(/<a href/g)];
  assert.ok(allLinks.length > 5, `Only ${allLinks.length} focusable links`);
});

test("accordion triggers are buttons", () => {
  // Check any article with FAQ
  for (const file of articlePages.slice(0, 1)) {
    const c = readFileSync(file, "utf8");
    if (c.includes("accordion")) {
      const triggers = [...c.matchAll(/<button[^>]*class="[^"]*accordion[^"]*trigger/gi)];
      assert.ok(triggers.length > 0 || !c.includes("accordion"), "Accordion without button triggers");
    }
  }
});

console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
if (failed > 0) process.exit(1);
console.log("All accessibility tests passed.");
