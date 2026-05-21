---
title: "JSON-LD микроразметка — полный гайд по Schema.org для AI-видимости"
description: "10+ типов Schema.org: Article, FAQPage, HowTo, BreadcrumbList, Organization, Person. Автогенерация при сборке."
slug: "json-ld-gajd"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "GEO"
tags:
  - json-ld
  - schema-org
  - article
  - faqpage
  - howto
  - breadcrumblist
schema_type: "HowTo"
layout: "article"
---

JSON-LD (JavaScript Object Notation for Linked Data) — стандарт W3C для машиночитаемых данных. GitHub CMS генерирует 10+ типов Schema.org из YAML Frontmatter при каждой сборке — без плагинов.

## Пошаговая настройка JSON-LD

### Шаг 1: Заполните Frontmatter
В Markdown-файле укажите schema_type, author, category, tags. Эти поля конвертируются в JSON-LD.

### Шаг 2: Добавьте @block-директивы
`` для прямого ответа, `` для FAQPage, `` для HowTo.

### Шаг 3: Запустите сборку
`npm run build` — JSON-LD сгенерируется автоматически. Проверьте через Google Rich Results Test.

## 10 типов Schema.org

1. **Article** — заголовок, автор, дата, изображение
2. **FAQPage** — вопросы и ответы (критичен для AI: +30% цитирований)
3. **HowTo** — пошаговые инструкции
4. **BreadcrumbList** — навигация для графов знаний
5. **WebSite** — описание с SearchAction
6. **Organization** — реквизиты, контакты, соцсети
7. **Person** — E-E-A-T профиль автора
8. **Product + Offer** — карточки товаров
9. **AggregateRating** — рейтинги и отзывы
10. **CaseStudy** — кейсы с результатами

## FAQ

### Сколько типов Schema.org нужно для GEO?
**Ответ:** Минимум 4 (Article, Organization, BreadcrumbList, WebSite). Оптимально 10+. GitHub CMS предоставляет все 10 из коробки.