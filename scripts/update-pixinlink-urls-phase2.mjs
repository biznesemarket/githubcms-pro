import { readFileSync, writeFileSync } from "node:fs";
import { relative } from "node:path";

const root = process.cwd();
const files = [
  // SVG images in sections
  "content/ru/sections/json-ld-gajd.md",
  "content/ru/sections/json-ld-gajd.json",
  "public/content/sections/json-ld-gajd.json",

  // Template URL patterns in prose/blog content
  "content/ru/blog/2026-05-08-pixinlink-images.md",
  "content/en/blog/2026-05-08-pixinlink-images.md",
  "content/ru/blog/2026-05-07-github-cms-hosting.md",
  "content/ru/blog/2026-05-05-frontmatter-contract.md",

  // CSP example
  "content/ru/blog/2026-05-08-static-site-security.md",

  // Tests - update hostname
  "scripts/dev/test-pixinlink.mjs",
];

for (const file of files) {
  const fullPath = `${root}/${file}`;
  let content;
  try { content = readFileSync(fullPath, "utf8"); } catch { continue; }

  let changed = false;

  // 1. SVG image URLs: pixinlink.com/i/name.svg → pixinlink.ru/api/v1/600x400/slug
  content = content.replace(
    /https:\/\/pixinlink\.com\/i\/([a-zA-Z0-9-]+)\.svg/g,
    (_, name) => {
      changed = true;
      return `https://pixinlink.ru/api/v1/600x400/${name}`;
    }
  );

  // 2. Template URL patterns in prose/code blocks
  //    pixinlink.com/{width}x{height}/{bg}/{fg}?prompt=... → pixinlink.ru/api/v1/{width}x{height}/{prompt-slug}
  content = content.replace(
    /pixinlink\.com\/\{width\}x\{height\}\/\{(?:bg|bgColor)\}\/\{(?:fg|textColor)\}\?prompt=\{[^}]+\}(?:&amp;style=\{[^}]+\}(?:&amp;watermark=\{[^}]+\})?)?/g,
    "pixinlink.ru/api/v1/{width}x{height}/{prompt-slug}"
  );

  // 3. CSP header example
  content = content.replace(
    /img-src 'self' https:\/\/pixinlink\.com/g,
    "img-src 'self' https://pixinlink.ru"
  );

  // 4. cover_image example in table: `https://pixinlink.com/...`
  content = content.replace(
    /`https:\/\/pixinlink\.com\/\.\.\.`/g,
    "`https://pixinlink.ru/api/v1/1200x630/cover-image-slug`"
  );

  // 5. "pixinlink.com/{width}x{height}/{bg}/{fg}?prompt=..." in FAQ answers
  content = content.replace(
    /pixinlink\.com\/\{width\}x\{height\}\/\{bg\}\/\{fg\}\?prompt=\.\.\./g,
    "pixinlink.ru/api/v1/{width}x{height}/{prompt-slug}"
  );

  // 6. Replace bare pixinlink.com domain in text prose (non-URL contexts)
  //    like "PixInLink URL в формате `https://pixinlink.com/...`"
  content = content.replace(
    /`https:\/\/pixinlink\.com\/\{width\}x\{height\}\/\{bg\}\/\{fg\}\?prompt=\.\.\.`/g,
    "`https://pixinlink.ru/api/v1/{width}x{height}/{prompt-slug}`"
  );

  if (changed) {
    writeFileSync(fullPath, content, "utf8");
    console.log(`✓ ${file} (manual cleanup)`);
  }
}

// 7. Update test-pixinlink.mjs BASE_URL constant
const testFile = `${root}/scripts/dev/test-pixinlink.mjs`;
let testContent = readFileSync(testFile, "utf8");
// Update the BASE_URL used in tests
testContent = testContent.replace(
  /const BASE_URL = "https:\/\/pixinlink\.com"/g,
  'const BASE_URL = "https://pixinlink.ru/api/v1"'
);
// Update normalizeUrl host check comment
testContent = testContent.replace(
  /includes\("pixinlink\.com"\)/g,
  'includes("pixinlink.ru")'
);
writeFileSync(testFile, testContent, "utf8");
console.log("✓ scripts/dev/test-pixinlink.mjs (BASE_URL)");

// 8. Update usePixinlink.ts BASE_URL constant
const pixFile = `${root}/src/composables/usePixinlink.ts`;
let pixContent = readFileSync(pixFile, "utf8");
pixContent = pixContent.replace(
  /const BASE_URL = "https:\/\/pixinlink\.com"/,
  'const BASE_URL = "https://pixinlink.ru/api/v1"'
);
// Update hostname checks in normalizeUrl and validateUrl
pixContent = pixContent.replace(
  /if \(url\.hostname !== "pixinlink\.com" && !url\.hostname\.endsWith\("\.pixinlink\.com"\)\)/g,
  'if (url.hostname !== "pixinlink.ru" && !url.hostname.endsWith(".pixinlink.ru"))'
);
pixContent = pixContent.replace(
  /errors\.push\("Hostname must be pixinlink\.com"\)/,
  'errors.push("Hostname must be pixinlink.ru")'
);
writeFileSync(pixFile, pixContent, "utf8");
console.log("✓ src/composables/usePixinlink.ts (BASE_URL + hostname checks)");

console.log("\nDone. Secondary cleanup complete.");
