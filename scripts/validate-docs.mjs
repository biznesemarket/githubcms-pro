import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const docsRoot = "docs";
const failures = [];

function walk(dir) {
  const paths = [];

  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      paths.push(...walk(path));
      continue;
    }

    paths.push(path.replaceAll("\\", "/"));
  }

  return paths;
}

function fail(message) {
  failures.push(message);
}

if (!existsSync(docsRoot)) {
  fail("docs/ directory is missing");
}

const markdownFiles = existsSync(docsRoot)
  ? walk(docsRoot).filter((file) => file.endsWith(".md")).sort()
  : [];
const primaryFiles = markdownFiles.filter((file) => !basename(file).startsWith("README_"));
const companionFiles = markdownFiles.filter((file) => basename(file).startsWith("README_"));

const requiredCompanionHeadings = [
  "## Для непрограммистов",
  "## Информационный блок для ИИ",
  "## Основное тело документа",
];

for (const source of primaryFiles) {
  const dir = dirname(source);
  const name = basename(source);
  const expected = name === "README.md" ? join(dir, "README_README.md") : join(dir, `README_${name}`);

  if (!existsSync(expected)) {
    fail(`Missing companion README for ${source}: expected ${expected}`);
  }
}

for (const companion of companionFiles) {
  const text = readFileSync(companion, "utf8");

  for (const heading of requiredCompanionHeadings) {
    if (!text.includes(heading)) {
      fail(`${companion} is missing required heading: ${heading}`);
    }
  }
}

const linkPattern = /(?<!!)\[[^\]]+\]\(([^)]+)\)/g;
const linkSources = [existsSync("README.md") ? "README.md" : null, ...markdownFiles].filter(Boolean);

for (const source of linkSources) {
  const text = readFileSync(source, "utf8");

  for (const match of text.matchAll(linkPattern)) {
    const rawTarget = match[1].trim();
    const target = rawTarget.includes(" ") && !rawTarget.startsWith("<")
      ? rawTarget.split(" ")[0]
      : rawTarget;

    if (/^(https?:|mailto:|#|\/)/.test(target)) {
      continue;
    }

    let targetPath = target.split("#", 1)[0];
    if (!targetPath) {
      continue;
    }

    if (targetPath.startsWith("<") && targetPath.endsWith(">")) {
      targetPath = targetPath.slice(1, -1);
    }

    targetPath = decodeURIComponent(targetPath);

    const resolved = resolve(dirname(source), targetPath);
    if (!existsSync(resolved)) {
      fail(`Broken relative link in ${source}: ${rawTarget} -> ${resolved}`);
    }
  }
}

const mermaidPattern = /```mermaid\s*\n([\s\S]*?)```/g;
const allowedMermaid = ["flowchart TB", "sequenceDiagram", "erDiagram"];
let mermaidCount = 0;

for (const source of linkSources) {
  const text = readFileSync(source, "utf8");

  for (const match of text.matchAll(mermaidPattern)) {
    mermaidCount += 1;
    const firstLine = match[1]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean) ?? "";

    if (!allowedMermaid.some((prefix) => firstLine.startsWith(prefix))) {
      fail(`Unsupported Mermaid diagram type in ${source}: ${firstLine}`);
    }
  }
}

const indexFiles = [
  "docs/README.md",
  ...readdirSync(docsRoot)
    .map((name) => join(docsRoot, name, "README.md").replaceAll("\\", "/"))
    .filter((file) => existsSync(file)),
  "docs/architecture/adr/README.md",
];
const allowedMdLiterals = new Set([
  "content/blog/{YYYY-MM-DD}-{slug}.md",
  "content/pages/{slug}.md",
  "content/templates/*.md",
]);
const literalPattern = /`([^`]*\.md)`/g;

for (const source of indexFiles) {
  if (!existsSync(source)) {
    continue;
  }

  const text = readFileSync(source, "utf8");
  for (const match of text.matchAll(literalPattern)) {
    const literal = match[1];

    if (!allowedMdLiterals.has(literal)) {
      fail(`Unexpected backticked .md literal in index ${source}: \`${literal}\``);
    }
  }
}

console.log(`Markdown files: ${markdownFiles.length}`);
console.log(`Primary documents: ${primaryFiles.length}`);
console.log(`Companion README documents: ${companionFiles.length}`);
console.log(`Mermaid blocks: ${mermaidCount}`);

if (failures.length > 0) {
  console.error("\nDocumentation validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Documentation validation passed.");
