#!/bin/bash
set -euo pipefail
TARGET_DIR="${1:-.}"
EDITION="${2:-free}"
LABEL=$(echo "$EDITION" | tr '[:lower:]' '[:upper:]')
LABEL="DEMO $LABEL"
TODAY=$(date +%Y-%m-%d)

for locale in ru en; do
  BLOG_DIR="$TARGET_DIR/content/$locale/blog"
  PAGES_DIR="$TARGET_DIR/content/$locale/pages"
  mkdir -p "$BLOG_DIR" "$PAGES_DIR"

  # Locale strings — always set, used by both blog and page blocks
  if [ "$locale" = "ru" ]; then
    T1="Быстрый старт с GitHub CMS"
    D1="Как за 5 минут развернуть сайт на GitHub CMS и опубликовать его."
    T2="Почему статические сайты возвращаются"
    D2="Статические сайты быстрее, безопаснее и проще в поддержке."
    T3="SEO для разработчиков"
    D3="Schema.org, мета-теги и AI-видимость для вашего контента."
    O_PROEKTE="О проекте"
    KONTAKTY="Контакты"
  else
    T1="Getting Started with GitHub CMS"
    D1="Deploy a site with GitHub CMS and publish it in 5 minutes."
    T2="Why Static Sites Are Making a Comeback"
    D2="Static sites are faster, safer, and easier to maintain."
    T3="SEO for Developers"
    D3="Schema.org, meta tags, and AI visibility for your content."
    O_PROEKTE="About"
    KONTAKTY="Contact"
  fi

  if [ -z "$(ls -A "$BLOG_DIR" 2>/dev/null)" ]; then
    echo "Creating demo blog content for $locale ($EDITION)..."

    for i in 1 2 3; do
      T_VAR="T$i"
      D_VAR="D$i"
      SLUG="demo-article-$i"
      DATE="2026-05-$(printf '%02d' $((10 + i)))"
      cat > "$BLOG_DIR/${DATE}-${SLUG}.md" <<ARTICLE
---
title: "${!T_VAR}"
description: "${!D_VAR}"
slug: "${SLUG}"
date: "${DATE}"
author: "GitHub CMS ${LABEL}"
category: "Demo"
tags:
  - github-cms
  - demo
schema_type: "Article"
layout: "article"
cover_image: "https://pixinlink.ru/api/v1/1200x630/github-cms-demo"
---

## ${!T_VAR}

${!D_VAR}

This is a **${LABEL}** demonstration article. Static site generation with Vue 3 + Vite SSG.
ARTICLE
    done
  fi

  if [ ! -f "$PAGES_DIR/about.md" ]; then
    cat > "$PAGES_DIR/about.md" <<PAGE
---
title: "${O_PROEKTE} — ${LABEL}"
description: "${LABEL} demonstration page. GitHub CMS — static site generator."
slug: "about"
date: "${TODAY}"
author: "GitHub CMS ${LABEL}"
layout: "page"
schema_type: "AboutPage"
tags: ["about", "demo"]
---

## ${O_PROEKTE}

This is the **${LABEL}** about page.

GitHub CMS is a static site generator powered by Vue 3, Vite SSG, and Markdown.
PAGE
  fi

  if [ ! -f "$PAGES_DIR/contact.md" ]; then
    cat > "$PAGES_DIR/contact.md" <<PAGE
---
title: "${KONTAKTY} — ${LABEL}"
description: "${LABEL} demo contact page."
slug: "contact"
date: "${TODAY}"
author: "GitHub CMS ${LABEL}"
layout: "page"
schema_type: "ContactPage"
tags: ["contact", "demo"]
---

## Contact

This is a **${LABEL}** contact page.
PAGE
  fi

  HOME_COUNT=1
  [ "$EDITION" = "pro" ] && HOME_COUNT=5
  for v in $(seq 1 "$HOME_COUNT"); do
    HM_FILE="$PAGES_DIR/home-variant-${v}.md"
    if [ ! -f "$HM_FILE" ]; then
      cat > "$HM_FILE" <<HOME
---
title: "Home — ${LABEL} v${v}"
description: "${LABEL} — GitHub CMS static site demo variant ${v}"
slug: "home-variant-${v}"
date: "${TODAY}"
author: "GitHub CMS ${LABEL}"
layout: "home"
schema_type: "WebSite"
tags: ["home", "demo"]
---

<section style="padding:4rem 1rem;text-align:center;background:linear-gradient(135deg,#1a0533,#2d1060);color:#fff;min-height:400px">
  <h1 style="font-size:2.5rem;margin-bottom:1rem">${LABEL} — GitHub CMS</h1>
  <p style="font-size:1.2rem;max-width:600px;margin:0 auto">Static site powered by Vue 3 + Vite SSG.</p>
  <p style="margin-top:2rem;opacity:0.7">Variant ${v}</p>
</section>
HOME
    fi
  done
done

echo "Minimal demo content ensured for $EDITION edition."
