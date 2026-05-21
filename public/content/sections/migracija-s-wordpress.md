---
title: "Миграция с WordPress на GitHub CMS — пошаговый гайд и кейс"
description: "Экспорт Markdown, сохранение SEO, 301 редиректы. Кейс: 57 страниц за 8 недель, экономия $260-1100/год."
slug: "migracija-s-wordpress"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "Content"
tags:
  - миграция
  - wordpress
  - github-cms
  - markdown
  - редиректы
  - seo
  - экономия
schema_type: "HowTo"
layout: "article"
---

Миграция с WordPress на GitHub CMS: экономия $260-1100/год, TTFB улучшен в 3×, AI-цитируемость +40%. Кейс: 57 страниц за 8 недель.

## Пошаговая миграция

### Шаг 1: Экспорт
Плагин WP All Export или XML → извлечь заголовки, текст, категории, URL.

### Шаг 2: Конвертация
HTML → Markdown. SEO-метаданные → YAML Frontmatter.

### Шаг 3: Файлы
content/blog/YYYY-MM-DD-slug.md с полным Frontmatter.

### Шаг 4: 301 редиректы
В nginx: старые WP URL → новые URL. Сохраняется SEO-вес.

### Шаг 5: Деплой
npm run build → git push → Search Console.

## Кейс: 57 страниц
Результат: TTFB 800ms → 200ms, затраты -83%, AI-цитирование +40%.

## FAQ

### Сколько времени занимает миграция?
**Ответ:** 2-8 недель. 57 страниц — 8 недель (1 чел., part-time). Автоматизация вдвое быстрее.