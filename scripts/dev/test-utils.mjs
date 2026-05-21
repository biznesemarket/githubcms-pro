import { strict as assert } from "node:assert";
import { slugify } from "../src/utils/slug.ts";
import { useImages } from "../src/composables/useImages.ts";
import { useToc, addHeadingIds } from "../src/composables/useToc.ts";

let passed = 0;
let failed = 0;

function test(name, fn) {
  try { fn(); console.log(`  PASS: ${name}`); passed++; }
  catch (e) { console.error(`  FAIL: ${name}\n    ${e.message}`); failed++; }
}

console.log("=== Stage 1: Utilities Tests ===\n");

// -- slugify --
console.log("slugify():");

test("transliterates Russian to Latin", () => {
  assert.strictEqual(slugify("Безопасность"), "bezopasnost");
});

test("transliterates full phrase", () => {
  assert.strictEqual(slugify("статических сайтов"), "staticheskih-sajtov");
});

test("handles mixed Cyrillic and Latin", () => {
  assert.strictEqual(slugify("GitHub CMS хостинг"), "github-cms-hosting");
});

test("handles special chars", () => {
  assert.strictEqual(slugify("Hello, World!"), "hello-world");
});

test("collapses multiple dashes", () => {
  assert.strictEqual(slugify("a---b"), "a-b");
});

test("trims leading/trailing dashes", () => {
  assert.strictEqual(slugify("-hello-"), "hello");
});

test("handles empty string", () => {
  assert.strictEqual(slugify(""), "");
});

test("handles numbers", () => {
  assert.strictEqual(slugify("Vue 3"), "vue-3");
});

// -- useImages --
console.log("\nuseImages():");

test("returns default dimensions for non-PixInLink URL", () => {
  const result = useImages({ src: "https://example.com/img.jpg", alt: "test" });
  assert.strictEqual(result.width, 1200);
  assert.strictEqual(result.height, 630);
});

test("extracts dimensions from PixInLink URL", () => {
  const result = useImages({ src: "https://pixinlink.ru/api/v1/800x450/test" });
  assert.strictEqual(result.width, 800);
  assert.strictEqual(result.height, 450);
});

test("uses provided dimensions over URL", () => {
  const result = useImages({ src: "https://pixinlink.ru/api/v1/800x450/test", width: 400, height: 300 });
  assert.strictEqual(result.width, 400);
  assert.strictEqual(result.height, 300);
});

test("extracts placeholder color from PixInLink URL", () => {
  const result = useImages({ src: "https://pixinlink.ru/api/v1/800x450/test" });
  assert.strictEqual(result.placeholder, "#01696f");
});

test("default placeholder for non-PixInLink URL", () => {
  const result = useImages({ src: "https://example.com/img.jpg" });
  assert.strictEqual(result.placeholder, "#f7f8fb");
});

test("default alt text is empty string", () => {
  const result = useImages({ src: "https://example.com/img.jpg" });
  assert.strictEqual(result.alt, "");
});

test("loading is lazy by default", () => {
  const result = useImages({ src: "https://example.com/img.jpg" });
  assert.strictEqual(result.loading, "lazy");
});

// -- useToc --
console.log("\nuseToc():");

test("extracts h2 headings", () => {
  const html = '<h2>Introduction</h2><p>text</p><h2>Methods</h2><p>more</p>';
  const toc = useToc(html);
  assert.strictEqual(toc.length, 2);
  assert.strictEqual(toc[0].text, "Introduction");
  assert.strictEqual(toc[0].level, 2);
});

test("extracts h3 headings", () => {
  const html = '<h3>Subsection</h3><p>text</p>';
  const toc = useToc(html);
  assert.strictEqual(toc.length, 1);
  assert.strictEqual(toc[0].level, 3);
});

test("generates slugified ids", () => {
  const html = '<h2>Hello World</h2>';
  const toc = useToc(html);
  assert.strictEqual(toc[0].id, "hello-world");
});

test("generates Russian slugified ids", () => {
  const html = '<h2>Безопасность сайтов</h2>';
  const toc = useToc(html);
  assert.strictEqual(toc[0].id, "bezopasnost-sajtov");
});

test("returns empty array for no headings", () => {
  assert.deepStrictEqual(useToc("<p>no headings</p>"), []);
});

test("ignores h1 tags", () => {
  const html = '<h1>Title</h1><h2>Section</h2>';
  const toc = useToc(html);
  assert.strictEqual(toc.length, 1);
  assert.strictEqual(toc[0].text, "Section");
});

// -- addHeadingIds --
console.log("\naddHeadingIds():");

test("adds id to h2 without existing id", () => {
  const result = addHeadingIds('<h2>Hello</h2>');
  assert.match(result, /id="hello"/);
});

test("preserves existing id", () => {
  const result = addHeadingIds('<h2 id="custom">Hello</h2>');
  assert.match(result, /id="custom"/);
  assert.ok(!result.includes('id="custom" id='));
});

test("preserves existing attributes", () => {
  const result = addHeadingIds('<h2 class="title" data-x="1">Hello</h2>');
  assert.match(result, /class="title"/);
  assert.match(result, /id="hello"/);
});

test("does not modify h1", () => {
  const result = addHeadingIds('<h1>Title</h1>');
  assert.strictEqual(result, '<h1>Title</h1>');
});

test("handles inline tags in heading text", () => {
  const result = addHeadingIds('<h2>Hello <code>world</code></h2>');
  assert.match(result, /id="hello-world"/);
});

// Summary
console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
if (failed > 0) process.exit(1);
console.log("All utility tests passed.");
