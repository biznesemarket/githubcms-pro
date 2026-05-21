import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const failures = [];

function rel(path) {
  return relative(root, path).replace(/\\/g, "/");
}

function readJson(relativePath) {
  const fullPath = join(root, relativePath);
  if (!existsSync(fullPath)) {
    failures.push(`${relativePath}: file does not exist`);
    return null;
  }

  try {
    return JSON.parse(readFileSync(fullPath, "utf8"));
  } catch (error) {
    failures.push(`${relativePath}: invalid JSON (${error.message})`);
    return null;
  }
}

function requireString(obj, field, context) {
  if (typeof obj[field] !== "string" || obj[field].trim() === "") {
    failures.push(`${context}: missing or invalid string field '${field}'`);
    return null;
  }
  return obj[field];
}

function requireArray(obj, field, context) {
  if (!Array.isArray(obj[field]) || obj[field].length === 0) {
    failures.push(`${context}: missing or empty array field '${field}'`);
    return [];
  }
  return obj[field];
}

function assertPathExists(relativePath, context) {
  const fullPath = join(root, relativePath);
  if (!existsSync(fullPath)) {
    failures.push(`${context}: referenced path does not exist: ${relativePath}`);
  }
}

function validatePromptPack(template, templatePath) {
  const templateDir = dirname(templatePath);
  const promptPackPath = join(templateDir, "prompts", "prompt-pack.json");
  const promptPackRel = rel(promptPackPath);

  if (!existsSync(promptPackPath)) return;

  const pack = readJson(promptPackRel);
  if (!pack) return;

  if (pack.templateId !== template.id) {
    failures.push(`${promptPackRel}: templateId '${pack.templateId}' does not match template '${template.id}'`);
  }

  if (pack.edition !== template.edition) {
    failures.push(`${promptPackRel}: edition '${pack.edition}' does not match template edition '${template.edition}'`);
  }

  const promptTemplates = requireArray(pack, "templates", promptPackRel);
  for (const prompt of promptTemplates) {
    const promptContext = `${promptPackRel}: prompt '${prompt.id || "unknown"}'`;
    requireString(prompt, "id", promptContext);
    const source = requireString(prompt, "source", promptContext);
    requireString(prompt, "output", promptContext);
    requireArray(prompt, "requiredBlocks", promptContext);
    requireArray(prompt, "requiredVariables", promptContext);
    if (source) assertPathExists(source, promptContext);
  }
}

function validateGeoFiles(template) {
  const geoBlocks = template.sourcePaths?.geoBlocks;
  const schemaMap = template.sourcePaths?.schemaMap;

  if (template.includes.includes("geo-blocks") && !geoBlocks) {
    failures.push(`${template.id}: includes geo-blocks but sourcePaths.geoBlocks is missing`);
  }

  if (template.includes.includes("schema-map") && !schemaMap) {
    failures.push(`${template.id}: includes schema-map but sourcePaths.schemaMap is missing`);
  }

  if (geoBlocks) {
    assertPathExists(geoBlocks, template.id);
    const blocks = readJson(geoBlocks);
    if (blocks) {
      const blockList = requireArray(blocks, "blocks", geoBlocks);
      for (const block of blockList) {
        const context = `${geoBlocks}: block '${block.id || "unknown"}'`;
        requireString(block, "id", context);
        requireArray(block, "requiredFor", context);
        requireArray(block, "schemaHints", context);
        requireString(block, "aiPurpose", context);
      }
    }
  }

  if (schemaMap) {
    assertPathExists(schemaMap, template.id);
    const map = readJson(schemaMap);
    if (map && (!map.map || typeof map.map !== "object" || Array.isArray(map.map))) {
      failures.push(`${schemaMap}: missing object field 'map'`);
    }
  }
}

const registry = readJson("templates/registry.json");

if (!registry) {
  failures.push("templates/registry.json is required");
} else {
  if (registry.schemaVersion !== 1) {
    failures.push("templates/registry.json: schemaVersion must be 1");
  }

  const entries = requireArray(registry, "templates", "templates/registry.json");
  const ids = new Set();
  const templates = [];

  for (const entry of entries) {
    const context = `templates/registry.json: entry '${entry.id || "unknown"}'`;
    const id = requireString(entry, "id", context);
    const path = requireString(entry, "path", context);
    const edition = requireString(entry, "edition", context);
    requireString(entry, "visibility", context);

    if (id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
      failures.push(`${context}: id must be kebab-case`);
    }

    if (id && ids.has(id)) {
      failures.push(`${context}: duplicate template id`);
    }
    if (id) ids.add(id);

    if (edition && !["free", "pro"].includes(edition)) {
      failures.push(`${context}: edition must be free or pro`);
    }

    const template = path ? readJson(path) : null;
    if (!template) continue;

    templates.push(template);

    if (template.id !== id) {
      failures.push(`${path}: id '${template.id}' does not match registry id '${id}'`);
    }

    if (template.edition !== edition) {
      failures.push(`${path}: edition '${template.edition}' does not match registry edition '${edition}'`);
    }

    for (const field of ["name", "version", "license", "author", "compatibleGithubCms", "description", "preview"]) {
      requireString(template, field, path);
    }

    const includes = requireArray(template, "includes", path);
    template.includes = includes;

    if (!template.sourcePaths || typeof template.sourcePaths !== "object") {
      failures.push(`${path}: missing object field 'sourcePaths'`);
    } else {
      const themeEntry = requireString(template.sourcePaths, "themeEntry", path);
      if (themeEntry) assertPathExists(themeEntry, path);

      const prompts = Array.isArray(template.sourcePaths.prompts) ? template.sourcePaths.prompts : [];
      for (const prompt of prompts) {
        assertPathExists(prompt, path);
      }
    }

    if (!template.install || typeof template.install !== "object") {
      failures.push(`${path}: missing object field 'install'`);
    } else if (typeof template.install.promptTarget !== "string" || !template.install.promptTarget.includes("{locale}")) {
      failures.push(`${path}: install.promptTarget must include {locale}`);
    }

    if (template.edition === "free") {
      if (template.license !== "free") {
        failures.push(`${path}: free template must use license 'free'`);
      }
      if (template.limits?.marketplaceInstall !== false) {
        failures.push(`${path}: free template must set limits.marketplaceInstall=false`);
      }
      if (template.limits?.advancedGeoBlocks !== false) {
        failures.push(`${path}: free template must set limits.advancedGeoBlocks=false`);
      }
    }

    if (template.edition === "pro") {
      if (template.license === "free") {
        failures.push(`${path}: pro template must not use license 'free'`);
      }
      if (!template.price || typeof template.price.amount !== "number" || typeof template.price.currency !== "string") {
        failures.push(`${path}: pro template must define price.amount and price.currency`);
      }
    }

    validateGeoFiles(template);
    validatePromptPack(template, path);
  }

  if (!ids.has(registry.defaultFreeTemplate)) {
    failures.push(`templates/registry.json: defaultFreeTemplate '${registry.defaultFreeTemplate}' is not registered`);
  }

  if (!ids.has(registry.defaultProTemplate)) {
    failures.push(`templates/registry.json: defaultProTemplate '${registry.defaultProTemplate}' is not registered`);
  }
}

if (failures.length > 0) {
  console.error(`Template pack validation failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log("Template pack validation passed.");
