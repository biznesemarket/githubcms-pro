/**
 * One-shot migration: converts legacy open-ended @block markers to canonical
 * paired syntax (`<!-- @block:name --> … <!-- /@block:name -->`) across demo
 * content files. Inserts closing markers only — original markers are untouched.
 *
 * Boundary rules (deterministic, fence-aware):
 *  - answer-first  → content until the first `##` heading or the next marker
 *  - key-facts     → content until the SECOND `##` heading after the marker
 *                    (the first section) or the next marker
 *  - faq / cta / hero / featured-snippet / schema-hints
 *                  → content until the next marker or EOF
 *
 * Run: node scripts/dev/migrate-block-markers.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const MARKER_REGEX = /<!--\s*(\/)?\s*@block:\s*([a-z0-9-]+)\s*-->/g;

function isCodeFenceStart(line) {
  return /^\s*(```|~~~)/.test(line);
}
const isHeading = (line) => /^\s*##\s+/.test(line);

function inlineCodeRanges(line) {
  const ranges = [];
  const re = /`[^`]*`/g;
  let m;
  while ((m = re.exec(line)) !== null) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  return ranges;
}

function inRanges(pos, ranges) {
  return ranges.some(([s, e]) => pos >= s && pos < e);
}

function tokenize(raw) {
  const tokens = [];
  const lines = raw.split("\n");
  let inFence = false;
  let offset = 0;
  for (const line of lines) {
    if (inFence) {
      if (isCodeFenceStart(line)) inFence = false;
    } else if (isCodeFenceStart(line)) {
      inFence = true;
    } else {
      const codeRanges = inlineCodeRanges(line);
      MARKER_REGEX.lastIndex = 0;
      let m;
      while ((m = MARKER_REGEX.exec(line)) !== null) {
        if (inRanges(m.index, codeRanges)) continue;
        tokens.push({
          kind: m[1] === "/" ? "close" : "open",
          name: m[2],
          start: offset + m.index,
          end: offset + m.index + m[0].length,
        });
      }
    }
    offset += line.length + 1;
  }
  return tokens;
}

function headingPositions(raw) {
  const positions = [];
  const lines = raw.split("\n");
  let inFence = false;
  let offset = 0;
  for (const line of lines) {
    if (inFence) {
      if (isCodeFenceStart(line)) inFence = false;
    } else if (isCodeFenceStart(line)) {
      inFence = true;
    } else {
      if (isHeading(line)) positions.push(offset);
    }
    offset += line.length + 1;
  }
  return positions;
}

// Compute the byte offset where the closing marker should be inserted.
// All boundaries are clamped to the next marker (or EOF) so a close never
// lands after another block's opening marker.
function closeOffsetFor(name, openEnd, nextMarkerStart, headings, raw) {
  const hardBound = nextMarkerStart ?? raw.length;
  if (name === "answer-first") {
    const h = headings.find((p) => p >= openEnd && p < hardBound);
    if (h) return h;
    return hardBound;
  }
  if (name === "key-facts") {
    const after = headings.filter((p) => p >= openEnd && p < hardBound);
    if (after.length >= 2) return after[1];
    return hardBound;
  }
  return hardBound;
}

function migrateBody(body) {
  const tokens = tokenize(body);
  const opens = tokens.filter((t) => t.kind === "open");
  if (opens.length === 0) return body;

  const headings = headingPositions(body);
  // Insert closing markers before the content boundary. Process in reverse so
  // earlier offsets stay valid.
  const insertions = [];
  for (let i = 0; i < opens.length; i++) {
    const open = opens[i];
    const nextOpen = opens[i + 1];
    const offset = closeOffsetFor(
      open.name,
      open.end,
      nextOpen ? nextOpen.start : undefined,
      headings,
      body,
    );
    insertions.push({ offset, name: open.name });
  }
  insertions.sort((a, b) => b.offset - a.offset);

  let result = body;
  for (const ins of insertions) {
    const close = `<!-- /@block: ${ins.name} -->`;
    result = result.slice(0, ins.offset) + `\n${close}\n` + result.slice(ins.offset);
  }
  return result.replace(/\n{4,}/g, "\n\n\n").replace(/[ \t]+$/gm, "");
}

function collect(dir, skip = new Set()) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    if (skip.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) results.push(...collect(full, skip));
    else if (extname(entry) === ".md") results.push(full);
  }
  return results;
}

const root = process.cwd();
const targets = [
  ...collect(join(root, "content", "ru", "blog")),
  ...collect(join(root, "content", "en", "blog")),
  ...collect(join(root, "content", "prompt-templates")),
];

let changed = 0;
for (const file of targets) {
  const source = readFileSync(file, "utf8");
  const fmEnd = source.indexOf("---", 3);
  if (fmEnd === -1) continue;
  const fm = source.slice(0, fmEnd);
  const body = source.slice(fmEnd);
  const migrated = migrateBody(body);
  if (migrated !== body) {
    writeFileSync(file, fm + migrated, "utf8");
    console.log(`  migrated: ${file.replace(/\\/g, "/")}`);
    changed++;
  }
}
console.log(`\nMigrated ${changed} file(s).`);
