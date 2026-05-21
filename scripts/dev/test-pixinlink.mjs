import { strict as assert } from "node:assert";
import { buildUrl, normalizeUrl, validateUrl } from "../../src/composables/usePixinlink.ts";

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

console.log("=== usePixinlink Tests ===\n");

// -- buildUrl --
console.log("buildUrl:");

test("builds minimal URL with defaults", () => {
  const url = buildUrl({ width: 1200, height: 630, prompt: "test" });
  assert.match(url, /^https:\/\/pixinlink\.ru\/api\/v1\/1200x630\/fff\/111\?prompt=test/);
});

test("builds URL with custom colors and style", () => {
  const url = buildUrl({
    width: 800, height: 450, bg: "01696f", fg: "ffffff",
    prompt: "github cms", style: "minimal", watermark: true,
  });
  assert.match(url, /\/800x450\/01696f\/ffffff\?/);
  assert.match(url, /style=minimal/);
  assert.match(url, /watermark=true/);
});

test("throws on width below minimum", () => {
  assert.throws(() => buildUrl({ width: 100, height: 630, prompt: "test" }));
});

test("throws on width above maximum", () => {
  assert.throws(() => buildUrl({ width: 3000, height: 630, prompt: "test" }));
});

test("throws on height below minimum", () => {
  assert.throws(() => buildUrl({ width: 1200, height: 50, prompt: "test" }));
});

test("normalizes hex colors (removes #, lowercases)", () => {
  const url = buildUrl({
    width: 1200, height: 630, bg: "#FFFFFF", fg: "#000",
    prompt: "test",
  });
  assert.match(url, /\/1200x630\/ffffff\/000\?/);
});

test("includes seed when provided", () => {
  const url = buildUrl({
    width: 1200, height: 630, prompt: "test", seed: 42,
  });
  assert.match(url, /seed=42/);
});

test("does not include seed when not provided", () => {
  const url = buildUrl({ width: 1200, height: 630, prompt: "test" });
  assert.ok(!url.includes("seed="));
});

// -- normalizeUrl --
console.log("\nnormalizeUrl:");

test("normalizes canonical URL unchanged (new v1 format)", () => {
  const input = "https://pixinlink.ru/api/v1/1200x630/ffffff/01696f?prompt=test&style=realistic&watermark=false";
  const result = normalizeUrl(input);
  assert.ok(result);
  assert.match(result, /pixinlink\.ru\/api\/v1\/1200x630\/ffffff\/01696f\?/);
  assert.match(result, /prompt=test/);
});

test("normalizes URL with uppercase hex", () => {
  const result = normalizeUrl("https://pixinlink.ru/api/v1/1200x630/FFFFFF/01696F?prompt=test&style=realistic&watermark=false");
  assert.ok(result);
  assert.match(result, /\/ffffff\/01696f\?/);
});

test("returns null for non-pixinlink host", () => {
  assert.strictEqual(normalizeUrl("https://example.com/1200x630/fff/000?prompt=test"), null);
});

test("returns null for invalid size format (dash separator)", () => {
  assert.strictEqual(normalizeUrl("https://pixinlink.ru/api/v1/1200-630/fff/000?prompt=test"), null);
});

test("normalizes uppercase X to lowercase x", () => {
  const result = normalizeUrl("https://pixinlink.ru/api/v1/1200X630/fff/000?prompt=test&style=realistic&watermark=false");
  assert.ok(result);
  assert.match(result, /\/1200x630\/fff\/000\?/);
});

test("normalizes query parameter order", () => {
  const result = normalizeUrl("https://pixinlink.ru/api/v1/1200x630/fff/000?watermark=false&style=realistic&prompt=test");
  assert.ok(result);
  assert.ok(result.indexOf("prompt=") < result.indexOf("style="));
  assert.ok(result.indexOf("style=") < result.indexOf("watermark="));
});

test("returns null for non-pixinlink host (second)", () => {
  assert.strictEqual(normalizeUrl("https://example.com/1200x630/fff/000?prompt=test"), null);
});

test("returns null for invalid size format (dash, second)", () => {
  assert.strictEqual(normalizeUrl("https://pixinlink.ru/api/v1/1200-630/fff/000?prompt=test"), null);
});

test("returns null for missing prompt", () => {
  assert.strictEqual(normalizeUrl("https://pixinlink.ru/api/v1/1200x630/fff/000"), null);
});

test("returns null for invalid style", () => {
  assert.strictEqual(
    normalizeUrl("https://pixinlink.ru/api/v1/1200x630/fff/000?prompt=test&style=custom"),
    null,
  );
});

// -- validateUrl --
console.log("\nvalidateUrl:");

test("validates canonical v1 URL as valid", () => {
  const result = validateUrl("https://pixinlink.ru/api/v1/1200x630/ffffff/111?prompt=test&style=realistic&watermark=false");
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.normalized);
});

test("flags unknown query parameters", () => {
  const result = validateUrl("https://pixinlink.ru/api/v1/1200x630/fff/000?prompt=test&api_key=secret");
  assert.strictEqual(result.valid, false);
  assert.match(result.errors.join(), /api_key/);
});

test("flags prompt containing secret pattern", () => {
  const result = validateUrl("https://pixinlink.ru/api/v1/1200x630/ffffff/111?prompt=PIXINLINK_API_KEY_leak");
  assert.strictEqual(result.valid, false);
});

test("flags missing prompt", () => {
  const result = validateUrl("https://pixinlink.ru/api/v1/1200x630/fff/000");
  assert.strictEqual(result.valid, false);
});

test("flags non-pixinlink host", () => {
  const result = validateUrl("https://bad.com/1200x630/fff/000?prompt=test");
  assert.strictEqual(result.valid, false);
});

test("flags # prefix on hex colors", () => {
  const result = validateUrl("https://pixinlink.ru/api/v1/1200x630/#fff/#000?prompt=test");
  assert.strictEqual(result.valid, false);
});

test("validates width/height bounds in URL", () => {
  const result = validateUrl("https://pixinlink.ru/api/v1/100x50/fff/000?prompt=test");
  assert.strictEqual(result.valid, false);
});

test("flags invalid seed value", () => {
  const result = validateUrl("https://pixinlink.ru/api/v1/1200x630/fff/000?prompt=test&seed=99999999999");
  assert.strictEqual(result.valid, false);
});

// Summary
console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}

console.log("All PixInLink tests passed.");
