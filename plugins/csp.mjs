/**
 * Vite plugin: injects the Content-Security-Policy meta tag into index.html at
 * build time from src/generated/site-config.json (produced by
 * scripts/generate-site-config.mjs).
 *
 * The index.html must contain a placeholder CSP meta tag (or none at all) —
 * this plugin replaces/inserts the real policy. Extend the CSP by setting
 * CSP_* env vars or editing the `csp` block in src/site.config.ts.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

function loadCspConfig() {
  try {
    const path = join(process.cwd(), "src", "generated", "site-config.json");
    const cfg = JSON.parse(readFileSync(path, "utf8"));
    return cfg.csp || {};
  } catch {
    return {};
  }
}

function buildCspString(csp) {
  const directives = {
    "default-src": ["'none'"],
    "script-src": ["'self'", "'unsafe-inline'", ...(csp.scriptSrc || [])],
    "style-src": ["'self'", "'unsafe-inline'", ...(csp.styleSrc || [])],
    "img-src": ["'self'", "data:", ...(csp.imgSrc || [])],
    "connect-src": ["'self'", ...(csp.connectSrc || [])],
    "frame-src": csp.frameSrc || [],
    "manifest-src": ["'self'"],
    "base-uri": ["'self'"],
  };
  return Object.entries(directives)
    .filter(([, values]) => values.length > 0)
    .map(([name, values]) => `${name} ${values.join(" ")}`)
    .join("; ");
}

export default function cspPlugin() {
  return {
    name: "csp-inject",
    transformIndexHtml(html) {
      const csp = loadCspConfig();
      const policy = buildCspString(csp);
      const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}" />`;
      const existing = /<meta[^>]*http-equiv="Content-Security-Policy"[^>]*>/i;
      if (existing.test(html)) {
        return html.replace(existing, meta);
      }
      return html.replace(/<head[^>]*>/i, (match) => `${match}\n    ${meta}`);
    },
  };
}
