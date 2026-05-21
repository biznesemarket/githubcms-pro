import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { sanitizerOptions } from "./sanitize-config.mjs";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const locale = process.env.VITE_LOCALE || "ru";
const sectionsDir = join(rootDir, "content", locale, "sections");
const outputDir = join(rootDir, "public", "content", "sections");

mkdirSync(outputDir, { recursive: true });

const markdown = new MarkdownIt({ html: true, linkify: true, typographer: true });

if (!existsSync(sectionsDir)) {
  console.log("No sections directory found. Skipping section content build.");
  process.exit(0);
}

for (const file of readdirSync(sectionsDir)) {
  if (!file.endsWith(".md")) continue;
  const raw = readFileSync(join(sectionsDir, file), "utf8");
  const parsed = matter(raw);
  const isRawHtml = parsed.data.raw_html === true;
  const html = isRawHtml
    ? parsed.content.trim()
    : sanitizeHtml(markdown.render(parsed.content), sanitizerOptions);

  const json = JSON.stringify({ title: parsed.data.title, description: parsed.data.description, html, raw: isRawHtml });
  const outputFile = (parsed.data.slug || file.replace(".md", "")) + ".json";
  writeFileSync(join(outputDir, outputFile), json, "utf8");
  console.log("✓", file, "→", outputFile);
}

console.log(`\nParsed ${readdirSync(sectionsDir).filter(f => f.endsWith(".md")).length} section files.`);
