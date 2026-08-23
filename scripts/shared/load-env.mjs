import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Load .env file into process.env (does NOT override existing vars).
 * Shared across inject-seo, generate-seo-files, generate-rss, build-locale.
 */
export function loadEnvFile(envPath) {
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

/** Load .env from project root — one-liner for scripts. */
export function loadProjectEnv() {
  loadEnvFile(join(process.cwd(), ".env"));
}
