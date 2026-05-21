import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const registryPath = join(process.cwd(), "templates", "registry.json");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

if (!existsSync(registryPath)) {
  console.error("Template registry not found: templates/registry.json");
  process.exit(1);
}

const registry = readJson(registryPath);
const rows = [];

for (const entry of registry.templates || []) {
  const templatePath = join(process.cwd(), entry.path);
  if (!existsSync(templatePath)) {
    rows.push({
      id: entry.id,
      edition: entry.edition,
      visibility: entry.visibility,
      version: "missing",
      name: "manifest missing",
    });
    continue;
  }

  const template = readJson(templatePath);
  rows.push({
    id: template.id,
    edition: template.edition,
    visibility: entry.visibility,
    version: template.version,
    name: template.name,
  });
}

console.log("GitHub CMS Template Packs\n");
console.table(rows);
console.log(`Default Free: ${registry.defaultFreeTemplate}`);
console.log(`Default Pro:  ${registry.defaultProTemplate}`);
