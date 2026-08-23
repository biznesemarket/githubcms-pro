import { strict as assert } from "node:assert";
import {
  parseBlocks,
  validateBlocks,
  extractFaq,
  tokenizeMarkers,
  renderMarkdown,
  BLOCK_NAMES,
} from "../../src/markdown/blocks.mjs";

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

console.log("=== Block Engine Tests ===\n");

test("BLOCK_NAMES contains canonical set", () => {
  assert.deepStrictEqual(BLOCK_NAMES, [
    "hero",
    "answer-first",
    "key-facts",
    "featured-snippet",
    "faq",
    "cta",
    "schema-hints",
  ]);
});

console.log("\nPaired markers:");

test("parses paired blocks with source order positions", () => {
  const r = parseBlocks(`<!-- @block: answer-first -->
A
<!-- /@block: answer-first -->
<!-- @block: key-facts -->
## Facts
- one
<!-- /@block: key-facts -->
<!-- @block: cta -->
Go
<!-- /@block: cta -->
`);
  assert.deepStrictEqual(r.blocks.map((b) => b.name), ["answer-first", "key-facts", "cta"]);
  assert.deepStrictEqual(r.blocks.map((b) => b.position), [1, 2, 3]);
  assert.deepStrictEqual(r.errors, []);
  assert.deepStrictEqual(r.legacyWarnings, []);
});

test("normalizes whitespace variants (no space after colon)", () => {
  const r = parseBlocks(`<!-- @block:hero -->
Hero
<!-- /@block:hero -->
`);
  assert.strictEqual(r.blocks.length, 1);
  assert.strictEqual(r.blocks[0].name, "hero");
  assert.match(r.blocks[0].html, /Hero/);
  assert.deepStrictEqual(r.errors, []);
});

test("renders block markdown to sanitized html and plainText", () => {
  const r = parseBlocks(`<!-- @block: answer-first -->
**Bold answer** with <script>alert(1)</script>.
<!-- /@block: answer-first -->
`);
  assert.match(r.blocks[0].html, /<strong>Bold answer<\/strong>/);
  assert.ok(!r.blocks[0].html.includes("<script>"));
  assert.ok(r.blocks[0].plainText.includes("Bold answer"));
});

test("body excludes paired block content", () => {
  const r = parseBlocks(`Intro.

<!-- @block: key-facts -->
- one
- two
<!-- /@block: key-facts -->

Outro.`);
  assert.ok(r.body.includes("Intro."));
  assert.ok(r.body.includes("Outro."));
  assert.ok(!r.body.includes("one"));
});

console.log("\nLegacy open-ended markers:");

test("legacy markers produce warnings and span to next marker", () => {
  const r = parseBlocks(`Text.

<!-- @block: answer-first -->
Answer.

<!-- @block: key-facts -->
Facts.
`);
  assert.strictEqual(r.blocks.length, 2);
  assert.match(r.blocks[0].html, /Answer/);
  assert.match(r.blocks[1].html, /Facts/);
  assert.strictEqual(r.legacyWarnings.length, 2);
  assert.deepStrictEqual(r.errors, []);
});

test("legacy final block spans to EOF", () => {
  const r = parseBlocks(`<!-- @block: cta -->
End content.
`);
  assert.strictEqual(r.blocks.length, 1);
  assert.match(r.blocks[0].html, /End content/);
  assert.strictEqual(r.legacyWarnings.length, 1);
});

console.log("\nErrors:");

test("stray closing marker is an error", () => {
  const r = parseBlocks(`Intro.
<!-- /@block: faq -->
Oops.`);
  assert.strictEqual(r.errors.length, 1);
  assert.match(r.errors[0], /without a matching opening/i);
});

test("mismatched closing marker is an error", () => {
  const r = parseBlocks(`<!-- @block: answer-first -->
A
<!-- /@block: key-facts -->
`);
  assert.ok(r.errors.length > 0);
});

test("unclosed paired block is an error when document uses paired syntax", () => {
  const r = parseBlocks(`<!-- @block: answer-first -->
A

<!-- /@block: cta -->
B
`);
  assert.ok(r.errors.length > 0);
  assert.match(r.errors[0], /Unclosed paired block 'answer-first'/);
});

console.log("\nFenced code / inline code:");

test("ignores markers inside fenced code blocks", () => {
  const r = parseBlocks(`## Example

\`\`\`markdown
<!-- @block: answer-first -->
not a real block
\`\`\`

<!-- @block: answer-first -->
real block
<!-- /@block: answer-first -->
`);
  assert.strictEqual(r.blocks.length, 1);
  assert.match(r.blocks[0].html, /real block/);
  assert.deepStrictEqual(r.errors, []);
});

test("ignores markers inside inline code spans", () => {
  const r = parseBlocks(`Use \`<!-- @block: key-facts -->\` in docs.

<!-- @block: key-facts -->
Real facts.
<!-- /@block: key-facts -->
`);
  assert.strictEqual(r.blocks.length, 1);
  assert.match(r.blocks[0].html, /Real facts/);
});

test("tokenizeMarkers distinguishes open and close", () => {
  const tokens = tokenizeMarkers(`<!-- @block: a --><!-- /@block: a --><!-- @block:b -->`);
  assert.deepStrictEqual(
    tokens.map((t) => [t.kind, t.name]),
    [
      ["open", "a"],
      ["close", "a"],
      ["open", "b"],
    ],
  );
});

console.log("\nvalidateBlocks:");

test("reports unknown block names", () => {
  const errors = validateBlocks(`<!-- @block: mystery -->
X
<!-- /@block: mystery -->
`);
  assert.ok(errors.some((e) => e.includes("Unknown block name 'mystery'")));
});

test("reports duplicate singleton blocks", () => {
  const errors = validateBlocks(`<!-- @block: cta -->
A
<!-- /@block: cta -->
<!-- @block: cta -->
B
<!-- /@block: cta -->
`);
  assert.ok(errors.some((e) => e.includes("Duplicate singleton block 'cta'")));
});

test("passes valid paired content", () => {
  const errors = validateBlocks(`<!-- @block: answer-first -->
A
<!-- /@block: answer-first -->
<!-- @block: key-facts -->
- one
<!-- /@block: key-facts -->
`);
  assert.deepStrictEqual(errors, []);
});

test("legacy markers stay parseable and surface as warnings, not hard errors", () => {
  const r = parseBlocks(`<!-- @block: answer-first -->
A
`);
  assert.strictEqual(r.legacyWarnings.length, 1);
  assert.deepStrictEqual(r.errors, []);
  assert.deepStrictEqual(validateBlocks(`<!-- @block: answer-first -->
A
`), []);
});

console.log("\nextractFaq:");

test("parses canonical **Q:**/**A:** format", () => {
  const items = extractFaq(`## FAQ

**Q: Первый вопрос?**

**A:** Первый ответ.

**Q: Второй вопрос?**

**A:** Второй ответ.
`);
  assert.strictEqual(items.length, 2);
  assert.strictEqual(items[0].question, "Первый вопрос?");
  assert.strictEqual(items[0].answer, "Первый ответ.");
});

test("parses legacy ### heading format", () => {
  const items = extractFaq(`## FAQ

### Q1?

A1.

### Q2?

A2.
`);
  assert.strictEqual(items.length, 2);
  assert.strictEqual(items[0].question, "Q1?");
  assert.strictEqual(items[1].answer, "A2.");
});

test("returns [] for empty input", () => {
  assert.deepStrictEqual(extractFaq(""), []);
  assert.deepStrictEqual(extractFaq(undefined), []);
});

console.log("\nrenderMarkdown:");

test("renders and sanitizes markdown", () => {
  const html = renderMarkdown(`Hello **world** <script>x</script>`);
  assert.ok(html.includes("<strong>world</strong>"));
  assert.ok(!html.includes("<script>"));
});

// Summary
console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}

console.log("All block engine tests passed.");
