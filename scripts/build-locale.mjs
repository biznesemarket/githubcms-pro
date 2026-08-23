import { execSync } from "node:child_process";
import { renameSync, rmSync, existsSync, copyFileSync, readdirSync, statSync, mkdirSync, unlinkSync, rmdirSync } from "node:fs";
import { resolve, relative } from "node:path";

const projectRoot = resolve(process.cwd());
const locale = process.argv[2] || "ru";
if (!["ru", "en"].includes(locale)) {
  console.error(`Invalid locale: "${locale}". Expected "ru" or "en".`);
  process.exit(1);
}
process.env.VITE_LOCALE = locale;
process.env.VITE_EDITION = process.env.VITE_EDITION || "pro";

// Set site URL based on locale — must come from env (no real-domain defaults).
if (locale === "ru") {
  process.env.VITE_SITE_URL = process.env.VITE_SITE_URL_RU || process.env.VITE_SITE_URL || "https://example.ru";
  process.env.OUT_DIR = process.env.OUT_DIR || "dist-ru";
} else {
  process.env.VITE_SITE_URL = process.env.VITE_SITE_URL_EN || process.env.VITE_SITE_URL || "https://example.com";
  process.env.OUT_DIR = process.env.OUT_DIR || "dist-en";
}

// Validate OUT_DIR to prevent path traversal
const outDir = resolve(process.env.OUT_DIR);
const rel = relative(projectRoot, outDir);
if (rel.startsWith("..") || rel === "" || rel === projectRoot) {
  console.error(`Security: OUT_DIR (${outDir}) is outside project root (${projectRoot}).`);
  process.exit(1);
}

function moveDist(src, dest) {
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  // On Windows, Vite SSG may hold a file lock on dist/ for a brief moment.
  // Retry rename up to 5 times before falling back to copy-tree.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      renameSync(src, dest);
      return;
    } catch (e) {
      if (e.code !== "EPERM" && e.code !== "EBUSY") throw e;
    }
    execSync("timeout /t 1 /nobreak >nul 2>&1 || sleep 1", { stdio: "ignore" });
  }
  // Fallback: copy + delete
  copyTree(src, dest);
  rmSync(src, { recursive: true, force: true });
}

function copyTree(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = `${src}/${entry}`;
    const destPath = `${dest}/${entry}`;
    if (statSync(srcPath).isDirectory()) {
      copyTree(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

console.log(`Building for locale: ${locale} → ${process.env.VITE_SITE_URL} → ${process.env.OUT_DIR}`);

try {
  execSync("npm run build", {
    stdio: "inherit",
    env: {
      ...process.env,
      VITE_LOCALE: locale,
      VITE_SITE_URL: process.env.VITE_SITE_URL,
      VITE_EDITION: process.env.VITE_EDITION,
    },
  });
  // Move dist to locale-specific directory
  moveDist("dist", outDir);
  // Copy PHP API proxy into dist
  const apiSrc = resolve(projectRoot, "public/api");
  const apiDest = resolve(outDir, "api");
  if (existsSync(apiSrc)) {
    copyTree(apiSrc, apiDest);
    console.log(`Copied public/api → ${outDir}/api`);
  }
  console.log(`Build success: ${locale} → ${outDir}`);
} catch (error) {
  console.error(`Build FAILED for locale: ${locale}`);
  console.error(error.message?.slice(0, 200) || error);
  process.exit(1);
}
