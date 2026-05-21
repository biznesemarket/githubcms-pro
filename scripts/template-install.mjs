import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

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

function ensureParent(path) {
  mkdirSync(dirname(path), { recursive: true });
}

function copyFilePlanned(sourceRel, targetAbs, operations) {
  const sourceAbs = join(root, sourceRel);
  if (!existsSync(sourceAbs)) {
    throw new Error(`Source file does not exist: ${sourceRel}`);
  }

  operations.push({
    type: "copy",
    source: sourceRel,
    target: toRel(targetAbs),
  });
}

function assertTargetAvailable(targetAbs, force, label) {
  if (existsSync(targetAbs) && !force) {
    throw new Error(`${label} already exists: ${toRel(targetAbs)}. Re-run with --force to overwrite files in this namespaced target.`);
  }
}

function loadTemplate(id) {
  const registry = readJson("templates/registry.json");
  const entry = (registry.templates || []).find((item) => item.id === id);
  if (!entry) {
    throw new Error(`Template '${id}' is not registered in templates/registry.json`);
  }
  return readJson(entry.path);
}

function verifyLicense(template) {
  if (template.edition !== "pro") return;

  const licensePath = join(root, ".githubcms", "license.json");
  if (!existsSync(licensePath)) {
    throw new Error(`Template '${template.id}' requires a Pro license. Expected .githubcms/license.json.`);
  }

  const license = JSON.parse(readFileSync(licensePath, "utf8"));
  const hasActiveLicense = (license.licenses || []).some(
    (item) => item.templateId === template.id && item.status === "active",
  );

  if (!hasActiveLicense) {
    throw new Error(`No active license found for template '${template.id}' in .githubcms/license.json.`);
  }
}

function updateLock(template) {
  const lockPath = join(root, ".githubcms", "templates.lock.json");
  const now = new Date().toISOString();
  const lock = existsSync(lockPath)
    ? JSON.parse(readFileSync(lockPath, "utf8"))
    : { schemaVersion: 1, active: null, installed: [] };

  const installed = (lock.installed || []).filter((item) => item.id !== template.id);
  installed.push({
    id: template.id,
    version: template.version,
    edition: template.edition,
    installedAt: now,
  });

  const nextLock = {
    schemaVersion: 1,
    active: lock.active ?? null,
    installed,
  };

  mkdirSync(dirname(lockPath), { recursive: true });
  writeFileSync(lockPath, `${JSON.stringify(nextLock, null, 2)}\n`, "utf8");
}

const id = getArg("--id");
const locale = getArg("--locale", process.env.VITE_LOCALE || "ru");
const dryRun = hasFlag("--dry-run") || !hasFlag("--yes");
const force = hasFlag("--force");

if (!id) {
  console.error("Usage: npm run template:install -- --id <template-id> [--locale ru] [--dry-run] [--yes] [--force]");
  console.error("Example: npm run template:install -- --id purple-geo-lite --dry-run");
  process.exit(1);
}

try {
  const template = loadTemplate(id);
  const operations = [];

  if (!dryRun) verifyLicense(template);

  const themeTarget = join(root, template.install.themeTarget, "theme.scss");
  assertTargetAvailable(dirname(themeTarget), force, "Theme target");
  copyFilePlanned(template.sourcePaths.themeEntry, themeTarget, operations);

  const promptTargetRel = template.install.promptTarget.replace("{locale}", locale);
  const promptTargetAbs = join(root, promptTargetRel);
  assertTargetAvailable(promptTargetAbs, force, "Prompt target");

  for (const prompt of template.sourcePaths.prompts || []) {
    copyFilePlanned(prompt, join(promptTargetAbs, basename(prompt)), operations);
  }

  const promptPackPath = join(root, "templates", template.id, "prompts", "prompt-pack.json");
  if (existsSync(promptPackPath)) {
    operations.push({
      type: "copy",
      source: toRel(promptPackPath),
      target: toRel(join(promptTargetAbs, "prompt-pack.json")),
    });
  }

  console.log(`Template install plan: ${template.name} (${template.id})`);
  console.log(`Mode: ${dryRun ? "dry-run" : "write"}`);
  console.log(`Locale: ${locale}`);
  console.table(operations);

  if (dryRun) {
    console.log("\nNo files were changed. Add --yes to install.");
    if (template.edition === "pro") {
      console.log("Pro templates require .githubcms/license.json for real installation.");
    }
    process.exit(0);
  }

  for (const operation of operations) {
    const sourceAbs = join(root, operation.source);
    const targetAbs = join(root, operation.target);
    ensureParent(targetAbs);
    copyFileSync(sourceAbs, targetAbs);
  }

  updateLock(template);
  console.log(`\nTemplate '${template.id}' installed. Review .githubcms/templates.lock.json before activation.`);
} catch (error) {
  console.error(`Template install failed: ${error.message}`);
  process.exit(1);
}
