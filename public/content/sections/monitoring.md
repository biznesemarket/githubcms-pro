---
title: "Мониторинг статического сайта — health-check, sitemap, JSON-LD"
description: "Health-check endpoint, валидация sitemap/JSON-LD, Search Console, оповещения в Telegram."
slug: "monitoring"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "DevOps"
tags:
  - мониторинг
  - health-check
  - sitemap
  - json-ld
  - search-console
  - telegram
schema_type: "HowTo"
layout: "article"
---

Мониторинг GitHub CMS: health-check endpoint, валидация sitemap/JSON-LD, Search Console, Telegram-оповещения. 368 тестов при каждом push.

## Настройка мониторинга

### Шаг 1: Health-check
nginx: /healthz → 200 OK. GitHub Actions проверяет после деплоя.

### Шаг 2: Sitemap
npm run validate:seo-files проверяет robots.txt и sitemap.xml.

### Шаг 3: JSON-LD
Google Rich Results Test после сборки.

### Шаг 4: Search Console
Sitemap с Last-Modified → индексация в 3-5× быстрее.

### Шаг 5: Оповещения
GitHub Actions → Telegram Bot API при ошибках деплоя.

## FAQ

### Как проверить работу сайта?
**Ответ:** curl https://site.com/healthz → "OK". Проверяется автоматически после каждого деплоя.