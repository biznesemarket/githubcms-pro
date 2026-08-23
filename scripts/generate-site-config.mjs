/**
 * Generates src/generated/site-config.json — the single source of truth for
 * site-wide SEO config used by scripts/seo/page-meta.mjs and
 * scripts/inject-seo.mjs.
 *
 * Values come from env vars (with neutral, safe defaults — no real-company
 * data). In production, SITE_URL and ORG_* MUST be provided (validate-deploy-env
 * enforces this).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadProjectEnv } from "./shared/load-env.mjs";

loadProjectEnv();

function env(key, fallback = "") {
  return process.env[key] || fallback;
}

const rootDir = join(import.meta.dirname, "..");
const outputDir = join(rootDir, "src", "generated");

const locale = process.env.VITE_LOCALE || "ru";
const isRu = locale === "ru";

const siteUrl = env("VITE_SITE_URL") || env("SITE_URL") || "https://example.com";
const normalizedUrl = siteUrl.replace(/\/+$/, "");
const ruDomain =
  env("VITE_RU_DOMAIN") ||
  (normalizedUrl.includes(".ru") ? normalizedUrl : normalizedUrl.replace(/\.com$/, ".ru"));
const enDomain =
  env("VITE_EN_DOMAIN") ||
  (normalizedUrl.includes(".com") ? normalizedUrl : normalizedUrl.replace(/\.ru$/, ".com"));

const siteConfig = {
  siteUrl: normalizedUrl,
  siteName: "GitHub CMS",
  siteDescription: isRu
    ? "Статический сайт с AI-видимостью из коробки. Markdown → JSON-LD → деплой за 2 минуты."
    : "Static site with AI visibility out of the box. Markdown → JSON-LD → deploy in 2 minutes.",
  defaultImage: env(
    "VITE_DEFAULT_OG_IMAGE",
    "https://pixinlink.ru/api/v1/1200x630/github-cms-static-site-generator-ai-visibility",
  ),
  locale,
  isRu,
  ruDomain,
  enDomain,
  alternateUrl: isRu ? enDomain : ruDomain,
  org: {
    name: env("ORG_NAME", "Your Company"),
    legalName: env("ORG_LEGAL_NAME", "Your Company LLC"),
    inn: env("ORG_INN", ""),
    kpp: env("ORG_KPP", ""),
    address: env("ORG_ADDRESS", ""),
    phone: env("ORG_PHONE", ""),
    email: env("ORG_EMAIL", ""),
    areaServed: env("ORG_AREA_SERVED", "Russia"),
    sameAs: [
      "https://github.com/hubcms-dot/githubcms",
    ],
  },
  // CSP directives — extended via env vars (CSP_SCRIPT_SRC, CSP_STYLE_SRC,
  // CSP_IMG_SRC, CSP_CONNECT_SRC, CSP_FRAME_SRC as space/comma-separated lists).
  csp: {
    scriptSrc: (env("CSP_SCRIPT_SRC") || "https://*.t-static.ru https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru").split(/[\s,]+/),
    styleSrc: (env("CSP_STYLE_SRC") || "https://*.tinkoff.ru https://*.tbank.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru").split(/[\s,]+/),
    imgSrc: (env("CSP_IMG_SRC") || "https: https://pixinlink.ru https://pixinlink.com https://*.tinkoff.ru https://*.tbank.ru").split(/[\s,]+/),
    connectSrc: (env("CSP_CONNECT_SRC") || "https://*.t-static.ru https://*.tinkoff.ru https://*.tbank.ru https://*.tcsbank.ru https://*.nspk.ru").split(/[\s,]+/),
    frameSrc: (env("CSP_FRAME_SRC") || "https://*.tbank.ru https://*.tinkoff.ru").split(/[\s,]+/),
  },
};

mkdirSync(outputDir, { recursive: true });
writeFileSync(
  join(outputDir, "site-config.json"),
  JSON.stringify(siteConfig, null, 2),
  "utf8",
);
console.log(`Generated site-config.json for locale "${locale}" → ${normalizedUrl}`);
