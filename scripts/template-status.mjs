import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const jsonMode = process.argv.includes("--json");

function readJsonIfExists(relativePath) {
  const fullPath = join(root, relativePath);
  if (!existsSync(fullPath)) return null;
  return JSON.parse(readFileSync(fullPath, "utf8"));
}

function loadTemplate(entry) {
  const manifest = readJsonIfExists(entry.path);
  return manifest
    ? { ...entry, manifest, manifestFound: true }
    : { ...entry, manifest: null, manifestFound: false };
}

function hasActiveLicense(license, templateId) {
  return Boolean(
    license?.licenses?.some(
      (item) => item.templateId === templateId && item.status === "active",
    ),
  );
}

function themeExists(template) {
  const target = template?.install?.themeTarget;
  if (typeof target !== "string") return false;
  return existsSync(join(root, target, "theme.scss"));
}

const registry = readJsonIfExists("templates/registry.json");

if (!registry) {
  console.error("Template registry not found: templates/registry.json");
  process.exit(1);
}

const lock = readJsonIfExists(".githubcms/templates.lock.json");
const license = readJsonIfExists(".githubcms/license.json");
const installedById = new Map((lock?.installed || []).map((item) => [item.id, item]));

const templates = (registry.templates || []).map(loadTemplate);
const rows = templates.map((entry) => {
  const template = entry.manifest;
  const installed = installedById.get(entry.id);
  const isPro = entry.edition === "pro";

  return {
    id: entry.id,
    name: template?.name || "(manifest missing)",
    edition: entry.edition,
    visibility: entry.visibility,
    registered: entry.manifestFound,
    installed: Boolean(installed),
    active: lock?.active === entry.id,
    version: installed?.version || template?.version || "n/a",
    themeReady: installed ? themeExists(template) : false,
    license: isPro ? (hasActiveLicense(license, entry.id) ? "active" : "missing") : "not required",
  };
});

const payload = {
  registry: {
    defaultFreeTemplate: registry.defaultFreeTemplate,
    defaultProTemplate: registry.defaultProTemplate,
  },
  lock: {
    exists: Boolean(lock),
    active: lock?.active || null,
    installedCount: lock?.installed?.length || 0,
  },
  license: {
    exists: Boolean(license),
    edition: license?.edition || null,
  },
  templates: rows,
  nextActions: [],
};

if (!lock) {
  payload.nextActions.push("Install the Free baseline: npm run template:install -- --id purple-geo-lite --yes");
} else if (!lock.active) {
  payload.nextActions.push("Activate an installed template: npm run template:activate -- --id <template-id> --yes");
} else {
  payload.nextActions.push("Run npm run validate:all before publishing changes.");
}

if (jsonMode) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log("GitHub CMS Template Status\n");
console.log(`Default Free: ${payload.registry.defaultFreeTemplate}`);
console.log(`Default Pro:  ${payload.registry.defaultProTemplate}`);
console.log(`Lock file:    ${payload.lock.exists ? ".githubcms/templates.lock.json" : "missing"}`);
console.log(`Active:       ${payload.lock.active || "none"}`);
console.log(`License:      ${payload.license.exists ? `${payload.license.edition || "unknown"} edition` : "missing"}`);
console.log("");
console.table(rows);
console.log("Next action:");
for (const action of payload.nextActions) {
  console.log(`- ${action}`);
}
