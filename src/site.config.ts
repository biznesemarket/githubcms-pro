// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Vite's ImportMeta interface only exposes known VITE_* vars via ImportMetaEnv.
// `as any` gives us dynamic access to arbitrary env keys (SSR + browser compat).
const viteEnv = (typeof import.meta !== "undefined" ? (import.meta as any).env : undefined) as Record<string, string> | undefined;
function env(key: string, fallback: string): string {
  if (viteEnv?.[key]) return viteEnv[key];
  if (typeof process !== "undefined" && process.env[key]) return process.env[key];
  return fallback;
}
const currentLocale = viteEnv?.VITE_LOCALE ?? (typeof process !== "undefined" ? process.env.VITE_LOCALE : undefined) ?? "ru";
const isRu = currentLocale === "ru";
const currentEdition = viteEnv?.VITE_EDITION ?? (typeof process !== "undefined" ? process.env.VITE_EDITION : undefined) ?? "free";
const isPro = currentEdition === "pro";
const isFree = !isPro;

export const siteConfig = {
  // Core — site identity
  name: "GitHub CMS",
  description: isRu
    ? "Статический сайт с AI-видимостью из коробки. Markdown → JSON-LD → деплой за 2 минуты."
    : "Static site with AI visibility out of the box. Markdown → JSON-LD → deploy in 2 minutes.",
  url: viteEnv?.VITE_SITE_URL || (typeof process !== "undefined" ? process.env.VITE_SITE_URL : undefined) || (typeof process !== "undefined" ? process.env.SITE_URL : undefined) || "https://example.com",
  // Default Open Graph image — falls back to this URL for pages without cover_image.
  // TODO: add a local fallback (e.g., /images/default-og.png) in case pixinlink is unreachable.
  defaultImage: "https://pixinlink.ru/api/v1/1200x630/github-cms-static-site-generator-ai-visibility",
  locale: currentLocale,
  edition: currentEdition,
  isPro,
  isFree,

  // Language domains for switch links — derived from VITE_SITE_URL by swapping .com ↔ .ru
  ruDomain: viteEnv?.VITE_RU_DOMAIN || (viteEnv?.VITE_SITE_URL ? viteEnv.VITE_SITE_URL.replace(/\.com$/, ".ru") : "https://example.ru"),
  enDomain: viteEnv?.VITE_EN_DOMAIN || (viteEnv?.VITE_SITE_URL ? viteEnv.VITE_SITE_URL.replace(/\.ru$/, ".com") : "https://example.com"),

  // Payment — terminal key injected at build time via window.TINKOFF_TERMINAL_KEY
  // ⚠️ SECURITY: do NOT use VITE_ prefix for payment credentials.
  // The key is read from process.env at SSR time and injected into HTML via build-locale.mjs.
  // Client-side uses window.TINKOFF_TERMINAL_KEY (set by injected <script> tag).
  tinkoffTerminalKey: (typeof window !== "undefined" ? (window as any).TINKOFF_TERMINAL_KEY : "") || process.env.TINKOFF_TERMINAL_KEY || "",

  // Organization (JSON-LD — overridable via env vars, else neutral placeholders)
  // ⚠️ Real company data must come from env vars (ORG_NAME, ORG_INN, ...) — never
  // hardcode production org details in the template.
  orgType: "Organization",
  orgName: env("ORG_NAME", "Your Company"),
  orgLegalName: env("ORG_LEGAL_NAME", "Your Company LLC"),
  logoUrl: "/images/logo-200x40.png",
  foundingDate: "2025",
  inn: env("ORG_INN", ""),
  kpp: env("ORG_KPP", ""),
  addressLegal: env("ORG_ADDRESS", ""),

  // Contacts (JSON-LD ContactPoint)
  phone1: env("ORG_PHONE", ""),
  email1: env("ORG_EMAIL", ""),

  // Local Business (from site-setup.txt Section 7.5)
  stores: [] as {
    name: string;
    storeType?: string;
    address: string;
    lat?: string;
    lng?: string;
    phone?: string;
    hours?: string;
    image?: string;
  }[],
  priceRange: env("ORG_PRICE_RANGE", ""),
  currenciesAccepted: env("ORG_CURRENCY", "RUB"),
  paymentAccepted: env("ORG_PAYMENT", "Online"),
  areaServed: env("ORG_AREA_SERVED", ""),

  // Social links (JSON-LD sameAs — from site-setup.txt Section 9)
  socialLinks: [
    "https://github.com/hubcms-dot/githubcms",
  ],

  // Content-Security-Policy (CSP) — injected into index.html at build time by
  // plugins/csp.mjs. Extend `*Src` arrays with your own domains (payment
  // providers, CDNs, analytics, etc.). See docs/security/csp-policy.md.
  csp: {
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://*.t-static.ru",
      "https://*.tbank.ru",
      "https://*.tinkoff.ru",
      "https://*.tcsbank.ru",
      "https://*.nspk.ru",
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://*.tinkoff.ru",
      "https://*.tbank.ru",
      "https://*.tcsbank.ru",
      "https://*.nspk.ru",
      "https://*.t-static.ru",
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https:",
      "https://pixinlink.ru",
      "https://pixinlink.com",
      "https://*.tinkoff.ru",
      "https://*.tbank.ru",
    ],
    connectSrc: [
      "'self'",
      "https://*.t-static.ru",
      "https://*.tinkoff.ru",
      "https://*.tbank.ru",
      "https://*.tcsbank.ru",
      "https://*.nspk.ru",
    ],
    frameSrc: ["https://*.tbank.ru", "https://*.tinkoff.ru"],
    other: {
      "default-src": "'none'",
      "manifest-src": "'self'",
      "base-uri": "'self'",
    },
  },
};
