import { execSync } from "node:child_process";
import { renameSync, rmSync, existsSync } from "node:fs";

const locale = process.argv[2] || "ru";
process.env.VITE_LOCALE = locale;
process.env.VITE_EDITION = process.env.VITE_EDITION || "pro";

// Set site URL based on locale
if (locale === "ru") {
  process.env.VITE_SITE_URL = process.env.VITE_SITE_URL_RU || "https://githubcms.ru";
  process.env.OUT_DIR = process.env.OUT_DIR || "dist-ru";
} else {
  process.env.VITE_SITE_URL = process.env.VITE_SITE_URL_EN || "https://githubcms.com";
  process.env.OUT_DIR = process.env.OUT_DIR || "dist-en";
}

console.log(`Building for locale: ${locale} → ${process.env.VITE_SITE_URL} → ${process.env.OUT_DIR}`);

try {
  execSync("npm run build", {
    stdio: "inherit",
    env: {
      ...process.env,
      VITE_LOCALE: locale,
      VITE_SITE_URL: process.env.VITE_SITE_URL,
    },
  });
  // Move dist to locale-specific directory
  if (existsSync(process.env.OUT_DIR)) rmSync(process.env.OUT_DIR, { recursive: true, force: true });
  renameSync("dist", process.env.OUT_DIR);
  console.log(`Build success: ${locale} → ${process.env.OUT_DIR}`);
} catch (error) {
  console.error(`Build FAILED for locale: ${locale}`);
  console.error(error.message?.slice(0, 200) || error);
  process.exit(1);
}
