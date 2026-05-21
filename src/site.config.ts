// eslint-disable-next-line @typescript-eslint/no-explicit-any
const viteEnv = (typeof import.meta !== "undefined" ? (import.meta as any).env : undefined) as Record<string, string> | undefined;
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
  url: viteEnv?.VITE_SITE_URL || (typeof process !== "undefined" ? process.env.VITE_SITE_URL : undefined) || (typeof process !== "undefined" ? process.env.SITE_URL : undefined) || "https://githubcms.com",
  defaultImage: "https://pixinlink.ru/api/v1/1200x630/github-cms-static-site-generator-ai-visibility",
  locale: currentLocale,
  edition: currentEdition,
  isPro,
  isFree,

  // Language domains for switch links
  ruDomain: viteEnv?.VITE_RU_DOMAIN || "https://githubcms.ru",
  enDomain: viteEnv?.VITE_EN_DOMAIN || "https://githubcms.com",

  tinkoffTerminalKey: (typeof import.meta !== "undefined" && import.meta.env?.VITE_TINKOFF_TERMINAL_KEY) || process.env.VITE_TINKOFF_TERMINAL_KEY || "",

  // Organization (JSON-LD — from site-setup.txt Sections 1-3)
  orgType: "Organization",
  orgName: "ООО «ФОНИИ»",
  orgLegalName: "ООО «ФОНИИ»",
  logoUrl: "/images/logo-200x40.png",
  foundingDate: "2025",
  inn: "7720943604",
  kpp: "772001001",
  addressLegal: "111141, г. Москва, пр-кт Зелёный, д 3а, стр. 1",

  // Contacts (JSON-LD ContactPoint — from site-setup.txt Section 3)
  phone1: "+7 (495) 324-30-88",
  email1: "info@fonai.ru",

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
  priceRange: "от 0 до 49000 ₽",
  currenciesAccepted: "RUB",
  paymentAccepted: "Online",
  areaServed: "Россия, СНГ",

  // Social links (JSON-LD sameAs — from site-setup.txt Section 9)
  socialLinks: [
    "https://vk.com/githubcrm",
    "https://t.me/githubcrm",
    "https://youtube.com/@githubcrm",
    "https://github.com/hubcms-dot/githubcms",
  ],
};
