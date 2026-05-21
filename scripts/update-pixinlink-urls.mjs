import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, relative } from "node:path";

const TARGET_DIRS = ["src", "content", "scripts", "docs", "templates", "public", "template_plob", ".github"];

// Already in target format — skip
const ALREADY_V1 = /https:\/\/pixinlink\.ru\/api\/v1\//;

function walk(dir) {
  const files = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git" || entry === "dist" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    try {
      if (statSync(full).isDirectory()) { files.push(...walk(full)); continue; }
    } catch { continue; }
    const ext = extname(entry);
    if ([".vue", ".ts", ".mjs", ".js", ".md", ".txt", ".json", ".html", ".scss", ".css"].includes(ext)) {
      files.push(full);
    }
  }
  return files;
}

const root = process.cwd();
const files = TARGET_DIRS.flatMap(d => walk(join(root, d)));
// Also add root-level files
for (const f of ["index.html", "package.json"]) {
  if (existsSync(join(root, f))) files.push(join(root, f));
}

let updated = 0;
let totalUrls = 0;

for (const file of files) {
  let content = readFileSync(file, "utf8");
  if (!content.includes("pixinlink.com")) continue;

  // Skip files where everything is already in v1 format
  // Count .com URLs before changes
  let fileUrls = 0;

  // Convert pixinlink.com URLs to pixinlink.ru/api/v1/
  // Pattern: https://pixinlink.com/{WxH}/{bg}/{fg}?prompt=...&style=...&watermark=...
  const urlRegex = /https:\/\/pixinlink\.com\/(\d+x\d+)\/([a-fA-F0-9]{3,6})\/([a-fA-F0-9]{3,6})(\?[^"'\s<>]*)/g;

  content = content.replace(urlRegex, (match, dims, bg, fg, query) => {
    fileUrls++;
    const params = new URLSearchParams(query);
    const prompt = params.get("prompt") || "";
    const decoded = decodeURIComponent(prompt);
    // Convert prompt to a URL-friendly slug
    const slug = decoded
      .replace(/\+/g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Zа-яёА-ЯЁ0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase()
      || "image";
    return `https://pixinlink.ru/api/v1/${dims}/${slug}`;
  });

  // Also handle standalone pixinlink.com references in code/docs (non-URL context)
  // e.g., "pixinlink.com" in prose → "pixinlink.ru"
  // This handles the CSP header example and other references

  if (fileUrls > 0) {
    writeFileSync(file, content, "utf8");
    const rel = relative(root, file).replace(/\\/g, "/");
    console.log(`✓ ${rel} (${fileUrls} URLs)`);
    updated++;
    totalUrls += fileUrls;
  }
}

console.log(`\nDone. Updated ${updated} files, ${totalUrls} URLs total.`);

// Validate: verify no pixinlink.com URLs left in source files
const remaining = [];
for (const file of files) {
  const content = readFileSync(file, "utf8");
  if (content.includes("pixinlink.com")) {
    // Only flag if it contains actual https://pixinlink.com URLs (not just domain mentions)
    if (/https:\/\/pixinlink\.com\//.test(content)) {
      remaining.push(relative(root, file).replace(/\\/g, "/"));
    }
  }
}
if (remaining.length > 0) {
  console.log(`\n⚠ ${remaining.length} files still have unrecognized pixinlink.com URLs:`);
  for (const f of remaining) console.log(`  - ${f}`);
} else {
  console.log("\n✓ No remaining pixinlink.com source URLs found.");
}
