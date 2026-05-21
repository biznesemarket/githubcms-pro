import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const args = process.argv.slice(2);
const templateName = args[0];

if (!templateName) {
  console.error("Usage: node scripts/install-template.mjs <template-name>");
  console.error("Example: node scripts/install-template.mjs purple-geo");
  console.error("\nAvailable templates:");
  listThemes();
  process.exit(1);
}

const themesDir = join(process.cwd(), "src", "assets", "themes");
const templateDir = join(themesDir, templateName);

if (!existsSync(templateDir)) {
  console.error(`Template '${templateName}' not found in src/assets/themes/`);
  console.error("\nAvailable templates:");
  listThemes();
  process.exit(1);
}

const themeJsonPath = join(templateDir, "theme.json");
const metadata = existsSync(themeJsonPath)
  ? JSON.parse(readFileSync(themeJsonPath, "utf8"))
  : { name: templateName, version: "1.0" };

console.log(`\nInstalling template: ${metadata.name} v${metadata.version}`);
console.log(`Author: ${metadata.author || "Unknown"}`);
if (metadata.description) console.log(`Description: ${metadata.description}\n`);

// Step 1: Update main.scss
console.log("1. Updating main.scss...");
const mainScssPath = join(process.cwd(), "src", "assets", "main.scss");
let mainScss = readFileSync(mainScssPath, "utf8");

const themeLine = metadata.entry || `themes/${templateName}/theme.scss`;
mainScss = mainScss.replace(
  /@import\s+["']themes\/[^"']+["']\s*;?/g,
  `@import "${themeLine}";`,
);

// If no @import found, inject after the highlight.js import
if (!mainScss.includes("@import")) {
  mainScss = mainScss.replace(
    /(@import\s+["']highlight\.js[^"']+["']\s*;?)/,
    `$1\n@import "${themeLine}";`,
  );
}

writeFileSync(mainScssPath, mainScss, "utf8");
console.log(`   ✓ Active theme set to: ${themeLine}`);

// Step 2: Copy prompts (if template has them)
const promptsDir = join(templateDir, "prompts");
if (existsSync(promptsDir)) {
  console.log("\n2. Installing prompts...");
  const targetDir = join(process.cwd(), "content", "templates");
  mkdirSync(targetDir, { recursive: true });

  const promptFiles = readdirSync(promptsDir);
  for (const file of promptFiles) {
    cpSync(join(promptsDir, file), join(targetDir, file));
    console.log(`   ✓ ${file}`);
  }
} else {
  console.log("\n2. No prompts directory in template.");
}

// Step 3: Copy component overrides (if template has them)
const componentsDir = join(templateDir, "components");
if (existsSync(componentsDir)) {
  console.log("\n3. Installing component overrides...");
  const targetDir = join(process.cwd(), "src", "components");

  const componentFiles = [];
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fp = join(dir, entry.name);
      if (entry.isDirectory()) walk(fp);
      else if (entry.name.endsWith(".vue")) componentFiles.push(fp);
    }
  }
  walk(componentsDir);

  for (const file of componentFiles) {
    const relPath = file.replace(componentsDir, "").replace(/\\/g, "/").replace(/^\//, "");
    const target = join(targetDir, relPath);
    mkdirSync(join(target, ".."), { recursive: true });
    cpSync(file, target);
    console.log(`   ✓ ${relPath}`);
  }
} else {
  console.log("\n3. No component overrides in template.");
}

// Step 4: Summary
console.log(`\n═══════════════════════════════════`);
console.log(`Template '${metadata.name}' installed successfully!`);
console.log(`═══════════════════════════════════`);
console.log(`\nNext steps:`);
console.log(`  1. Review changes in src/assets/main.scss`);
console.log(`  2. Review prompts in content/templates/`);
console.log(`  3. Run: npm run dev`);
console.log(`  4. Build: npm run build`);

function listThemes() {
  if (!existsSync(themesDir)) return;
  for (const entry of readdirSync(themesDir)) {
    const dir = join(themesDir, entry);
    const jsonPath = join(dir, "theme.json");
    if (existsSync(jsonPath)) {
      try {
        const meta = JSON.parse(readFileSync(jsonPath, "utf8"));
        console.log(`  ${entry} — ${meta.name} v${meta.version} (${meta.author || "Unknown"})`);
      } catch {
        console.log(`  ${entry}`);
      }
    }
  }
}
