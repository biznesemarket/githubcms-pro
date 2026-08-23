import { strict as assert } from "node:assert";
import { useMarkdown } from "../../src/composables/useMarkdown.ts";
import { parseBlocks, extractFaq, validateBlocks } from "../../src/markdown/blocks.mjs";

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

This is the article body text.

<!-- @block: answer-first -->

This is the answer-first block content.

<!-- /@block: answer-first -->

<!-- @block: key-facts -->

## Key Facts

- Fact one
- Fact two
- Fact three

<!-- /@block: key-facts -->

<!-- @block: faq -->

## FAQ

**Q: What is this?**
**A:** This is a test article.

**Q: How does it work?**
**A:** It works by parsing Markdown with frontmatter.

<!-- /@block: faq -->

<!-- @block: cta -->

## Next Steps

Start using GitHub CMS today.

<!-- /@block: cta -->
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

const markdownLegacy = `---
title: "Legacy Blocks"
description: "Article with legacy open-ended block markers"
slug: "legacy-blocks"
date: "2026-05-07"
author: "Test"
category: "Testing"
tags: []
schema_type: "Article"
layout: "article"
---

Body before blocks.

<!-- @block: answer-first -->

Legacy answer text.

<!-- @block: key-facts -->

## Key Facts

- Legacy fact one
- Legacy fact two

<!-- @block: cta -->

## Next Step

Start now.
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

test("body excludes block content (no duplication)", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok(result.html.includes("<p>This is the article body text.</p>"));
  assert.ok(!result.html.includes("answer-first block content"));
  assert.ok(!result.html.includes("<h2>Key Facts</h2>"));
  assert.ok(!result.html.includes("Fact one"));
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
  assert.match(result.blocks["answer-first"].html, /answer-first block content/);
  assert.strictEqual(result.blocks["answer-first"].position, 1);
});

test("extracts key-facts block", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok("key-facts" in result.blocks);
  assert.match(result.blocks["key-facts"].html, /<h2>Key Facts<\/h2>/);
  assert.match(result.blocks["key-facts"].html, /Fact one/);
});

test("extracts faq block", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok("faq" in result.blocks);
  assert.match(result.blocks["faq"].html, /<h2>FAQ<\/h2>/);
});

test("extracts cta block", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok("cta" in result.blocks);
  assert.match(result.blocks["cta"].html, /<h2>Next Steps<\/h2>/);
});

test("blocks carry plainText and source position", () => {
  const result = useMarkdown(validMarkdown);
  assert.ok(result.blocks["key-facts"].plainText.includes("Fact one"));
  assert.ok(result.blocks["cta"].position > result.blocks["answer-first"].position);
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

test("strips target=_blank and forces rel=noopener noreferrer", () => {
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
  assert.ok(!result.html.includes('target="_blank"'));
  assert.ok(result.html.includes("noreferrer"));
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

// -- Block parser semantics --
console.log("\nBlockParser:");

test("parseBlocks body excludes paired block content", () => {
  const r = parseBlocks(`Intro.

<!-- @block: answer-first -->
Answer.
<!-- /@block: answer-first -->

Between.

<!-- @block: key-facts -->
## Facts
- one
<!-- /@block: key-facts -->

Outro.`);
  assert.ok(r.body.includes("Intro."));
  assert.ok(r.body.includes("Between."));
  assert.ok(r.body.includes("Outro."));
  assert.ok(!r.body.includes("Answer."));
  assert.ok(!r.body.includes("Facts"));
  assert.deepStrictEqual(r.errors, []);
  assert.deepStrictEqual(r.legacyWarnings, []);
});

test("parseBlocks handles legacy open-ended markers with warning", () => {
  const r = parseBlocks(`Intro.

<!-- @block: answer-first -->
Legacy answer.

<!-- @block: key-facts -->
## Facts
- one
`);
  assert.strictEqual(r.blocks.length, 2);
  assert.match(r.blocks[0].html, /Legacy answer/);
  assert.strictEqual(r.legacyWarnings.length, 2);
  assert.deepStrictEqual(r.errors, []);
  assert.ok(!r.body.includes("Legacy answer"));
});

test("parseBlocks reports stray closing marker", () => {
  const r = parseBlocks(`Intro.

<!-- /@block: faq -->
Oops.
`);
  assert.strictEqual(r.errors.length, 1);
  assert.match(r.errors[0], /without a matching opening/i);
});

test("validateBlocks flags unknown and duplicate blocks", () => {
  const errors = validateBlocks(`<!-- @block: answer-first -->
A
<!-- /@block: answer-first -->
<!-- @block: mystery -->
X
<!-- /@block: mystery -->
<!-- @block: answer-first -->
B
<!-- /@block: answer-first -->
`);
  const joined = errors.join("\n");
  assert.ok(joined.includes("Unknown block name 'mystery'"));
  assert.ok(joined.includes("Duplicate singleton block 'answer-first'"));
});

test("extractFaq supports canonical Q/A and legacy headings", () => {
  const canonical = extractFaq(`## FAQ

**Q: One?**
**A:** First answer.

**Q: Two?**
**A:** Second answer.
`);
  assert.strictEqual(canonical.length, 2);
  assert.strictEqual(canonical[0].question, "One?");
  assert.strictEqual(canonical[1].answer, "Second answer.");

  const legacy = extractFaq(`## FAQ

### Legacy question?

Legacy answer text.

### Another?

Another answer.
`);
  assert.strictEqual(legacy.length, 2);
  assert.strictEqual(legacy[0].question, "Legacy question?");
  assert.strictEqual(legacy[1].answer, "Another answer.");
});

test("extractFaq deduplicates normalized questions and drops empties", () => {
  const items = extractFaq(`**Q: Same question?**
**A:** First.

**Q: Same question?**
**A:** Second.

**Q:   **
**A:** Third.
`);
  assert.strictEqual(items.length, 1);
  assert.strictEqual(items[0].answer, "First.");
});

test("legacy markers produce warnings but still parse", () => {
  const r = parseBlocks(markdownLegacy.split("---\n")[2]);
  assert.strictEqual(r.blocks.length, 3);
  assert.ok(r.legacyWarnings.length >= 3);
});

// Summary
console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}

console.log("All useMarkdown tests passed.");
