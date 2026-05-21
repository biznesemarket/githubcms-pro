import { strict as assert } from "node:assert";
import { useMarkdown } from "../../src/composables/useMarkdown.ts";

let passed = 0;
let failed = 0;

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

const validMarkdown = `---
title: "Test Article"
description: "A test article for validation"
slug: "test-article"
date: "2026-05-07"
author: "Test Author"
category: "Testing"
tags:
  - test
  - validation
schema_type: "Article"
layout: "article"
cover_image: "https://pixinlink.ru/api/v1/1200x630/test"
geo:
  - "Test Entity"
---

<!-- @block: answer-first -->

This is the answer-first block content.

<!-- @block: key-facts -->

## Key Facts

- Fact one
- Fact two
- Fact three

<!-- @block: faq -->

## FAQ

**Q: What is this?**
**A:** This is a test article.

**Q: How does it work?**
**A:** It works by parsing Markdown with frontmatter.

<!-- @block: cta -->

## Next Steps

Start using GitHub CMS today.
`;

const markdownNoBlocks = `---
title: "No Blocks"
description: "Article without block markers"
slug: "no-blocks"
date: "2026-05-07"
author: "Test"
category: "Testing"
tags: []
schema_type: "Article"
layout: "article"
---

## Introduction

This article has no block markers and no FAQ section.

Just regular Markdown content with **bold** and *italic* text.

- List item 1
- List item 2

End of content.
`;

const markdownLongArticle = `---
title: "Long Article"
description: "Article with enough words for reading time > 1 min"
slug: "long-article"
date: "2026-05-07"
author: "Test"
category: "Long"
tags: []
schema_type: "Article"
layout: "article"
---

${"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ".repeat(50)}
`;

console.log("=== useMarkdown Tests ===\n");

// -- Frontmatter parsing --
console.log("Frontmatter:");

test("parses all canonical frontmatter fields", () => {
  const result = useMarkdown(validMarkdown);
  assert.strictEqual(result.frontmatter.title, "Test Article");
  assert.strictEqual(result.frontmatter.description, "A test article for validation");
  assert.strictEqual(result.frontmatter.slug, "test-article");
  assert.strictEqual(result.frontmatter.date, "2026-05-07");
  assert.strictEqual(result.frontmatter.author, "Test Author");
  assert.strictEqual(result.frontmatter.category, "Testing");
  assert.deepStrictEqual(result.frontmatter.tags, ["test", "validation"]);
  assert.strictEqual(result.frontmatter.schema_type, "Article");
  assert.strictEqual(result.frontmatter.layout, "article");
});

test("parses optional cover_image", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok(result.frontmatter.cover_image.includes("pixinlink.ru"));
});

test("parses geo array", () => {
  const result = useMarkdown(validMarkdown);
  assert.deepStrictEqual(result.frontmatter.geo, ["Test Entity"]);
});

test("handles missing optional fields gracefully", () => {
  const result = useMarkdown(markdownNoBlocks);
  assert.strictEqual(result.frontmatter.cover_image, undefined);
  assert.strictEqual(result.frontmatter.geo, undefined);
});

// -- HTML rendering --
console.log("\nHTML:");

test("renders Markdown to sanitized HTML", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok(result.html.includes("<p>This is the answer-first block content.</p>"));
  assert.ok(result.html.includes("<h2>Key Facts</h2>"));
  assert.ok(result.html.includes("<li>Fact one</li>"));
});

test("renders bold and italic", () => {
  const result = useMarkdown(markdownNoBlocks);
  assert.ok(result.html.includes("<strong>bold</strong>"));
  assert.ok(result.html.includes("<em>italic</em>"));
});

test("renders unordered list", () => {
  const result = useMarkdown(markdownNoBlocks);
  assert.ok(result.html.includes("<li>List item 1</li>"));
  assert.ok(result.html.includes("<li>List item 2</li>"));
});

test("does not leak block markers into HTML", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok(!result.html.includes("@block:"));
});

test("does not leak frontmatter delimiters into HTML", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok(!result.html.includes("---"));
});

// -- Block extraction --
console.log("\nBlocks:");

test("extracts answer-first block", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok("answer-first" in result.blocks);
  assert.match(result.blocks["answer-first"], /answer-first block content/);
});

test("extracts key-facts block", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok("key-facts" in result.blocks);
  assert.match(result.blocks["key-facts"], /<h2>Key Facts<\/h2>/);
  assert.match(result.blocks["key-facts"], /Fact one/);
});

test("extracts faq block", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok("faq" in result.blocks);
  assert.match(result.blocks["faq"], /<h2>FAQ<\/h2>/);
});

test("extracts cta block", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok("cta" in result.blocks);
  assert.match(result.blocks["cta"], /<h2>Next Steps<\/h2>/);
});

test("returns empty blocks for article without markers", () => {
  const result = useMarkdown(markdownNoBlocks);
  assert.deepStrictEqual(result.blocks, {});
});

// -- FAQ extraction --
console.log("\nFAQ:");

test("extracts FAQ items from faq block", () => {
  const result = useMarkdown(validMarkdown);
  assert.strictEqual(result.faqItems.length, 2);
  assert.strictEqual(result.faqItems[0].question, "What is this?");
  assert.strictEqual(result.faqItems[0].answer, "This is a test article.");
  assert.strictEqual(result.faqItems[1].question, "How does it work?");
  assert.ok(result.faqItems[1].answer.includes("parsing Markdown"));
});

test("returns empty FAQ array for article without FAQ", () => {
  const result = useMarkdown(markdownNoBlocks);
  assert.deepStrictEqual(result.faqItems, []);
});

// -- Reading time --
console.log("\nReadingTime:");

test("calculates reading time for short article", () => {
  const result = useMarkdown(markdownNoBlocks);
  assert.strictEqual(result.readingTime, 1);
});

test("calculates reading time for longer article", () => {
  const result = useMarkdown(markdownLongArticle);
  assert.ok(result.readingTime >= 2, `Expected >= 2, got ${result.readingTime}`);
});

test("minimum reading time is 1", () => {
  const result = useMarkdown(`---
title: "Tiny"
description: "x"
slug: "tiny"
date: "2026-05-07"
author: "T"
category: "T"
tags: []
schema_type: "Article"
layout: "article"
---
Hi.
`);
  assert.strictEqual(result.readingTime, 1);
});

// -- Edge cases --
console.log("\nEdgeCases:");

test("handles empty content body", () => {
  const result = useMarkdown(`---
title: "Bodyless"
description: "No body"
slug: "bodyless"
date: "2026-05-07"
author: "T"
category: "T"
tags: []
schema_type: "Article"
layout: "article"
---
`);
  assert.strictEqual(result.html.trim(), "");
  assert.deepStrictEqual(result.blocks, {});
  assert.deepStrictEqual(result.faqItems, []);
  assert.strictEqual(result.readingTime, 1);
});

test("handles markdown with code blocks", () => {
  const result = useMarkdown(`---
title: "Code"
description: "With code"
slug: "code"
date: "2026-05-07"
author: "T"
category: "T"
tags: []
schema_type: "Article"
layout: "article"
---
## Code Example

\`\`\`javascript
console.log("hello");
\`\`\`
`);
  assert.ok(result.html.includes("console"));
  assert.ok(result.html.includes('hljs'));
});

test("handles markdown with links", () => {
  const result = useMarkdown(`---
title: "Links"
description: "With links"
slug: "links"
date: "2026-05-07"
author: "T"
category: "T"
tags: []
schema_type: "Article"
layout: "article"
---
Visit [GitHub](https://github.com) for more info.
`);
  assert.ok(result.html.includes('href="https://github.com"'));
  assert.ok(result.html.includes('>GitHub</a>'));
});

test("handles markdown with image", () => {
  const result = useMarkdown(`---
title: "Image"
description: "With image"
slug: "image"
date: "2026-05-07"
author: "T"
category: "T"
tags: []
schema_type: "Article"
layout: "article"
---
![Alt](https://pixinlink.ru/api/v1/800x450/test)
`);
  assert.ok(result.html.includes('<img'));
  assert.ok(result.html.includes('alt="Alt"'));
});

test("sanitizes script tags", () => {
  const result = useMarkdown(`---
title: "XSS"
description: "Attempt"
slug: "xss"
date: "2026-05-07"
author: "T"
category: "T"
tags: []
schema_type: "Article"
layout: "article"
---
<script>alert("xss")</script>
<p>Safe content</p>
`);
  assert.ok(!result.html.includes("<script>"));
  assert.ok(!result.html.includes("alert"));
  assert.ok(result.html.includes("Safe content"));
});

test("preserves allowed HTML attributes", () => {
  const result = useMarkdown(`---
title: "Attrs"
description: "Attributes"
slug: "attrs"
date: "2026-05-07"
author: "T"
category: "T"
tags: []
schema_type: "Article"
layout: "article"
---
<a href="/page" target="_blank" rel="noopener">Link</a>
`);
  assert.ok(result.html.includes('target="_blank"'));
  assert.ok(result.html.includes('rel="noopener"'));
});

test("frontmatter with numeric values parses correctly", () => {
  const result = useMarkdown(`---
title: "Numeric"
description: "Has numbers"
slug: "numeric-123"
date: "2026-05-07"
author: "Test"
category: "Numbers"
tags:
  - 42
  - 7
schema_type: "Article"
layout: "article"
---
Body
`);
  assert.deepStrictEqual(result.frontmatter.tags, [42, 7]);
});

// Summary
console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}

console.log("All useMarkdown tests passed.");
