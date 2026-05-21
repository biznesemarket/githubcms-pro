// Sync core files to Free/Pro repos
// Usage: node scripts/sync-core.mjs <target-dir> <edition: free|pro>
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";

const targetDir = process.argv[2];
const edition = process.argv[3] || "pro";

if (!targetDir) {
  console.error("Usage: node scripts/sync-core.mjs <target-dir> <edition: free|pro>");
  process.exit(1);
}

if (!existsSync(targetDir)) {
  console.log(`Creating target directory: ${targetDir}`);
  mkdirSync(targetDir, { recursive: true });
}

// Core files — always copied
const coreFiles = [
  "src/schema/",
  "src/composables/",
  "src/i18n/",
  "src/utils/",
  "scripts/",
  "src/content/products.ts",
  "src/content/pages.ts",
  "src/content/articles.ts",
  "src/generated/",
  "src/main.ts",
  "src/App.vue",
  "src/site.config.ts",
  "src/routes.ts",
  "src/assets/",
  "src/components/AppNavbar.vue",
  "src/components/AppFooter.vue",
  "src/components/PageBanner.vue",
  "src/components/BackToTop.vue",
  "public/",
  ".kilo/",
  ".env.example",
  ".gitignore",
  "package.json",
  "vite.config.ts",
  "tsconfig.json",
  "index.html",
  "favicon.svg",
  "favicon*.png",
  "site.webmanifest",
  "docs/",
];

// Common page components (both Free and Pro)
const commonPages = [
  "src/pages/HomePage.vue",
  "src/pages/ArticlePage.vue",
  "src/pages/BlogIndex.vue",
  "src/pages/CategoryPage.vue",
  "src/pages/TagPage.vue",
  "src/pages/PageView.vue",
  "src/pages/TemplatesPage.vue",
];

// Pro-only page components
const proPages = [
  "src/pages/HomeVariant2.vue",
  "src/pages/HomeVariant3.vue",
  "src/pages/HomeVariant4.vue",
  "src/pages/HomeVariant5.vue",
  "src/pages/RazdelPage.vue",
  "src/pages/SectionArticlePage.vue",
  "src/pages/ShopPage.vue",
  "src/pages/ShopSectionPage.vue",
  "src/pages/ShopProductPage.vue",
  "src/pages/PaymentSuccess.vue",
];

function copyItem(src) {
  const dest = join(targetDir, src);
  const destParent = dirname(dest);
  if (!existsSync(destParent)) mkdirSync(destParent, { recursive: true });

  if (existsSync(join(process.cwd(), src))) {
    try {
      cpSync(join(process.cwd(), src), dest, { recursive: true });
      console.log(`  ✓ ${src}`);
    } catch (e) {
      console.error(`  ✗ ${src}: ${e.message}`);
    }
  }
}

console.log(`Syncing core files to ${targetDir} (edition: ${edition})`);

// Always: core files
for (const f of coreFiles) copyItem(f);

// Always: common pages
for (const f of commonPages) copyItem(f);

// Edition-specific: pro pages only for pro edition
if (edition === "pro") {
  for (const f of proPages) copyItem(f);
}

// Update .env with VITE_EDITION
const envPath = join(targetDir, ".env");
if (existsSync(envPath)) {
  let env = readFileSync(envPath, "utf8");
  if (env.includes("VITE_EDITION=")) {
    env = env.replace(/VITE_EDITION=.*/, `VITE_EDITION=${edition}`);
  } else {
    env += `\nVITE_EDITION=${edition}\n`;
  }
  writeFileSync(envPath, env);
  console.log(`  ✓ .env (VITE_EDITION=${edition})`);
}

console.log("Done.");
