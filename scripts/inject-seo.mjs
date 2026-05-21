import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { slugify } from "./shared/slugify.mjs";

function loadEnvFile(envPath) {
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

loadEnvFile(join(process.cwd(), ".env"));

function loadArticles() {
  const generatedPath = join(process.cwd(), "src", "generated", "articles.ts");
  const source = readFileSync(generatedPath, "utf8");
  const match = source.match(/export const articles = (\[[\s\S]*\])\s*as const/);
  if (!match) throw new Error("Could not parse articles.ts");
  return JSON.parse(match[1]);
}

function loadPages() {
  const generatedPath = join(process.cwd(), "src", "generated", "pages.ts");
  if (!existsSync(generatedPath)) return [];
  const source = readFileSync(generatedPath, "utf8");
  const match = source.match(/export const pages = (\[[\s\S]*\])\s*as const/);
  if (!match) return [];
  return JSON.parse(match[1]);
}

const articles = loadArticles();
const sitePages = loadPages();
const pages = loadPages();

const locale = process.env.VITE_LOCALE || "ru";
const isRu = locale === "ru";
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || "https://githubcms.com").replace(/\/+$/, "");
const alternateUrl = siteUrl.includes("githubcms.ru") ? siteUrl.replace("githubcms.ru", "githubcms.com") : siteUrl.replace("githubcms.com", "githubcms.ru");
const siteName = "GitHub CMS";
const siteDescription = isRu
  ? "Статический сайт с AI-видимостью из коробки. Markdown → JSON-LD → деплой за 2 минуты."
  : "Static site with AI visibility out of the box. Markdown → JSON-LD → deploy in 2 minutes.";
const defaultImage = `https://pixinlink.ru/api/v1/1200x630/github-cms`;
const bcHome = isRu ? "Главная" : "Home";
const bcBlog = isRu ? "Блог" : "Blog";

function buildOrgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ООО «ФОНИИ»",
    legalName: "ООО «ФОНИИ»",
    url: siteUrl,
    logo: siteUrl + "/images/logo-200x40.png",
    foundingDate: "2025",
    taxID: "7720943604",
    vatID: "772001001",
    address: { "@type": "PostalAddress", streetAddress: "111141, г. Москва, пр-кт Зелёный, д 3а, стр. 1", addressCountry: "RU" },
    contactPoint: { "@type": "ContactPoint", telephone: "+7 (495) 324-30-88", email: "info@fonai.ru", contactType: "Customer Service", areaServed: "Россия, СНГ", availableLanguage: ["ru"] },
    sameAs: ["https://vk.com/githubcrm", "https://t.me/githubcrm", "https://youtube.com/@githubcrm", "https://github.com/hubcms-dot/githubcms"],
  };
}

function orgBlock() {
  return buildOrgJsonLd();
}

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildBreadcrumbList(article) {
  const items = [
    { "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" },
    { "@type": "ListItem", position: 2, name: bcBlog, item: siteUrl + "/blog/" },
  ];

  const cat = article.frontmatter.category;
  if (cat) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: cat,
      item: `${siteUrl}/category/${slugify(cat)}/`,
    });
    items.push({
      "@type": "ListItem",
      position: 4,
      name: article.frontmatter.title,
    });
  } else {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: article.frontmatter.title,
    });
  }

  return items;
}

function detectFaqFromHtml(html) {
  const items = [];
  // Pattern 1: Bootstrap accordion FAQ
  const accordionRegex = /<button[^>]*data-bs-[^>]*>[^<]*([\s\S]*?)<\/button>[\s\S]*?<div[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = accordionRegex.exec(html)) !== null) {
    const q = m[1].replace(/<[^>]+>/g, "").trim();
    const a = m[2].replace(/<[^>]+>/g, "").trim();
    if (q && a && q.length > 5 && a.length > 10) items.push({ question: q, answer: a });
  }
  // Pattern 2: Markdown **Q:** / **A:**
  const mdFaqRegex = /\*\*Q:\s*(.+?)\*\*\s*([\s\S]*?)(?=\*\*Q:\s*|<\/)/gi;
  while ((m = mdFaqRegex.exec(html)) !== null) {
    const q = m[1].trim();
    const a = m[2].replace(/^\s*\*\*A:\s*\*\*?\s*/i, "").replace(/<[^>]+>/g, "").trim();
    if (q && a && q.length > 5 && a.length > 15) items.push({ question: q, answer: a });
  }
  // Pattern 3: Section-based FAQ with strong/em + paragraph pairs
  if (items.length < 3) {
    const faqSectionRegex = /<(?:section|div)[^>]*id="faq"[^>]*>([\s\S]*?)<\/(?:section|div)>/i;
    const faqSection = html.match(faqSectionRegex)?.[1];
    if (faqSection) {
      const qaRegex = /<(?:strong|h[34])[^>]*>([^<]+)<\/(?:strong|h[34])>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
      let m;
      while ((m = qaRegex.exec(faqSection)) !== null) {
        const q = m[1].replace(/<[^>]+>/g, "").trim();
        const a = m[2].replace(/<[^>]+>/g, "").trim();
        if (q && a && q.length > 5 && a.length > 15 && !items.some(i => i.question === q)) {
          items.push({ question: q, answer: a });
        }
      }
    }
  }
  // Pattern 4: Raw HTML Q:/A: pattern (section article raw HTML)
  if (items.length < 3) {
    const rawFaqRegex = /<(?:strong|b)[^>]*>Q:\s*<\/\1>\s*<(?:p|div)[^>]*>([\s\S]*?)<\/(?:p|div)>\s*<(?:strong|b)[^>]*>A:\s*<\/\1>\s*<(?:p|div)[^>]*>([\s\S]*?)<\/(?:p|div)>/gi;
    let m;
    while ((m = rawFaqRegex.exec(html)) !== null) {
      const q = m[1].replace(/<[^>]+>/g, "").trim();
      const a = m[2].replace(/<[^>]+>/g, "").trim();
      if (q && a && q.length > 5 && a.length > 15 && !items.some(i => i.question === q)) {
        items.push({ question: q, answer: a });
      }
    }
  }
  return items.length >= 3 ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) } : null;
}

// ── Content detectors for inject-seo ──

function detectHowToFromHtml(html) {
  const steps = [];
  const stepCardRegex = /<div[^>]*class="[^"]*step-number[^"]*"[^>]*>([^<]+)<\/div>\s*(?:<h[34][^>]*>([^<]+)<\/h[34]>\s*)?<p[^>]*>([^<]+)<\/p>/gi;
  let m;
  while ((m = stepCardRegex.exec(html)) !== null) {
    const name = m[2]?.trim() || `Шаг ${m[1].trim()}`;
    steps.push({ name, text: m[3].trim() });
  }
  if (steps.length >= 3) {
    const titleMatch = html.match(/<h[12][^>]*>([^<]*)<\/h[12]>/i);
    return { "@context": "https://schema.org", "@type": "HowTo", name: titleMatch?.[1]?.trim() || "Инструкция", step: steps.map((s, i) => ({ "@type": "HowToStep", position: String(i + 1), name: s.name, text: s.text })) };
  }
  return null;
}

function detectItemListFromHtml(html) {
  const items = [];
  const factRegex = /<div[^>]*class="[^"]*fact-number[^"]*"[^>]*>([^<]+)<\/div>\s*<div[^>]*class="[^"]*fact-text[^"]*"[^>]*>([^<]+)<\/div>/gi;
  let m;
  while ((m = factRegex.exec(html)) !== null) {
    items.push({ name: `${m[1].trim()} — ${m[2].trim()}` });
  }
  if (items.length >= 3) {
    return { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name })) };
  }
  return null;
}

function detectQAPageFromHtml(html) {
  const featuredRegex = /<div[^>]*class="[^"]*(featured-snippet|block-answer)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  let m;
  while ((m = featuredRegex.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text.length > 80) {
      const before = html.substring(0, m.index);
      const qMatch = before.match(/<h[234][^>]*>([^<]+\?[^<]*)<\/h[234]>/i);
      return { "@context": "https://schema.org", "@type": "QAPage", mainEntity: { "@type": "Question", name: qMatch?.[1]?.trim() || "Что это?", acceptedAnswer: { "@type": "Answer", text: text.slice(0, 500) } } };
    }
  }
  return null;
}

function detectAllSchemasFromHtml(html) {
  const schemas = [];
  const faq = detectFaqFromHtml(html); if (faq) schemas.push(faq);
  const howto = detectHowToFromHtml(html); if (howto) schemas.push(howto);
  const itemlist = detectItemListFromHtml(html); if (itemlist) schemas.push(itemlist);
  const qapage = detectQAPageFromHtml(html); if (qapage) schemas.push(qapage);
  const review = detectReviewFromHtml(html); if (review) schemas.push(review);
  const definedterm = detectDefinedTermFromHtml(html); if (definedterm.length) schemas.push(...definedterm);
  const imageobject = detectImageObjectFromHtml(html); if (imageobject.length) schemas.push(...imageobject);
  const statistical = detectStatisticalFromHtml(html); if (statistical.length) schemas.push(...statistical);
  const person = detectPersonFromHtml(html); if (person) schemas.push(person);
  const casestudy = detectCaseStudyFromHtml(html); if (casestudy) schemas.push(casestudy);
  const table = detectTableFromHtml(html); if (table.length) schemas.push(...table);
  const video = detectVideoFromHtml(html); if (video.length) schemas.push(...video);
  const planaction = detectPlanActionFromHtml(html); if (planaction) schemas.push(planaction);
  const webapp = detectWebAppFromHtml(html); if (webapp) schemas.push(webapp);
  const citation = detectCitationFromHtml(html); if (citation) schemas.push(citation);
  const methodology = detectMethodologyFromHtml(html); if (methodology) schemas.push(methodology);
  return schemas;
}

// ── REVIEW detector ──
function detectReviewFromHtml(html) {
  const reviews = [];
  const starRegex = /(★{1,5})/g; let m;
  while ((m = starRegex.exec(html)) !== null) {
    const rating = m[1].length;
    const after = html.substring(m.index + m[0].length, m.index + m[0].length + 400);
    const nm = after.match(/([А-ЯA-Z][а-яa-z]+\s+[А-ЯA-Z][а-яa-z]+)/);
    const tm = after.match(/[^.!?]{20,150}[.!?]/);
    if (nm && tm) reviews.push({ a: nm[1], r: rating, t: tm[0].trim(), d: new Date().toISOString().slice(0,10) });
  }
  if (reviews.length >= 1) {
    const avg = (reviews.reduce((s,r)=>s+r.r,0)/reviews.length).toFixed(1);
    return { "@context":"https://schema.org","@type":"AggregateRating", ratingValue: avg, bestRating:"5", worstRating:"1", ratingCount: String(reviews.length), reviewCount: String(reviews.length), review: reviews.map(r=>({ "@type":"Review", author:{ "@type":"Person", name: r.a }, reviewRating:{ "@type":"Rating", ratingValue: String(r.r) }, reviewBody: r.t, datePublished: r.d })) };
  }
  return null;
}

// ── DEFINEDTERM detector ──
function detectDefinedTermFromHtml(html) {
  const results = []; const re = /<h3[^>]*>([^<]{5,60})<\/h3>\s*<p[^>]*>([^<]{30,300})<\/p>/gi; let m, c=0;
  while ((m=re.exec(html))!==null&&c<5) {
    const t=m[1].trim(), d=m[2].replace(/<[^>]+>/g,"").trim();
    if (t&&d&&!/^[0-9.\s]+$/.test(t)){ results.push({"@context":"https://schema.org","@type":"DefinedTerm",name:t,description:d}); c++; }
  }
  return results;
}

// ── IMAGEOBJECT detector ──
function detectImageObjectFromHtml(html) {
  const results = []; const re = /<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"[^>]*>/gi; let m, c=0;
  while ((m=re.exec(html))!==null&&c<3) {
    const s=m[1], a=m[2]||"Изображение";
    if (s&&a.length>5&&s.startsWith("http")) { results.push({"@context":"https://schema.org","@type":"ImageObject",name:a.slice(0,80),url:s,description:a.slice(0,120),contentUrl:s,encodingFormat:"image/png"}); c++; }
  }
  return results;
}

// ── STATISTICAL detector ──
function detectStatisticalFromHtml(html) {
  const clean = html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim(); const results = [];
  const re = /(\d+(?:[.,]\d+)?)\s*%(?:\s+([^.]{10,150}?(?:\([^)]*\d{4}[^)]*\)|по данным\s+[^.]+)))/gi; let m, c=0;
  while ((m=re.exec(clean))!==null&&c<3) {
    const v=Number.parseFloat(m[1].replace(",",".")), t=m[2].trim().replace(/\s+/g," ");
    if (v>0&&v<=100&&t.length>10&&t.length<200) { results.push({"@context":"https://schema.org","@type":"StatisticalVariable",name:t.slice(0,80),value:{"@type":"QuantitativeValue",value:v,unitText:"percent"},citation:{"@type":"Citation",text:t.slice(0,120)}}); c++; }
  }
  return results;
}

// ── PERSON detector ──
function detectPersonFromHtml(html) {
  const m = html.match(/(?:Автор|author)[:\s]*<[^>]*>([^<]+)<\/[^>]*>/i) || html.match(/(?:Автор|author)[:\s]*([А-ЯA-Z][а-яa-z]+\s+[А-ЯA-Z][а-яa-z]+)/);
  if (!m) return null;
  return {"@context":"https://schema.org","@type":"Person",name:m[1].trim(),affiliation:{"@type":"Organization",name:siteName}};
}

// ── CASESTUDY detector ──
function detectCaseStudyFromHtml(html) {
  if (!/(кейс|case\s*study|внедрен|миграц)/i.test(html)) return null;
  const cm = html.match(/(?:клиент|заказчик|компани[яи]|customer|client)[:\s]*"?([А-ЯA-Z][^"<,\n]{3,50})/i);
  if (!cm) return null;
  const pm = html.match(/(?:проблем[аы]|problem)[:\s]([^.<\n]{15,150})/i);
  const rm = html.match(/(?:результат|result|итог|экономия|сократили|увеличили)[:\s]*([^.<\n]{10,150})/i);
  return {"@context":"https://schema.org","@type":"CaseStudy",headline:"Кейс внедрения",about:{"@type":"Organization",name:cm[1].trim()},problem:pm?.[1]?.trim()||"Оптимизация",solution:"Решение внедрено",result:rm?.[1]?.trim()||"Положительный результат"};
}

// ── TABLE detector ──
function detectTableFromHtml(html) {
  const tables = html.match(/<table[^>]*>[\s\S]*?<\/table>/gi); if (!tables?.length) return [];
  return tables.map(t => { const h=[]; const hr=/<th[^>]*>([^<]+)<\/th>/gi; let m; while ((m=hr.exec(t))!==null) h.push(m[1].trim());
    return h.length>=2 ? {"@context":"https://schema.org","@type":"Table",name:"Сравнение: "+h.slice(1,4).join(" vs ")} : null; }).filter(Boolean);
}

// ── VIDEO detector ──
function detectVideoFromHtml(html) {
  const results = []; const re = /<(?:iframe[^>]+src="(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|vimeo\.com)[^"]*)"|<video[^>]*src="([^"]*)")[^>]*>/gi; let m;
  while ((m=re.exec(html))!==null) { const u=m[1]||m[2]; if (u) results.push({"@context":"https://schema.org","@type":"VideoObject",name:"Видео",description:"Видео на странице",contentUrl:u,uploadDate:new Date().toISOString().slice(0,10)}); }
  return results;
}

// ── PLANACTION detector ──
function detectPlanActionFromHtml(html) {
  const phases = []; const re = /(?:Phase\s+|Этап\s+|Q[1-4]\s*[-–]\s*Q[1-4]\s*)(\d{4})?[:\s]*([^<]{10,80})/gi; let m;
  while ((m=re.exec(html))!==null) { if (m[2]?.trim().length>5) phases.push({phase:m[2].trim(),period:m[1]||"2025-2026",actions:m[2].trim(),results:"Результат запланирован"}); }
  if (phases.length>=2) return {"@context":"https://schema.org","@type":"PlanAction",name:"Roadmap",step:phases.map((p,i)=>({"@type":"OrganizeAction",position:i+1,name:p.phase,startTime:p.period,description:p.actions,result:p.results}))};
  return null;
}

// ── WEBAPP detector ──
function detectWebAppFromHtml(html) {
  if (!/(калькулятор|calculator|вычислит|расчёт|конфигуратор)/i.test(html)) return null;
  const nm = html.match(/<h[12][^>]*>([^<]*(?:калькулятор|calculator)[^<]*)<\/h[12]>/i);
  return {"@context":"https://schema.org","@type":"WebApplication",name:nm?.[1]?.trim()||"Калькулятор",applicationCategory:"UtilityApplication",offers:{"@type":"Offer",price:"0",priceCurrency:"RUB"},operatingSystem:"Web"};
}

// ── CITATION detector ──
function detectCitationFromHtml(html) {
  const sources = []; const re = /\[([^\]]{5,80})\]/g; let m, c=0;
  while ((m=re.exec(html))!==null&&c<5) { const t=m[1].replace(/<[^>]+>/g,"").trim(); if (/\d{4}/.test(t)&&t.length>10) { sources.push({text:t}); c++; } }
  if (sources.length<2) { const dr=/(?:согласно|по данным|according to|based on)\s+([^.<]{10,80})/gi; while ((m=dr.exec(html))!==null) sources.push({text:m[1].trim()}); }
  if (sources.length>=2) return {"@context":"https://schema.org","@type":"ScholarlyArticle",citation:sources.map(s=>({"@type":"Citation",text:s.text}))};
  return null;
}

// ── METHODOLOGY detector ──
function detectMethodologyFromHtml(html) {
  if (!/(методолог|methodology|как мы |how we |источник|первичный опыт)/i.test(html)) return null;
  const mm = html.match(/(?:методология|methodology|как мы (?:это |проверя|созда|исследу))[:\s]+([^.<]{30,300})/i);
  if (!mm) return null;
  return {"@context":"https://schema.org","@type":"ScholarlyArticle",name:siteName,methodology:mm[1].replace(/<[^>]+>/g,"").trim(),inLanguage:"ru"};
}

function renderMetaTags(page) {
  const tags = [];
  const title = page.title === siteName ? siteName : `${page.title} | ${siteName}`;

  tags.push(`<title>${esc(title)}</title>`);
  tags.push(`<meta name="description" content="${esc(page.description)}">`);
  tags.push(`<meta name="robots" content="index,follow">`);
  tags.push(`<meta property="og:site_name" content="${esc(siteName)}">`);
  tags.push(`<meta property="og:locale" content="${isRu ? "ru_RU" : "en_US"}">`);
  if (alternateUrl) {
    tags.push(`<meta property="og:locale:alternate" content="${isRu ? "en_US" : "ru_RU"}">`);
  }
  // hreflang tags for bilingual sites
  if (page.canonical) {
    const otherLocale = isRu ? "en" : "ru";
    const otherUrl = page.canonical.replace(siteUrl, alternateUrl);
    tags.push(`<link rel="alternate" hreflang="${otherLocale}" href="${otherUrl}">`);
    tags.push(`<link rel="alternate" hreflang="${isRu ? "ru" : "en"}" href="${page.canonical}">`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${page.canonical}">`);
  }
  tags.push(`<meta property="og:type" content="${esc(page.type)}">`);
  tags.push(`<meta property="og:title" content="${esc(page.title)}">`);
  tags.push(`<meta property="og:description" content="${esc(page.description)}">`);
  tags.push(`<meta property="og:url" content="${esc(page.canonical)}">`);
  tags.push(`<meta property="og:image" content="${esc(page.image)}">`);
  tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  tags.push(`<meta name="twitter:title" content="${esc(page.title)}">`);
  tags.push(`<meta name="twitter:description" content="${esc(page.description)}">`);
  tags.push(`<meta name="twitter:image" content="${esc(page.image)}">`);

  if (page.publishedTime) tags.push(`<meta property="article:published_time" content="${esc(page.publishedTime)}">`);
  if (page.modifiedTime) tags.push(`<meta property="article:modified_time" content="${esc(page.modifiedTime)}">`);
  if (page.tags?.length) tags.push(`<meta name="keywords" content="${esc(page.tags.join(", "))}">`);

  tags.push(`<link rel="canonical" href="${esc(page.canonical)}">`);
  tags.push(`<link rel="alternate" type="application/rss+xml" title="${esc(siteName)} RSS Feed" href="${esc(siteUrl)}/rss.xml">`);

  if (page.jsonLd) {
    const items = Array.isArray(page.jsonLd) ? page.jsonLd : [page.jsonLd];
    for (const item of items) {
      const ld = JSON.stringify(item).replace(/</g, "\\u003C").replace(/>/g, "\\u003E").replace(/&/g, "\\u0026");
      tags.push(`<script type="application/ld+json">${ld}</script>`);
    }
  }

  return tags.join("\n    ");
}

function collectPageHtmlFiles(dir) {
  const results = [];
  const rootIndex = join(dir, "index.html");
  if (existsSync(rootIndex)) results.push({ file: rootIndex, route: "/" });

  function walk(currentDir, baseRoute) {
    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === "assets") continue;
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, baseRoute + entry.name + "/");
      } else if (entry.name === "index.html" && fullPath !== rootIndex) {
        results.push({ file: fullPath, route: baseRoute });
      }
    }
  }

  walk(dir, "/");
  return results;
}

const pageMeta = [];

// Homepage
pageMeta.push({
  route: "/",
  data: {
    title: siteName,
    description: siteDescription,
    canonical: siteUrl + "/",
    type: "website",
    image: defaultImage,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      description: siteDescription,
      url: siteUrl,
    },
  },
});

// Blog index
pageMeta.push({
  route: "/blog/",
  data: {
    title: "Blog",
    description: `Articles from ${siteName}`,
    canonical: siteUrl + "/blog/",
    type: "website",
    image: defaultImage,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      description: siteDescription,
      url: siteUrl,
    },
  },
});

// Paginated blog pages
const totalBlogPages = Math.ceil(articles.length / 5);
for (let p = 2; p <= totalBlogPages; p++) {
  pageMeta.push({
    route: `/blog/page/${p}/`,
    data: {
      title: `Blog - Page ${p}`,
      description: `Articles from ${siteName} (page ${p})`,
      canonical: `${siteUrl}/blog/`,
      type: "website",
      image: defaultImage,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        description: siteDescription,
        url: siteUrl,
      },
    },
  });
}

// Article pages
for (const article of articles) {
  const slug = article.frontmatter.slug;
  const image = article.frontmatter.cover_image || defaultImage;
  const canonical = `${siteUrl}/blog/${slug}/`;

  pageMeta.push({
    route: `/blog/${slug}/`,
    data: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      canonical,
      type: "article",
      image,
      publishedTime: article.frontmatter.date,
      modifiedTime: article.frontmatter.updated || article.frontmatter.date,
      tags: article.frontmatter.tags || [],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": article.frontmatter.schema_type || "Article",
          headline: article.frontmatter.title,
          description: article.frontmatter.description,
          datePublished: article.frontmatter.date,
          dateModified: article.frontmatter.updated || article.frontmatter.date,
          author: { "@type": "Person", name: article.frontmatter.author },
          image,
          mainEntityOfPage: canonical,
          keywords: (article.frontmatter.tags || []).join(", "),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: buildBreadcrumbList(article),
        },
      ],
    },
  });
}

// Site pages (about, contact, etc.)
for (const p of sitePages) {
  const slug = p.frontmatter.slug;
  const canonical = `${siteUrl}/${slug}/`;

  pageMeta.push({
    route: `/${slug}/`,
    data: {
      title: p.frontmatter.title,
      description: p.frontmatter.description,
      canonical,
      type: "website",
      image: defaultImage,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: p.frontmatter.title,
        description: p.frontmatter.description,
        url: canonical,
      },
    },
  });
}

// Category pages
const categorySet = new Set();
for (const article of articles) {
  const cat = article.frontmatter.category;
  const catSlug = slugify(cat);
  if (!categorySet.has(catSlug)) {
    categorySet.add(catSlug);
    const canonical = `${siteUrl}/category/${catSlug}/`;

    pageMeta.push({
      route: `/category/${catSlug}/`,
      data: {
        title: cat,
        description: `Articles in category "${cat}" from ${siteName}`,
        canonical,
        type: "website",
        image: defaultImage,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Category: ${cat}`,
          description: `Articles in category "${cat}"`,
          url: canonical,
        },
      },
    });
  }
}

// Tag pages
const tagSet = new Set();
for (const article of articles) {
  for (const tag of (article.frontmatter.tags || [])) {
    const tagSlug = slugify(tag);
    if (!tagSet.has(tagSlug)) {
      tagSet.add(tagSlug);
      const canonical = `${siteUrl}/tag/${tagSlug}/`;

      pageMeta.push({
        route: `/tag/${tagSlug}/`,
        data: {
          title: `#${tag}`,
          description: `Articles tagged "${tag}" from ${siteName}`,
          canonical,
          type: "website",
          image: defaultImage,
          jsonLd: {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Tag: ${tag}`,
            description: `Articles tagged "${tag}"`,
            url: canonical,
          },
        },
      });
    }
  }
}

// Templates page
pageMeta.push({
  route: "/templates/",
  data: {
    title: "Templates",
    description: `Premium themes and prompt templates for ${siteName}`,
    canonical: siteUrl + "/templates/",
    type: "website",
    image: defaultImage,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Templates",
      description: `Premium themes for ${siteName}`,
      url: siteUrl + "/templates/",
    },
  },
});

// ── Shop pages (Демо магазин) ──
pageMeta.push({
  route: "/shop/",
  data: {
    title: isRu ? "Демо магазин" : "Demo Shop",
    description: isRu ? `Демонстрационный магазин ${siteName}. 5 разделов с товарами, карточки продуктов, корзина и оплата.` : `${siteName} demo shop. 5 sections with products, product cards, cart and payment.`,
    canonical: siteUrl + "/shop/",
    type: "website",
    image: defaultImage,
    jsonLd: { "@context": "https://schema.org", "@type": "WebPage", name: isRu ? "Демо магазин" : "Demo Shop", url: siteUrl + "/shop/" },
  },
});

const shopSections = isRu ? [
  { route: "/shop/shop-section-1/", title: "Демо раздел товара 1", desc: "Электроника и гаджеты: смартфоны, ноутбуки, планшеты, аксессуары." },
  { route: "/shop/shop-section-2/", title: "Демо раздел товара 2", desc: "Бытовая техника: холодильники, стиральные машины, пылесосы." },
  { route: "/shop/shop-section-3/", title: "Демо раздел товара 3", desc: "Мебель и интерьер: диваны, столы, стулья, шкафы." },
  { route: "/shop/shop-section-4/", title: "Демо раздел товара 4", desc: "Спорт и отдых: тренажёры, велосипеды, снаряжение." },
  { route: "/shop/shop-section-5/", title: "Демо раздел товара 5", desc: "Канцтовары и офис: бумага, ручки, принтеры." },
] : [
  { route: "/shop/shop-section-1/", title: "Electronics", desc: "Smartphones, laptops, tablets, accessories." },
  { route: "/shop/shop-section-2/", title: "Home Appliances", desc: "Refrigerators, washing machines, vacuums." },
  { route: "/shop/shop-section-3/", title: "Furniture", desc: "Sofas, tables, chairs, wardrobes." },
  { route: "/shop/shop-section-4/", title: "Sports & Outdoors", desc: "Treadmills, bicycles, gear." },
  { route: "/shop/shop-section-5/", title: "Stationery & Office", desc: "Paper, pens, organizers, printers." },
];
for (const ss of shopSections) {
  const parentRoute = "/shop/";
  pageMeta.push({
    route: ss.route,
    data: {
      title: ss.title,
      description: ss.desc,
      canonical: siteUrl + ss.route,
      type: "website",
      image: defaultImage,
      jsonLd: [
        { "@context": "https://schema.org", "@type": "WebPage", name: ss.title, description: ss.desc, url: siteUrl + ss.route },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: "Демо магазин", item: siteUrl + parentRoute }, { "@type": "ListItem", position: 3, name: ss.title }] },
      ],
    },
  });
}

// ── Section landing pages (RazdelPage) ──
const sectionLandings = isRu ? [
  { route: "/section-geo/", title: "GEO / AI-видимость", desc: "Generative Engine Optimization — оптимизация сайта для AI-поисковиков", slug: "section-geo" },
  { route: "/section-devops/", title: "DevOps / Деплой", desc: "Полный цикл развёртывания статического сайта: VPS, nginx, CI/CD", slug: "section-devops" },
  { route: "/section-content/", title: "Контент / Markdown", desc: "Создание и управление контентом: Markdown, YAML Frontmatter, AI-генерация", slug: "section-content" },
] : [
  { route: "/section-geo/", title: "GEO / AI Visibility", desc: "Generative Engine Optimization — optimizing your site for AI search engines", slug: "section-geo" },
  { route: "/section-devops/", title: "DevOps / Deploy", desc: "Complete static site deployment cycle: VPS, nginx, CI/CD", slug: "section-devops" },
  { route: "/section-content/", title: "Content / Markdown", desc: "Content creation and management: Markdown, YAML Frontmatter, AI generation", slug: "section-content" },
];
for (const sl of sectionLandings) {
  pageMeta.push({
    route: sl.route,
    data: {
      title: sl.title,
      description: sl.desc,
      canonical: siteUrl + sl.route,
      type: "website",
      image: defaultImage,
      jsonLd: [
        { "@context": "https://schema.org", "@type": "WebPage", name: sl.title, description: sl.desc, url: siteUrl + sl.route },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: sl.title }] },
      ],
    },
  });
}

// ── Section article pages ──
const sectionArticles = isRu ? [
  { route: "/section-geo/geo-rukovodstvo/", title: "GEO-руководство", desc: "Как статические сайты попадают в ответы ChatGPT", parent: "section-geo", parentName: "GEO / AI-видимость" },
  { route: "/section-geo/json-ld-gajd/", title: "JSON-LD микроразметка", desc: "Полный гайд по 10 типам Schema.org", parent: "section-geo", parentName: "GEO / AI-видимость" },
  { route: "/section-geo/e-e-a-t-signaly/", title: "E-E-A-T сигналы", desc: "Как AI проверяет авторитетность", parent: "section-geo", parentName: "GEO / AI-видимость" },
  { route: "/section-geo/featured-snippets/", title: "Featured Snippets", desc: "Структура прямых ответов для AI", parent: "section-geo", parentName: "GEO / AI-видимость" },
  { route: "/section-geo/seo-vs-geo/", title: "SEO vs GEO", desc: "Почему классическое SEO теряет аудиторию", parent: "section-geo", parentName: "GEO / AI-видимость" },
  { route: "/section-devops/deploj-obzor/", title: "Деплой-обзор", desc: "От git push до production за 2 минуты", parent: "section-devops", parentName: "DevOps / Деплой" },
  { route: "/section-devops/vps-i-nginx/", title: "VPS и nginx", desc: "Выбор, настройка, оптимизация", parent: "section-devops", parentName: "DevOps / Деплой" },
  { route: "/section-devops/github-actions/", title: "GitHub Actions CI/CD", desc: "Автоматический деплой с 368 тестами", parent: "section-devops", parentName: "DevOps / Деплой" },
  { route: "/section-devops/bezopasnost/", title: "Безопасность", desc: "98× меньше атак чем WordPress", parent: "section-devops", parentName: "DevOps / Деплой" },
  { route: "/section-devops/monitoring/", title: "Мониторинг", desc: "Health-check, sitemap, JSON-LD", parent: "section-devops", parentName: "DevOps / Деплой" },
  { route: "/section-content/markdown-obzor/", title: "Markdown-обзор", desc: "Текстовый формат для AI-краулеров", parent: "section-content", parentName: "Контент / Markdown" },
  { route: "/section-content/yaml-frontmatter/", title: "YAML Frontmatter", desc: "Полный справочник полей", parent: "section-content", parentName: "Контент / Markdown" },
  { route: "/section-content/prompt-shablony/", title: "Промпт-шаблоны", desc: "45+ шаблонов для AI-генерации", parent: "section-content", parentName: "Контент / Markdown" },
  { route: "/section-content/ai-kontent/", title: "AI-контент", desc: "7 этапов + дебат агентов", parent: "section-content", parentName: "Контент / Markdown" },
  { route: "/section-content/migracija-s-wordpress/", title: "Миграция с WordPress", desc: "Пошаговый гайд и кейс", parent: "section-content", parentName: "Контент / Markdown" },
] : [
  { route: "/section-geo/geo-rukovodstvo/", title: "GEO Guide", desc: "How static sites appear in ChatGPT answers", parent: "section-geo", parentName: "GEO / AI Visibility" },
  { route: "/section-geo/json-ld-gajd/", title: "JSON-LD Guide", desc: "Complete guide to 10 Schema.org types", parent: "section-geo", parentName: "GEO / AI Visibility" },
  { route: "/section-geo/e-e-a-t-signaly/", title: "E-E-A-T Signals", desc: "How AI verifies content authority", parent: "section-geo", parentName: "GEO / AI Visibility" },
  { route: "/section-geo/featured-snippets/", title: "Featured Snippets", desc: "Direct answer structure for AI", parent: "section-geo", parentName: "GEO / AI Visibility" },
  { route: "/section-geo/seo-vs-geo/", title: "SEO vs GEO", desc: "Why classic SEO is losing audience", parent: "section-geo", parentName: "GEO / AI Visibility" },
  { route: "/section-devops/deploj-obzor/", title: "Deploy Overview", desc: "From git push to production in 2 minutes", parent: "section-devops", parentName: "DevOps / Deploy" },
  { route: "/section-devops/vps-i-nginx/", title: "VPS and nginx", desc: "Selection, setup, optimization", parent: "section-devops", parentName: "DevOps / Deploy" },
  { route: "/section-devops/github-actions/", title: "GitHub Actions CI/CD", desc: "Automatic deploy with 368 tests", parent: "section-devops", parentName: "DevOps / Deploy" },
  { route: "/section-devops/bezopasnost/", title: "Security", desc: "98× fewer attacks than WordPress", parent: "section-devops", parentName: "DevOps / Deploy" },
  { route: "/section-devops/monitoring/", title: "Monitoring", desc: "Health-check, sitemap, JSON-LD", parent: "section-devops", parentName: "DevOps / Deploy" },
  { route: "/section-content/markdown-obzor/", title: "Markdown Overview", desc: "Text format for AI crawlers", parent: "section-content", parentName: "Content / Markdown" },
  { route: "/section-content/yaml-frontmatter/", title: "YAML Frontmatter", desc: "Complete field reference", parent: "section-content", parentName: "Content / Markdown" },
  { route: "/section-content/prompt-shablony/", title: "Prompt Templates", desc: "45+ templates for AI generation", parent: "section-content", parentName: "Content / Markdown" },
  { route: "/section-content/ai-kontent/", title: "AI Content", desc: "7 stages + agent debate", parent: "section-content", parentName: "Content / Markdown" },
  { route: "/section-content/migracija-s-wordpress/", title: "WordPress Migration", desc: "Step-by-step guide and case study", parent: "section-content", parentName: "Content / Markdown" },
];
for (const sa of sectionArticles) {
  const parentRoute = `/${sa.parent}/`;
  pageMeta.push({
    route: sa.route,
    data: {
      title: sa.title,
      description: sa.desc,
      canonical: siteUrl + sa.route,
      type: "article",
      image: defaultImage,
      jsonLd: [
        { "@context": "https://schema.org", "@type": "Article", headline: sa.title, description: sa.desc, mainEntityOfPage: siteUrl + sa.route, author: { "@type": "Person", name: "GitHub CMS Team" }, datePublished: "2026-05-11", inLanguage: "ru" },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: sa.parentName, item: siteUrl + parentRoute }, { "@type": "ListItem", position: 3, name: sa.title }] },
      ],
    },
  });
}

// ── Product detail pages ──
const productSlugs = [
  ["galaxy-s25-ultra","macbook-air-m4","ipad-pro-m4","airpods-pro-3","watch-ultra-2","power-bank-20000"],
  ["lg-side-by-side","bosch-washing","xiaomi-x10","samsung-microwave","electrolux-stove","bosch-dishwasher"],
  ["sofa-milan","table-loft","ergo-chair","wardrobe-premium","bed-oslo","dresser-scandi"],
  ["kettler-tr1","trek-bike","salomon-tent","nike-zoom","protein-on","garmin-venu"],
  ["svetocopy-paper","parker-jotter","desk-organizer","hp-laserjet","epson-projector","rexel-shredder"],
];

// Compact product data for SEO schemas (from ShopProductPage.vue)
const productData = {
  "galaxy-s25-ultra": {id:"ELEC-001",name:"Смартфон Galaxy S25 Ultra",enName:"Galaxy S25 Ultra",price:89990,img:"https://pixinlink.ru/api/v1/600x450/galaxy-s25-ultra",desc:"Galaxy S25 Ultra — вершина мобильных технологий 2026 года. Процессор Snapdragon 8 Gen4, камера 200 МП с 100× Space Zoom, дисплей Dynamic AMOLED 2X 120 Гц, аккумулятор 5500 мАч с зарядкой 65 Вт, титановый корпус IP68, S Pen.",specs:[{n:"Процессор",v:"Snapdragon 8 Gen4 (3 нм)"},{n:"Дисплей",v:"6.9\" AMOLED 2X, 120 Гц"},{n:"Камера",v:"200+50+12 МП, 100× Zoom"},{n:"Аккумулятор",v:"5500 мАч, 65W"},{n:"Память",v:"16 ГБ / 512 ГБ"},{n:"Защита",v:"IP68, Gorilla Armor 2"}],revs:[{a:"Алексей М.",r:5,t:"Камера в темноте — как днём. AI реально помогает.",d:"2026-04-15"},{a:"Марина К.",r:5,t:"Автономность 1.5 дня активного использования.",d:"2026-04-20"}],faq:[{q:"eSIM поддерживается?",a:"Да, 2 eSIM + nano-SIM — до 3 номеров."},{q:"Версия Android?",a:"Android 16 + One UI 8. 7 лет обновлений."},{q:"Зарядка в комплекте?",a:"Нет, блок 65W отдельно. Кабель в комплекте."}]},
  "macbook-air-m4": {id:"ELEC-002",name:"Ноутбук MacBook Air M4",enName:"MacBook Air M4",price:124990,img:"https://pixinlink.ru/api/v1/600x450/macbook-air",desc:"MacBook Air M4 — самый производительный Air. Чип M4 (12 CPU / 18 GPU), дисплей 15.3\" Liquid Retina, 16 ГБ, 512 ГБ SSD, 1.3 кг, до 18 ч.",specs:[{n:"Процессор",v:"Apple M4 12CPU/18GPU"},{n:"Дисплей",v:"15.3\" Liquid Retina"},{n:"Память",v:"16 ГБ / 512 ГБ"},{n:"Вес",v:"1.3 кг"}],revs:[{a:"Иван П.",r:5,t:"Docker, Node.js, 3 монитора — всё летает.",d:"2026-04-10"}],faq:[{q:"Внешний монитор?",a:"Да, 2 монитора 6K через Thunderbolt 4."}]},
  "ipad-pro-m4": {id:"ELEC-003",name:"Планшет iPad Pro M4",enName:"iPad Pro M4",price:99990,img:"https://pixinlink.ru/api/v1/600x450/ipad-pro",desc:"iPad Pro M4 — OLED Ultra Retina XDR 1600 нит, чип M4, Apple Pencil Pro, Thunderbolt 5, Face ID, 5G.",specs:[{n:"Дисплей",v:"11\" OLED, 1600 нит"},{n:"Процессор",v:"Apple M4"},{n:"Память",v:"16 ГБ / 1 ТБ"}],revs:[{a:"Елена Д.",r:5,t:"OLED — прорыв. Pencil Pro — настоящий инструмент.",d:"2026-05-01"}]},
  "airpods-pro-3": {id:"ELEC-004",name:"Наушники AirPods Pro 3",enName:"AirPods Pro 3",price:24990,img:"https://pixinlink.ru/api/v1/600x450/airpods-pro",desc:"AirPods Pro 3 — чип H3, шумоподавление 48 дБ, адаптивный EQ, пространственное аудио, IP54.",specs:[{n:"Чип",v:"Apple H3"},{n:"ANC",v:"До 48 дБ"},{n:"Автономность",v:"8 ч + 28 ч"},{n:"Защита",v:"IP54"}],revs:[{a:"Анна Ш.",r:5,t:"ANC отличное. В метро тихо. 7+ ч.",d:"2026-04-18"}]},
  "watch-ultra-2": {id:"ELEC-005",name:"Умные часы Watch Ultra 2",enName:"Watch Ultra 2",price:59990,img:"https://pixinlink.ru/api/v1/600x450/smart-watch",desc:"Watch Ultra 2 — титан, дайвинг до 100 м, автономность 5 дней, ECG, SpO2, GPS.",specs:[{n:"Корпус",v:"Титановый сплав"},{n:"Дайвинг",v:"100 м"},{n:"Автономность",v:"5 дней"},{n:"Датчики",v:"ECG + SpO2 + GPS"}],revs:[{a:"Павел Г.",r:5,t:"ECG точный. Батарея реально 5 дней.",d:"2026-04-22"}]},
  "power-bank-20000": {id:"ELEC-006",name:"Power Bank 20000 mAh",enName:"Power Bank 20000mAh",price:3490,img:"https://pixinlink.ru/api/v1/600x450/power-bank",desc:"Power Bank 20000 mAh — USB-C 65W PD, 2×USB-A 18W, вес 380 г.",specs:[{n:"Ёмкость",v:"20000 mAh"},{n:"Порты",v:"USB-C 65W + 2×USB-A"},{n:"Вес",v:"380 г"}]},
  "lg-side-by-side": {id:"HOME-001",name:"Холодильник LG Side-by-Side",enName:"LG Side-by-Side Fridge",price:89990,img:"https://pixinlink.ru/api/v1/600x450/refrigerator",desc:"LG Side-by-Side 647 л — инвертор, No Frost, Wi-Fi SmartThings.",specs:[{n:"Объём",v:"647 л"},{n:"Компрессор",v:"Инверторный"},{n:"Wi-Fi",v:"SmartThings"}],revs:[{a:"Татьяна В.",r:5,t:"Тихий, вместительный. Wi-Fi удобен.",d:"2026-04-12"}]},
  "bosch-washing": {id:"HOME-002",name:"Стиральная машина Bosch Serie 6",enName:"Bosch Serie 6 Washer",price:54990,img:"https://pixinlink.ru/api/v1/600x450/washing-machine",desc:"Bosch Serie 6 — 10 кг, EcoSilence Drive, 1600 об/мин.",specs:[{n:"Загрузка",v:"10 кг"},{n:"Двигатель",v:"EcoSilence Drive"},{n:"Отжим",v:"1600 об/мин"}]},
  "xiaomi-x10": {id:"HOME-003",name:"Робот-пылесос Xiaomi X10+",enName:"Xiaomi X10+ Robot Vacuum",price:39990,img:"https://pixinlink.ru/api/v1/600x450/robot-vacuum",desc:"Xiaomi X10+ — самоочистка в доке, лидар LDS, влажная уборка, 6000 Па.",specs:[{n:"Всасывание",v:"6000 Па"},{n:"Навигация",v:"Лидар LDS"},{n:"Док",v:"Самоочистка"}]},
  "samsung-microwave": {id:"HOME-004",name:"Микроволновка Samsung MG",enName:"Samsung MG Microwave",price:12990,img:"https://pixinlink.ru/api/v1/600x450/microwave",desc:"Samsung MG — 28 л, гриль+конвекция, 900 Вт.",specs:[{n:"Объём",v:"28 л"},{n:"Мощность",v:"900 Вт"},{n:"Режимы",v:"Гриль + конвекция"}]},
  "electrolux-stove": {id:"HOME-005",name:"Индукционная плита Electrolux",enName:"Electrolux Induction Stove",price:34990,img:"https://pixinlink.ru/api/v1/600x450/induction-cooktop",desc:"Electrolux — индукция 4 конфорки, 7400 Вт, таймер.",specs:[{n:"Конфорки",v:"4 (индукция)"},{n:"Мощность",v:"7400 Вт"}]},
  "bosch-dishwasher": {id:"HOME-006",name:"Посудомойка Bosch SMV",enName:"Bosch SMV Dishwasher",price:44990,img:"https://pixinlink.ru/api/v1/600x450/dishwasher",desc:"Bosch SMV — 14 комплектов, 8 программ, AquaStop, 44 дБ.",specs:[{n:"Комплекты",v:"14"},{n:"Программы",v:"8"},{n:"Шум",v:"44 дБ"}]},
  "sofa-milan": {id:"FURN-001",name:"Угловой диван «Милан»",enName:"Milan Corner Sofa",price:84990,img:"https://pixinlink.ru/api/v1/600x450/corner-sofa",desc:"Диван «Милан» — 280×180 см, велюр серый.",specs:[{n:"Размер",v:"280×180 см"},{n:"Обивка",v:"Велюр серый"},{n:"Спальное",v:"160×200 см"}],revs:[{a:"Евгений Д.",r:5,t:"Диван удобный. Велюр мягкий.",d:"2026-04-30"}]},
  "table-loft": {id:"FURN-002",name:"Обеденный стол «Лофт»",enName:"Loft Dining Table",price:49990,img:"https://pixinlink.ru/api/v1/600x450/wooden-table",desc:"Стол «Лофт» — 160×90 см, массив дуба.",specs:[{n:"Размер",v:"160×90 см"},{n:"Материал",v:"Массив дуба"},{n:"Персоны",v:"6-8"}]},
  "ergo-chair": {id:"FURN-003",name:"Офисное кресло Ergo Pro",enName:"Ergo Pro Office Chair",price:22990,img:"https://pixinlink.ru/api/v1/600x450/office-chair",desc:"Ergo Pro — эргономичное кресло, подлокотники 4D.",specs:[{n:"Спинка",v:"Сетчатая"},{n:"Подлокотники",v:"4D-регулировка"},{n:"Нагрузка",v:"До 130 кг"}],revs:[{a:"Николай Б.",r:5,t:"Спина перестала болеть после 8-ч дня.",d:"2026-04-25"}]},
  "wardrobe-premium": {id:"FURN-004",name:"Шкаф-купе «Премиум»",enName:"Premium Wardrobe",price:79990,img:"https://pixinlink.ru/api/v1/600x450/wardrobe",desc:"Шкаф-купе «Премиум» — 240×220×65 см, зеркала, LED.",specs:[{n:"Размер",v:"240×220×65 см"},{n:"Двери",v:"Зеркальные"},{n:"Секции",v:"3"}]},
  "bed-oslo": {id:"FURN-005",name:"Кровать Oslo",enName:"Oslo Bed",price:59990,img:"https://pixinlink.ru/api/v1/600x450/double-bed",desc:"Кровать Oslo — 180×200 см, экокожа, подъёмный механизм.",specs:[{n:"Размер",v:"180×200 см"},{n:"Обивка",v:"Экокожа"},{n:"Механизм",v:"Подъёмный"}]},
  "dresser-scandi": {id:"FURN-006",name:"Комод «Сканди»",enName:"Scandi Dresser",price:19990,img:"https://pixinlink.ru/api/v1/600x450/dresser",desc:"Комод «Сканди» — 120×80×45 см, ЛДСП белый, 6 ящиков.",specs:[{n:"Размер",v:"120×80×45 см"},{n:"Материал",v:"ЛДСП белый"},{n:"Ящики",v:"6"}]},
  "kettler-tr1": {id:"SPRT-001",name:"Беговая дорожка Kettler TR1",enName:"Kettler TR1 Treadmill",price:89990,img:"https://pixinlink.ru/api/v1/600x450/treadmill",desc:"Kettler TR1 — 3.5 л.с., до 20 км/ч.",specs:[{n:"Мотор",v:"3.5 л.с."},{n:"Скорость",v:"0.5-20 км/ч"},{n:"Программ",v:"12"}],revs:[{a:"Александр С.",r:5,t:"Тихая, мощная. 12 программ хватает.",d:"2026-04-20"}]},
  "trek-bike": {id:"SPRT-002",name:"Горный велосипед Trek X-Caliber",enName:"Trek X-Caliber Bike",price:74990,img:"https://pixinlink.ru/api/v1/600x450/mountain-bike",desc:"Trek X-Caliber 9 — алюминий, 29\", RockShox.",specs:[{n:"Рама",v:"Алюминий Alpha Gold"},{n:"Колёса",v:"29\""},{n:"Вилка",v:"RockShox 100 мм"}]},
  "salomon-tent": {id:"SPRT-003",name:"Палатка Salomon 3-местная",enName:"Salomon 3-Person Tent",price:18990,img:"https://pixinlink.ru/api/v1/600x450/tent-camping",desc:"Salomon — 3 места, 2.8 кг, 5000 мм.",specs:[{n:"Вместимость",v:"3 места"},{n:"Вес",v:"2.8 кг"},{n:"Водостойкость",v:"5000 мм"}]},
  "nike-zoom": {id:"SPRT-004",name:"Кроссовки Nike Air Zoom",enName:"Nike Air Zoom Shoes",price:12990,img:"https://pixinlink.ru/api/v1/600x450/running-shoes",desc:"Nike Air Zoom Pegasus — Zoom Air, 280 г.",specs:[{n:"Амортизация",v:"Zoom Air"},{n:"Верх",v:"Flyknit"},{n:"Вес",v:"280 г"}]},
  "protein-on": {id:"SPRT-005",name:"Протеин Optimum Nutrition",enName:"Optimum Nutrition Protein",price:4990,img:"https://pixinlink.ru/api/v1/600x450/protein-powder",desc:"Optimum Nutrition — 2.27 кг, 24 г белка на 30 г.",specs:[{n:"Вес",v:"2.27 кг"},{n:"Белок",v:"24 г / 30 г"},{n:"Вкус",v:"Шоколад"}]},
  "garmin-venu": {id:"SPRT-006",name:"Фитнес-браслет Garmin Venu 3",enName:"Garmin Venu 3",price:35990,img:"https://pixinlink.ru/api/v1/600x450/fitness-watch",desc:"Garmin Venu 3 — GPS, AMOLED 1.4\", Body Battery.",specs:[{n:"Дисплей",v:"AMOLED 1.4\""},{n:"GPS",v:"Многочастотный"},{n:"Автономность",v:"14 дней"}]},
  "svetocopy-paper": {id:"OFFC-001",name:"Бумага SvetoCopy A4",enName:"SvetoCopy A4 Paper",price:1890,img:"https://pixinlink.ru/api/v1/600x450/paper",desc:"SvetoCopy A4 — 5 пачек × 500 листов, 80 г/м².",specs:[{n:"Формат",v:"A4"},{n:"Плотность",v:"80 г/м²"},{n:"Класс",v:"A+"}]},
  "parker-jotter": {id:"OFFC-002",name:"Ручка Parker Jotter",enName:"Parker Jotter Pen",price:2490,img:"https://pixinlink.ru/api/v1/600x450/pen-parker",desc:"Parker Jotter — нержавеющая сталь, синие чернила.",specs:[{n:"Материал",v:"Нержавеющая сталь"},{n:"Чернила",v:"Синие"}]},
  "desk-organizer": {id:"OFFC-003",name:"Органайзер настольный",enName:"Desk Organizer",price:1490,img:"https://pixinlink.ru/api/v1/600x450/desk-organizer",desc:"Органайзер — бамбук, 4 отделения, вращение 360°.",specs:[{n:"Материал",v:"Бамбук"},{n:"Отделений",v:"4"},{n:"Вращение",v:"360°"}]},
  "hp-laserjet": {id:"OFFC-004",name:"Принтер HP LaserJet M234",enName:"HP LaserJet M234",price:14990,img:"https://pixinlink.ru/api/v1/600x450/laser-printer",desc:"HP LaserJet M234 — монохромный, 29 стр/мин, Wi-Fi.",specs:[{n:"Тип",v:"Лазерный монохромный"},{n:"Скорость",v:"29 стр/мин"},{n:"Дуплекс",v:"Авто"}]},
  "epson-projector": {id:"OFFC-005",name:"Проектор Epson EB-X51",enName:"Epson EB-X51 Projector",price:54990,img:"https://pixinlink.ru/api/v1/600x450/projector",desc:"Epson EB-X51 — 3800 люмен, XGA, 16000:1.",specs:[{n:"Яркость",v:"3800 люмен"},{n:"Разрешение",v:"XGA 1024×768"},{n:"Контраст",v:"16000:1"}]},
  "rexel-shredder": {id:"OFFC-006",name:"Шредер Rexel Auto+ 100X",enName:"Rexel Auto+ 100X Shredder",price:12990,img:"https://pixinlink.ru/api/v1/600x450/shredder",desc:"Rexel Auto+ 100X — автоподача 100 л., P-4.",specs:[{n:"Автоподача",v:"100 листов"},{n:"Фрагменты",v:"4×40 мм"},{n:"Уровень",v:"P-4"}]},
};

function buildProductSchema(p) {
  const schemas = [];
  schemas.push({
    "@context": "https://schema.org", "@type": "Product",
    name: p.name, description: p.desc, image: p.img, sku: p.id,
    offers: { "@type": "Offer", price: String(p.price), priceCurrency: "RUB", availability: "https://schema.org/InStock" },
  });
  if (p.specs) {
    for (const s of p.specs) schemas.push({ "@context": "https://schema.org", "@type": "PropertyValue", name: s.n, value: s.v });
  }
  if (p.revs && p.revs.length) {
    const avg = (p.revs.reduce((sum, r) => sum + r.r, 0) / p.revs.length).toFixed(1);
    schemas.push({
      "@context": "https://schema.org", "@type": "AggregateRating",
      ratingValue: avg, bestRating: "5", worstRating: "1",
      ratingCount: String(p.revs.length), reviewCount: String(p.revs.length),
      review: p.revs.map(r => ({ "@type": "Review", author: { "@type": "Person", name: r.a }, reviewRating: { "@type": "Rating", ratingValue: String(r.r) }, reviewBody: r.t, datePublished: r.d })),
    });
  }
  if (p.faq && p.faq.length) {
    schemas.push({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: p.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  return schemas;
}

for (let si = 0; si < shopSections.length; si++) {
  const ss = shopSections[si];
  const slugs = productSlugs[si] || [];
  for (const slug of slugs) {
    const route = `/shop/${ss.route.replace(/\/$/, "").split("/").pop()}/${slug}/`;
    const p = productData[slug];
    const title = p ? (isRu ? p.name : (p.enName || p.name)) : (isRu ? "Товар" : "Product");
    const desc = p ? p.desc : ss.desc;
    const jsonLd = p
      ? buildProductSchema(p)
      : [{ "@context": "https://schema.org", "@type": "WebPage", url: siteUrl + route }];
    jsonLd.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: "Демо магазин", item: siteUrl + "/shop/" }, { "@type": "ListItem", position: 3, name: ss.title, item: siteUrl + ss.route }, { "@type": "ListItem", position: 4, name: title }] });
    pageMeta.push({ route, data: { title, description: desc, canonical: siteUrl + route, type: "website", image: defaultImage, jsonLd } });
  }
}

const distDir = join(process.cwd(), "dist");
const htmlFiles = collectPageHtmlFiles(distDir);
const routeMap = new Map(pageMeta.map((p) => [p.route, p.data]));

let injected = 0;

for (const { file, route } of htmlFiles) {
  const page = routeMap.get(route);
  if (!page) continue;

  let html = readFileSync(file, "utf8");

  // Build final JSON-LD: Organization + Breadcrumb + detected content schemas
  // SSR provides content schemas (Article, Product, FAQ, etc.) — we add site-wide ones
  const detectedSchemas = detectAllSchemasFromHtml(html);

  const pageLd = [];
  pageLd.push(orgBlock());
  if (page.jsonLd) {
    if (Array.isArray(page.jsonLd)) pageLd.push(...page.jsonLd);
    else pageLd.push(page.jsonLd);
  }
  if (detectedSchemas.length > 0) pageLd.push(...detectedSchemas);

  // Update page data so renderMetaTags generates complete JSON-LD
  page.jsonLd = pageLd;

  const tags = renderMetaTags(page);

  html = html.replace(/<html lang="\w+"/, `<html lang="${isRu ? "ru" : "en"}"`);
  html = html.replace(/<title>[^<]*<\/title>/, tags);

  writeFileSync(file, html, "utf8");
  injected++;
}

console.log(`SEO injected into ${injected} page(s).`);
