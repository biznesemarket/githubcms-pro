import { strict as assert } from "node:assert";
import { generateSchema } from "../src/schema/index.ts";

let passed = 0;
let failed = 0;

function test(name, fn) {
  try { fn(); console.log(`  PASS: ${name}`); passed++; }
  catch (e) { console.error(`  FAIL: ${name}\n    ${e.message}`); failed++; }
}

const mockArticle = {
  path: "content/blog/test.md",
  frontmatter: {
    title: "Test Article",
    description: "Test description",
    slug: "test-article",
    date: "2026-05-07",
    updated: "2026-05-08",
    author: "Test Author",
    category: "Testing",
    tags: ["test", "guide"],
    schema_type: "Article",
    layout: "article",
    cover_image: "https://pixinlink.ru/api/v1/1200x630/test",
  },
  html: "<p>Content</p>",
  blocks: {},
  faqItems: [],
  readingTime: 2,
};

console.log("\n=== Schema Engine Tests ===\n");

console.log("generateSchema() for articles:");

test("returns Article schema", () => {
  const schemas = generateSchema({
    url: "https://githubcms.com/blog/test-article/",
    path: "/blog/test-article/",
    title: "Test Article",
    description: "Test description",
    html: mockArticle.html,
    type: "article",
    article: mockArticle,
    publishedTime: "2026-05-07",
    tags: ["test", "guide"],
  });
  const article = schemas.find(s => s["@type"] === "Article");
  assert.ok(article, "Article not found in schemas");
  assert.strictEqual(article.headline, "Test Article");
  assert.strictEqual(article.description, "Test description");
});

test("Article includes datePublished from frontmatter", () => {
  const schemas = generateSchema({
    url: "https://githubcms.com/blog/test-article/",
    path: "/blog/test-article/",
    title: "Test Article",
    description: "Test description",
    html: "",
    type: "article",
    article: mockArticle,
  });
  const article = schemas.find(s => s["@type"] === "Article");
  assert.strictEqual(article.datePublished, "2026-05-07");
});

test("Article includes author as Person", () => {
  const schemas = generateSchema({
    url: "https://githubcms.com/blog/test-article/",
    path: "/blog/test-article/",
    title: "Test Article",
    description: "",
    html: "",
    type: "article",
    article: mockArticle,
  });
  const article = schemas.find(s => s["@type"] === "Article");
  assert.ok(article.author);
  assert.strictEqual(article.author["@type"], "Person");
});

test("generates schema for website type", () => {
  const schemas = generateSchema({
    url: "https://githubcms.com/",
    path: "/",
    title: "GitHub CMS",
    description: "Test site",
    html: "",
    type: "website",
  });
  const website = schemas.find(s => s["@type"] === "WebSite");
  assert.ok(website, "WebSite not found");
  assert.strictEqual(website.name, "GitHub CMS");
});
