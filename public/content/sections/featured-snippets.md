---
title: "Featured Snippets — прямые ответы в ChatGPT и Google AI Overviews"
description: "Структура: вопрос → прямой ответ → факты. @block: answer-first для автоматической разметки."
slug: "featured-snippets"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "GEO"
tags:
  - featured-snippet
  - qapage
  - google-ai-overviews
  - block-директивы
  - answer-first
schema_type: "Article"
layout: "article"
---

Featured Snippets — прямые ответы AI-поисковиков. GitHub CMS использует @block-директивы для разметки контента под Featured Snippets. Директива `` сообщает AI, какой блок цитировать.

## Структура Featured Snippet

1. **Вопрос** — H2/H3 заголовок в вопросительной форме
2. **Прямой ответ** — 40-60 слов в первом абзаце, самодостаточный, с цифрой
3. **Факты** — 3-4 пункта с конкретными данными и источниками

## Как AI выбирает Featured Snippet

AI ищет: 1) вопрос в H2/H3, 2) прямой ответ в первом предложении, 3) JSON-LD (QAPage/FAQPage), 4) E-E-A-T сигналы. GitHub CMS обеспечивает все 4 условия.

## @block-директивы для Featured Snippets

- `` — прямой ответ (главный)
- `` — FAQPage JSON-LD (вопросы-ответы)
- `` — таблица (структурированные данные)

## FAQ

### Как проверить Featured Snippet?
**Ответ:** Задайте вопрос ChatGPT/Perplexity по вашей теме. Если сайт цитируется — работает. Мониторьте 15-20 запросов раз в 2 недели.