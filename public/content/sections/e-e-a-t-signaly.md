---
title: "E-E-A-T сигналы — как AI-поисковики проверяют авторитетность сайта"
description: "Experience, Expertise, Authoritativeness, Trustworthiness. YAML Frontmatter → JSON-LD Person. Цитирование на 40-60% выше."
slug: "e-e-a-t-signaly"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "GEO"
tags:
  - e-e-a-t
  - авторитетность
  - экспертиза
  - person-schema
  - автор
schema_type: "Article"
layout: "article"
---

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) — четыре сигнала, по которым AI-поисковики оценивают источники. GitHub CMS формирует их автоматически через YAML Frontmatter: author, certifications, sources → JSON-LD Person. Результат: цитирование на 40-60% выше.

## Experience (Опыт)

AI проверяет author.experience. Если автор имеет подтверждённый опыт — цитирование выше. GitHub CMS: поле `author` → JSON-LD Person.

## Expertise (Экспертиза)

AI анализирует schema_type и @block-директивы. Статья с schema_type: "HowTo" + @block: howto получает приоритет для инструкционных запросов.

## Authoritativeness (Авторитетность)

AI проверяет certifications и внешние ссылки. Сертификаты в JSON-LD повышают доверие. Поле `certifications` в site-setup.txt автоматически добавляется в JSON-LD Person.

## Trustworthiness (Надёжность)

AI проверяет HTTPS, Last-Modified в sitemap, наличие источников. GitHub CMS обновляет sitemap при каждом push и сканирует dist/ на секреты.

## FAQ

### Какие поля обязательны для E-E-A-T?
**Ответ:** Минимум: author, schema_type, sources. Рекомендуется: author.certifications, date, updated.