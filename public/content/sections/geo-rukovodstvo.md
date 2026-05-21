---
title: "GEO-руководство — как статические сайты получают AI-видимость"
description: "Generative Engine Optimization: принципы, JSON-LD, E-E-A-T, Featured Snippets. Статические сайты цитируются AI на 30-45% чаще."
slug: "geo-rukovodstvo"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "GEO"
tags:
  - geo
  - ai-visibility
  - chatgpt
  - perplexity
  - json-ld
  - schema-org
schema_type: "Article"
layout: "article"
---

GEO (Generative Engine Optimization) — это оптимизация сайта для AI-поисковиков ChatGPT, Perplexity и Google AI Overviews. В отличие от SEO, GEO требует: структурированных данных JSON-LD, скорости TTFB ≤200ms и E-E-A-T сигналов. GitHub CMS реализует все три компонента автоматически — статические сайты получают на 30-45% больше AI-цитирований (SearchBridge AI, 2026).

## Три столпа GEO

1. **JSON-LD Schema.org** — 10+ типов: Article, FAQPage, HowTo, BreadcrumbList, Organization, Person. AI-поисковики парсят JSON-LD напрямую, не угадывая смысл текста.
2. **Скорость TTFB ≤200ms** — AI-краулеры приоритезируют быстрые сайты. Статический HTML через Vite SSG в 3-6× быстрее WordPress.
3. **E-E-A-T сигналы** — Experience, Expertise, Authoritativeness, Trustworthiness из YAML Frontmatter → JSON-LD Person.

## Почему это важно в 2026

47% B2B-покупателей начинают поиск в AI-инструментах (Gartner, 2025). Perplexity обрабатывает 15+ млн запросов/день. Без GEO вы теряете почти половину аудитории.

## GitHub CMS как GEO-платформа

Клонируете репозиторий → заполняете site-setup.txt → npm run build → сайт с полной AI-видимостью. 57 страниц, 368 тестов, TTFB ≤200ms.

## FAQ

### Чем GEO отличается от SEO?
**Ответ:** SEO — для поисковой выдачи Google (10 ссылок). GEO — для AI-поисковиков (один прямой ответ). GEO требует JSON-LD, TTFB ≤200ms и E-E-A-T.

### Сколько времени занимает GEO-оптимизация?
**Ответ:** 5 минут на заполнение site-setup.txt в GitHub CMS. JSON-LD и sitemap генерируются при первой сборке. Рост цитирования через 4-8 недель.