---
title: "YAML Frontmatter — полный справочник полей GitHub CMS"
description: "title, description, slug, author, category, tags, schema_type, geo, cover_image. Примеры, влияние на JSON-LD."
slug: "yaml-frontmatter"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "Content"
tags:
  - yaml
  - frontmatter
  - метаданные
  - title
  - slug
  - author
  - schema_type
schema_type: "Article"
layout: "article"
---

YAML Frontmatter — блок метаданных в начале Markdown-файла. 10+ полей, которые напрямую → JSON-LD + Open Graph + мета-теги. Заполнение: 2 минуты.

## Все поля

1. **title** — H1 (max 70 символов)
2. **description** — Meta (max 160 символов)
3. **slug** — URL: /blog/slug/
4. **date** — 2026-05-10
5. **updated** — дата обновления
6. **author** — → JSON-LD Person
7. **category** — категория
8. **tags** — массив [tag1, tag2]
9. **schema_type** — Article / FAQPage / HowTo
10. **geo** — GEO-ключи: ["GEO", "AI"]
11. **cover_image** — pixinlink:описание

## Влияние на JSON-LD

- author → Person (E-E-A-T)
- schema_type → @type
- tags → keywords
- geo → about/Thing
- Все поля → OG + Twitter Cards

## FAQ

### Какие поля обязательны?
**Ответ:** title, description, slug, date, author. Остальные — для максимальной AI-видимости.