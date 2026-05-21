import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const edition = process.argv.includes("--pro") || process.argv.includes("--edition=pro") ? "pro" : "free";
const today = new Date().toISOString().slice(0, 10);
const root = process.cwd();

const demoLabel = edition === "pro" ? "DEMO PRO" : "DEMO FREE";

function ensure(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function write(path, content) {
  writeFileSync(join(root, path), content.trimStart() + "\n", "utf8");
  console.log(`  ✓ ${path}`);
}

function article(locale, slug, title, description, index) {
  const date = `2026-05-${String(10 + index).padStart(2, "0")}`;
  return `---
title: "${title}"
description: "${description}"
slug: "${slug}"
date: "${date}"
author: "GitHub CMS ${demoLabel}"
category: "Demo"
tags:
  - github-cms
  - demo
schema_type: "Article"
layout: "article"
cover_image: "https://pixinlink.ru/api/v1/1200x630/github-cms-demo"
---

## ${title}

${description}

This is a **${demoLabel}** demonstration article. It shows how GitHub CMS renders Markdown content as static pages.

### Features

- Fast static site generation with Vite SSG
- SEO-optimized with Schema.org markup
- No database required — all content is in Markdown files
- Instant build and deploy via GitHub Actions
`;
}

function pageAbout(locale, label) {
  const title = locale === "ru" ? `О проекте — ${label}` : `About — ${label}`;
  const desc = locale === "ru"
    ? `Демонстрационная страница ${label}. GitHub CMS — статический сайт-генератор.`
    : `${label} demonstration page. GitHub CMS — static site generator.`;
  return `---
title: "${title}"
description: "${desc}"
slug: "about"
date: "${today}"
author: "GitHub CMS ${label}"
layout: "page"
schema_type: "AboutPage"
tags: ["about", "demo"]
---

## ${title}

This is the **${label}** about page.

GitHub CMS is a static site generator powered by Vue 3, Vite SSG, and Markdown. Content is stored as Markdown files in the repository and built into static HTML.

Built for **AI visibility** — every page includes Schema.org structured data, SEO meta tags, and semantic HTML.
`;
}

function pageContact(locale, label) {
  const title = locale === "ru" ? `Контакты — ${label}` : `Contact — ${label}`;
  const desc = locale === "ru"
    ? `Свяжитесь с нами. Демо-страница ${label}.`
    : `Contact us. ${label} demo page.`;
  return `---
title: "${title}"
description: "${desc}"
slug: "contact"
date: "${today}"
author: "GitHub CMS ${label}"
layout: "page"
schema_type: "ContactPage"
tags: ["contact", "demo"]
---

## Contact

This is a **${label}** contact page.

- GitHub: [hubcms-dot/githubcms](https://github.com/hubcms-dot/githubcms)
- Website: [githubcms.com](https://githubcms.com)
`;
}

function homePage(locale, label, variant) {
  const v = variant || 1;
  const tag = v === 1 ? "" : `variant: "${v}"\n`;
  const title = locale === "ru" ? `Главная` : `Home`;
  const homeSlug = v === 1 ? "index" : `home-variant-${v}`;
  return `---
title: "${title} — ${label} v${v}"
description: "${label} — GitHub CMS static site demo variant ${v}"
slug: "${homeSlug}"
date: "${today}"
author: "GitHub CMS ${label}"
layout: "home"
${tag}schema_type: "WebSite"
tags: ["home", "demo"]
---

<section style="padding:4rem 1rem;text-align:center;background:linear-gradient(135deg,#1a0533,#2d1060);color:#fff;min-height:400px">
  <h1 style="font-size:2.5rem;margin-bottom:1rem">${label} — GitHub CMS</h1>
  <p style="font-size:1.2rem;max-width:600px;margin:0 auto">Static site powered by Vue 3 + Vite SSG. Markdown content, Schema.org SEO, instant deploy.</p>
  <p style="margin-top:2rem;opacity:0.7;font-size:0.85rem">Variant ${v}</p>
</section>
`;
}

// === Generate ===
console.log(`Setting up demo content for ${demoLabel} edition...`);

const locales = ["ru", "en"];

for (const locale of locales) {
  ensure(join(root, "content", locale, "blog"));
  ensure(join(root, "content", locale, "pages"));

  // Blog articles (3)
  const articleCount = 3;
  for (let i = 1; i <= articleCount; i++) {
    const slug = `demo-article-${i}`;
    const titles = {
      ru: [
        "Быстрый старт с GitHub CMS",
        "Почему статические сайты возвращаются",
        "SEO для разработчиков",
      ],
      en: [
        "Getting Started with GitHub CMS",
        "Why Static Sites Are Making a Comeback",
        "SEO for Developers",
      ],
    };
    const descs = {
      ru: [
        "Как за 5 минут развернуть сайт на GitHub CMS и опубликовать его.",
        "Статические сайты быстрее, безопаснее и проще в поддержке.",
        "Schema.org, meta-теги и AI-видимость для вашего контента.",
      ],
      en: [
        "Deploy a site with GitHub CMS and publish it in 5 minutes.",
        "Static sites are faster, safer, and easier to maintain.",
        "Schema.org, meta tags, and AI visibility for your content.",
      ],
    };
    write(
      `content/${locale}/blog/${date.slice(0, 7)}-${String(10 + i).padStart(2, "0")}-${slug}.md`,
      article(locale, slug, titles[locale][i - 1], descs[locale][i - 1], i),
    );
  }

  // Pages
  write(`content/${locale}/pages/about.md`, pageAbout(locale, demoLabel));
  write(`content/${locale}/pages/contact.md`, pageContact(locale, demoLabel));

  // Home pages — 1 for free, 5 for pro
  const homeVariants = edition === "pro" ? 5 : 1;
  for (let v = 1; v <= homeVariants; v++) {
    write(`content/${locale}/pages/home-variant-${v}.md`, homePage(locale, demoLabel, v === 1 ? 0 : v));
  }
}

// Pro-only: sections
if (edition === "pro") {
  ensure(join(root, "content", "sections"));
  ensure(join(root, "content", "sections", "geo"));
  ensure(join(root, "content", "sections", "devops"));
  ensure(join(root, "content", "sections", "content"));

  const sectionArticles = ["intro", "best-practices", "case-study"];
  const sections = ["geo", "devops", "content"];

  for (const section of sections) {
    for (let i = 0; i < 3; i++) {
      const slug = sectionArticles[i];
      const sectionSlug = `section-${section}-${slug}`;
      write(
        `content/sections/${section}/${today}-${sectionSlug}.md`,
        `---
title: "${section.toUpperCase()} — ${slug.replace(/-/g, " ")}"
description: "Demo ${section} article: ${slug}"
slug: "${sectionSlug}"
date: "${today}"
author: "GitHub CMS ${demoLabel}"
category: "${section.toUpperCase()}"
section: "${section}"
tags:
  - ${section}
  - demo
schema_type: "Article"
layout: "section-article"
cover_image: "https://pixinlink.ru/api/v1/1200x630/github-cms-${section}"
---

## ${section.toUpperCase()} — ${slug.replace(/-/g, " ")}

This is a **${demoLabel}** section article in the ${section.toUpperCase()} section.

GitHub CMS Pro supports content sections for organizing articles by topic.
`,
      );
    }
  }
}

console.log(`\nDemo content created for ${demoLabel} edition.`);
console.log("Next: npm run generate:content && npm run build");
