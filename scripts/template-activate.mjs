import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const args = process.argv.slice(2);
const root = process.cwd();

function hasFlag(name) {
  return args.includes(name);
}

function getArg(name, fallback = null) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8"));
}

function toRel(path) {
  return relative(root, path).replace(/\\/g, "/");
}

function loadTemplate(id) {
  const registry = readJson("templates/registry.json");
  const entry = (registry.templates || []).find((item) => item.id === id);
  if (!entry) {
    throw new Error(`Template '${id}' is not registered in templates/registry.json`);
  }
  return readJson(entry.path);
}

function resolveThemeImport(template) {
  const target = template.install?.themeTarget;
  if (typeof target !== "string" || !target.startsWith("src/assets/themes/")) {
    throw new Error(`Template '${template.id}' has invalid install.themeTarget '${target}'`);
  }
  return `${target.replace(/^src\/assets\//, "")}/theme.scss`;
}

function updateMainScss(source, themeImport) {
  const lines = source.split(/\r?\n/);
  let replaced = false;

  const nextLines = lines.map((line) => {
    if (!replaced && /^\s*@import\s+["']themes\/[^"']+["']\s*;?\s*$/.test(line)) {
      replaced = true;
      return `@import "${themeImport}";`;
    }
    return line;
  });

  if (!replaced) {
    const highlightIndex = nextLines.findIndex((line) => /@import\s+["']highlight\.js/.test(line));
    const insertAt = highlightIndex >= 0 ? highlightIndex + 1 : nextLines.length;
    nextLines.splice(insertAt, 0, `@import "${themeImport}";`);
  }

  return `${nextLines.join("\n").replace(/\n*$/, "")}\n`;
}

const id = getArg("--id");
const dryRun = hasFlag("--dry-run") || !hasFlag("--yes");

if (!id) {
  console.error("Usage: npm run template:activate -- --id <template-id> [--dry-run] [--yes]");
  console.error("Example: npm run template:activate -- --id purple-geo-lite --dry-run");
  process.exit(1);
}

try {
  const template = loadTemplate(id);
  const lockPath = join(root, ".githubcms", "templates.lock.json");
  if (!existsSync(lockPath)) {
    throw new Error("Template lock not found. Install a template first with npm run template:install -- --id <template-id> --yes.");
  }

  const lock = JSON.parse(readFileSync(lockPath, "utf8"));
  const installed = (lock.installed || []).find((item) => item.id === id);
  if (!installed) {
    throw new Error(`Template '${id}' is not installed in .githubcms/templates.lock.json.`);
  }

  const themeImport = resolveThemeImport(template);
  const themeFile = join(root, template.install.themeTarget, "theme.scss");
  if (!existsSync(themeFile)) {
    throw new Error(`Installed theme entry does not exist: ${toRel(themeFile)}. Re-run template install first.`);
  }

  const mainScssPath = join(root, "src", "assets", "main.scss");
  const currentMainScss = readFileSync(mainScssPath, "utf8");
  const nextMainScss = updateMainScss(currentMainScss, themeImport);
  const nextLock = {
    ...lock,
    active: id,
    activatedAt: new Date().toISOString(),
  };

  console.log(`Template activation plan: ${template.name} (${template.id})`);
  console.log(`Mode: ${dryRun ? "dry-run" : "write"}`);
  console.table([
    {
      file: "src/assets/main.scss",
      change: `active import -> ${themeImport}`,
    },
    {
      file: ".githubcms/templates.lock.json",
      change: `active -> ${id}`,
    },
  ]);

  if (dryRun) {
    console.log("\nNo files were changed. Add --yes to activate.");
    process.exit(0);
  }

  writeFileSync(mainScssPath, nextMainScss, "utf8");
  writeFileSync(lockPath, `${JSON.stringify(nextLock, null, 2)}\n`, "utf8");
  console.log(`\nTemplate '${id}' activated.`);
} catch (error) {
  console.error(`Template activation failed: ${error.message}`);
  process.exit(1);
}
