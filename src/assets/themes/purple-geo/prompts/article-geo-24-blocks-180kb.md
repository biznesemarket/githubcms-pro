# 🚀 GEO Article Template — 24 Blocks, 180KB+ Edition

## Purpose

Generate articles of 180KB+ (8-10 screens) with full Schema.org JSON-LD micro-markup for each block. Uses 7-stage process: Research → Analysis → Tri-Agent Debate → GEO Structuring → Writing → Validation → Output.

## How to Use

1. Replace all `{placeholders}` with your data
2. Copy the MASTER PROMPT section starting from "Ты — Senior копирайтер..."
3. Send to ChatGPT (4o) or Claude (Sonnet/Opus)
4. AI will output in stages — confirm each stage before proceeding

---

## Required Variables

```
ТЕМА_СТАТЬИ = {article_title}
ГЛАВНОЕ_КЛЮЧЕВОЕ_СЛОВО = {key_keyword}
ВТОРИЧНЫЕ_КЛЮЧИ = {lsi_keywords}
ЦЕЛЕВАЯ_АУДИТОРИЯ = {target_audience}
ГЛАВНАЯ_СУЩНОСТЬ = {main_entity}
УТП = {value_proposition}
НАЗВАНИЕ_КОМПАНИИ = {company_name}
ОПИСАНИЕ_КОМПАНИИ = {company_description}
КОНТАКТЫ = {contact_info}
ФАКТЫ_И_ИСТОЧНИКИ = {source_facts}
ТИП_КОНТЕНТА = [Статья-гайд / Описание продукта / Кейс / Услуга / Гибридный]
ЦЕЛЕВОЕ_ДЕЙСТВИЕ = {primary_cta}
```

---

## MASTER PROMPT — копируй от этой строки до конца файла

Ты — Senior копирайтер, SEO-специалист и эксперт по Generative Engine Optimization. Следуй методологии Гарри Драя (Marketing Examples), трёхагентному дебату (Expert + Marketer + SEO) и системе 24 GEO-блоков.

**ТЕМА СТАТЬИ:** {article_title}

**КОНТЕКСТ:**
- Компания: {company_name} — {company_description}
- Целевая аудитория: {target_audience}
- Главная сущность: {main_entity}
- Ценностное предложение: {value_proposition}
- Тип контента: {тип_контента}
- Целевое действие: {primary_cta}

**ИСТОЧНИКИ ДАННЫХ:**
{source_facts}

**ФОРМАТ ВЫВОДА:** ОДИН Markdown-файл с YAML frontmatter (как в GitHub CMS). Начни с `---`. Объём: **180KB+ (8-10 экранов)**. Каждый блок — самодостаточный раздел с заголовком H2, таблицами, списками и Schema.org JSON-LD инструкциями.

---

## ЭТАП 0: АНАЛИЗ И ПЛАНИРОВАНИЕ (внутренний, не в выводе)

1. Определи тип контента и выбери блоки из таблицы ниже
2. Проанализируй source_facts — какие факты в какие блоки
3. Сформулируй 7 ключевых тезисов (каждый = основа для блока)
4. Определи структуру: сколько H2 разделов, где Featured Snippet, где CTA

---

## ТАБЛИЦА БЛОКОВ (выбери 17-22 из 24)

| # | Блок | Приоритет | Размер | Schema тип |
|---|---|---|---|---|
| 1 | Заголовок + описание | 🔴 5/5 | 50-100 слов | Article |
| 2 | TL;DR | 🔴 5/5 | 40-60 слов | Article (abstract) |
| 3 | Key Facts | 🔴 5/5 | 5-7 фактов | ItemList |
| 4 | Определение темы | 🔴 5/5 | 35-60 слов | DefinedTerm |
| 5 | Краткое введение | 🟠 4/5 | 200-400 слов | Article |
| 6 | Featured Snippet | 🔴 5/5 | 40-60 слов | QAPage |
| 7 | Проблема→Решение→Результат | 🔴 5/5 | 300-500 слов | Thing |
| 8 | Технические параметры | 🔴 5/5 | Таблица 5-20 строк | PropertyValue |
| 9 | Сравнение с аналогами | 🟠 4/5 | Таблица 5-8 строк | Table |
| 10 | Данные и статистика | 🔴 5/5 | 5-7 цифр с контекстом | StatisticalVariable |
| 11 | Таблицы и графики | 🟠 4/5 | 2-4 визуализации | ImageObject |
| 12 | HowTo инструкция | 🔴 5/5 | 5-7 шагов | HowTo ⭐ |
| 13 | Roadmap | 🟡 3/5 | 4 фазы + таблица | PlanAction |
| 14 | Кейсы внедрения | 🔴 5/5 | 3-6 кейсов | CaseStudy |
| 15 | Расширенный FAQ | 🔴 5/5 | 15-25 Q&A | FAQPage ⭐ |
| 16 | Импортозамещение | 🟡 3/5 | 1-3 таблицы | Table |
| 17 | Сертификаты и стандарты | 🟠 4/5 | 5-20 пунктов | Certification |
| 18 | Отзывы клиентов | 🔴 5/5 | 3-8 отзывов | Review ⭐ |
| 19 | Авторство и E-E-A-T | 🔴 5/5 | 10-30 строк | Person ⭐ |
| 20 | Источники информации | 🔴 5/5 | 8-15 источников | Citation |
| 21 | How We Know | 🔴 5/5 | 100-200 слов | ScholarlyArticle |
| 22 | Видео и мультимедиа | 🟡 3/5 | 2-4 видео | VideoObject |
| 23 | Интерактивный калькулятор | 🟡 3/5 | 1-2 инструмента | WebApplication |
| 24 | CTA и контакты | 🟠 4/5 | 2-5 кнопок | ContactPoint |

**Легенда:** ⭐ = критично для AI-видимости (30-45% рост цитируемости)

---

## ЭТАП 1: ТРЁХАГЕНТНЫЙ ДЕБАТ (выведи в ответ)

Перед написанием статьи проведи внутренний дебат трёх агентов. ВЫВЕДИ результат в ответ:

### 🧑‍💼 AGENT_EXPERT (Специалист по теме)
```
Фокус: ГЛУБИНА, ТОЧНОСТЬ, АВТОРИТЕТНОСТЬ
КЛЮЧЕВЫЕ ТЕЗИСЫ (7 штук):
1. [Сильное утверждение с числом и источником]
2. ...
7. [Последний тезис]

ЛОГИКА: [Почему эти тезисы верны]
ПОЛНОТА: [Какие аспекты темы ещё нужно осветить]
ИСТОЧНИКИ: 8-15 авторитетных ссылок
```

### 📣 AGENT_MARKETER (Маркетолог)
```
Фокус: ВОВЛЕЧЕНИЕ, БОЛИ АУДИТОРИИ, ЯЗЫК ВЫГОД
КРИТИКА EXPERT: [Что слишком сухо, где добавить историй]
ПРЕДЛОЖЕНИЯ:
- Hook в введении: [Цепляющая статистика или история]
- H2 как обещания: [Перечисли 5-7 H2 заголовков как ОБЕЩАНИЯ]
- Где добавить кейсы: [В каких разделах нужны реальные примеры]
- CTA: [Органичный призыв]
```

### 🤖 AGENT_SEO (SEO-специалист)
```
Фокус: СТРУКТУРА, КЛЮЧИ, Featured Snippets, JSON-LD
КРИТИКА ОБОИХ: [Что не оптимизировано для поиска]
ПРЕДЛОЖЕНИЯ:
- H1 (55-60 символов): [Оптимизированный заголовок с ключом]
- Meta Description (155 символов): [С ключом и CTA]
- Featured Snippet вопросы (3-5 шт): [Вопросы из Google "Люди также спрашивают"]
- Структура H2: [Каждый H2 как вопрос или обещание с LSI-ключом]
- JSON-LD план: [Какие schema типы для каких блоков]
```

### ✅ КОНСЕНСУС
```
СОГЛАСОВАННЫЙ ПЛАН:
- Всего блоков: 17-22 (из 24)
- Всего слов: 8000-12000 (8-10 экранов)
- H1 (55 символов): [Финальный заголовок]
- Структура H2: [5-8 разделов]
```

---

## ЭТАП 2: ГЕНЕРАЦИЯ БЛОКОВ (последовательно)

Генерируй блоки ОДИН ЗА ДРУГИМ. Каждый блок начинается с `## БЛОК N: [Название]`. После каждого блока выводи разделитель `---`.

### БЛОК 1: Заголовок + краткое описание (50-100 слов)
```markdown
---
title: "{article_title}"
description: "[155 символов — с ключом и CTA]"
slug: "{key_keyword}"
date: "{YYYY-MM-DD}"
author: "{company_name}"
category: "[Категория]"
tags: [LSI_ключи, через, запятую]
schema_type: "Article"
layout: "article"
cover_image: "https://pixinlink.ru/api/v1/1200x630/описание"
---

<!-- @block: answer-first -->
[Главный тезис статьи. 2-3 предложения. Содержит ключевое слово в первом предложении. Конкретная цифра с источником.]

**Schema JSON-LD:** 
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[H1]",
  "description": "[Meta description]",
  "author": { "@type": "Person", "name": "[Автор]" },
  "datePublished": "[YYYY-MM-DD]",
  "image": "[cover_image]"
}
```

### БЛОК 2: TL;DR (40-60 слов)
```markdown
## Суть за 30 секунд

[Одно-два предложения: что, кому, какой результат. Формат: "X — это Y, которое Z". Самодостаточный блок — понятен без контекста.]

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "Article",
  "abstract": "[TL;DR текст]"
}
```

### БЛОК 3: Key Facts (5-7 фактов)
```markdown
<!-- @block: key-facts -->
## Ключевые факты

[Маркированный список. Каждый пункт: **жирная цифра** + контекст + [Источник, Год]. Минимум 5, максимум 7 фактов.]

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "[Факт 1]", "description": "[Контекст]" },
    ...
  ]
}
```

### БЛОК 4: Определение темы (35-60 слов)
```markdown
## Что такое {main_entity}

[Чёткое определение в 1-2 предложениях. Формат: "X — это Y, который Z". Без вводных слов. Без «является». Конкретно.]

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "{main_entity}",
  "description": "[Определение]",
  "inDefinedTermSet": "{site_url}/glossary"
}
```

### БЛОК 5: Краткое введение (200-400 слов)
```markdown
## Почему это важно

[3-4 параграфа. Параграф 1: контекст рынка и цифры. Параграф 2: проблема аудитории. Параграф 3: почему традиционные подходы не работают. Параграф 4: что читатель узнает из статьи. Каждый параграф ≤4 предложений, ≤20 слов в предложении.]
```

### БЛОК 6: Featured Snippet (40-60 слов)
```markdown
### [ВОПРОС из Google «Люди также спрашивают» — без вопросительного знака в конце]

[Прямой ответ 40-60 слов. Первое предложение — key takeaway. Содержит число и источник.]

<div class="featured-snippet mt-3 mb-4">
<p class="mb-0">[Ответ дублируется в визуальном блоке для выделения]</p>
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "QAPage",
  "mainEntity": {
    "@type": "Question",
    "name": "[Вопрос]",
    "acceptedAnswer": { "@type": "Answer", "text": "[Ответ]" }
  }
}
```

### БЛОК 7: Проблема → Решение → Результат (300-500 слов)
```markdown
## Почему традиционные подходы не работают — и что делать

<div class="row">
<div class="col-md-4 mb-3">
<div class="card border-0 h-100 p-4" style="background:rgba(220,53,69,0.06);border-top:4px solid #dc3545">
<h5>🔴 Проблема</h5>
<p>[3-4 предложения. Конкретная проблема с цифрами ущерба. Что теряет бизнес без решения.]</p>
</div>
</div>
<div class="col-md-4 mb-3">
<div class="card border-0 h-100 p-4" style="background:rgba(124,58,237,0.06);border-top:4px solid var(--color-accent)">
<h5>✅ Решение {company_name}</h5>
<p>[3-4 предложения. Как именно решается проблема. Конкретные действия, инструменты, методология.]</p>
</div>
</div>
<div class="col-md-4 mb-3">
<div class="card border-0 h-100 p-4" style="background:rgba(25,135,84,0.06);border-top:4px solid #198754">
<h5>📊 Результат</h5>
<p>[3-4 предложения. Измеримый результат с цифрами. ROI, сроки, конкретные метрики.]</p>
</div>
</div>
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "Thing",
  "name": "Решение для [проблемы]",
  "problem": "[Описание проблемы]",
  "solution": "[Описание решения]",
  "result": "[Результат с цифрами]"
}
```

### БЛОК 8: Технические параметры (таблица 5-20 строк)
```markdown
## Технические характеристики

<div class="table-responsive">
<table class="table table-striped">
<thead><tr><th>Параметр</th><th>Значение</th><th>Единица</th><th>Примечание</th></tr></thead>
<tbody>
[5-20 строк. Каждая: параметр, значение, единица, контекст]
</tbody>
</table>
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "ProductModel",
  "name": "[Название продукта]",
  "specifications": [
    { "@type": "PropertyValue", "name": "[Параметр]", "value": "[Значение]", "unitCode": "[Единица]" }
  ]
}
```

### БЛОК 9: Сравнение с аналогами (таблица 5-8 строк, 3-5 колонок)
```markdown
## Сравнение с альтернативами

<div class="table-responsive">
<table class="table table-striped">
<thead><tr><th>Параметр</th><th>{company_name}</th><th>Альтернатива 1</th><th>Альтернатива 2</th></tr></thead>
<tbody>
[5-8 строк сравнения. Каждая с конкретными значениями. Выделяй преимущества жирным.]
</tbody>
</table>
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "Table",
  "name": "Сравнение [продуктов/услуг]",
  "row": [ ... ]
}
```

### БЛОК 10: Данные и статистика (5-7 цифр с полным контекстом)
```markdown
## Статистика и исследования

<div class="row">
[Каждый факт — отдельная карточка с иконкой, числом, объяснением и источником]
<div class="col-md-4 mb-3">
<div class="card border-0 shadow-sm h-100 p-4 text-center">
<div class="display-5 fw-bold text-primary mb-2">[ЦИФРА]</div>
<p class="mb-1"><strong>[Что измеряли]</strong></p>
<p class="text-muted small mb-0">[Источник, Год]</p>
</div>
</div>
[Повторить для 5-7 фактов]
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "statistic": [
    { "@type": "StatisticalVariable", "name": "[Название]", "value": "[Число]" }
  ]
}
```

### БЛОК 12: HowTo инструкция (5-7 шагов) ⭐
```markdown
## Как [действие]: пошаговая инструкция

<div class="row">
[Каждый шаг — номер + название + описание + результат]
<div class="col-12 mb-4">
<div class="d-flex">
<div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:48px;height:48px;font-size:20px;font-weight:700">1</div>
<div>
<h5 class="fw-bold mb-2">[Название шага — глагол + объект]</h5>
<p class="mb-2">[3-4 предложения: конкретные действия, инструменты, ожидаемый результат]</p>
<div class="bg-light p-3 rounded-3 border-start border-3 border-primary"><small>Результат шага: [конкретная метрика или достижение]</small></div>
</div>
</div>
</div>
[5-7 шагов]
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "[Название инструкции]",
  "step": [
    { "@type": "HowToStep", "position": "1", "name": "[Название]", "text": "[Описание]" }
  ],
  "totalTime": "P[X]M"
}
```

### БЛОК 13: Roadmap (4 фазы + таблица)
```markdown
## Стратегический план внедрения

<div class="table-responsive">
<table class="table table-bordered">
<thead class="bg-primary text-white"><tr><th>Период</th><th>Фаза</th><th>Задачи</th><th>Результаты</th></tr></thead>
<tbody>
[4 строки: Q1/Q2/Q3/Q4 или Месяц 1-2/3-4/5-8/9-12]
</tbody>
</table>
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "PlanAction",
  "name": "Roadmap [тема]",
  "startTime": "[год]-01-01",
  "endTime": "[год]-12-31",
  "step": [ ... ]
}
```

### БЛОК 14: Кейсы внедрения (3-6 кейсов)
```markdown
## Кейсы внедрения

[3-6 кейсов. Каждый: карточка с компанией, проблемой, решением, результатом, сроками]

<div class="card border-0 shadow-sm mb-4" style="border-left:4px solid var(--color-accent)">
<div class="card-body">
<h5>Кейс: [Название]</h5>
<div class="row">
<div class="col-md-6">
<p><strong>Клиент:</strong> [Компания, отрасль, размер]</p>
<p><strong>Задача:</strong> [Конкретная проблема с цифрами]</p>
</div>
<div class="col-md-6">
<p><strong>Решение {company_name}:</strong> [Что сделано]</p>
<p><strong>Результат:</strong> [Метрики с цифрами]</p>
<p><strong>Срок:</strong> [Период внедрения]</p>
</div>
</div>
</div>
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "CaseStudy",
  "headline": "[Название кейса]",
  "client": { "@type": "Organization", "name": "[Клиент]" },
  "problem": "[Проблема]",
  "solution": "[Решение]",
  "result": { "@type": "QuantitativeValue", "value": "[Результат]" }
}
```

### БЛОК 15: Расширенный FAQ (15-25 Q&A) ⭐
```markdown
<!-- @block: faq -->
## FAQ

[15-25 вопросов и ответов. Каждый вопрос — реальный запрос пользователя. Ответ 60-100 слов. Используй разнообразные типы: «что это», «сколько стоит», «как работает», «чем отличается», «какие сроки», «есть ли гарантия».]

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "[Вопрос]", "acceptedAnswer": { "@type": "Answer", "text": "[Ответ]" } }
  ]
}
```

### БЛОК 18: Отзывы клиентов (3-8 отзывов) ⭐
```markdown
## Отзывы клиентов

<div class="row">
[3-8 отзывов в карточках. Каждый: имя, должность, компания, текст 80-150 слов, рейтинг 5 звёзд, дата]
<div class="col-md-4 mb-3">
<div class="card border-0 shadow-sm h-100 p-4">
<div class="text-warning mb-2">★★★★★ 5/5</div>
<p class="fst-italic mb-3">"[Текст отзыва 80-150 слов — с конкретным результатом]"</p>
<p class="fw-bold mb-0">[Имя Фамилия]</p>
<p class="text-muted small">[Должность], [Компания]</p>
<p class="text-muted small">[Дата]</p>
</div>
</div>
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "bestRating": "5",
  "ratingCount": "[N]",
  "review": [ ... ]
}
```

### БЛОК 19: Авторство и E-E-A-T сигналы ⭐
```markdown
## Об авторе

<div class="card border-0 bg-light p-4">
<div class="d-flex">
<div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:64px;height:64px;font-size:24px">[Инициалы]</div>
<div>
<h5 class="fw-bold mb-1">[Имя Фамилия]</h5>
<p class="text-muted mb-2">[Должность], [Компания]</p>
<p class="mb-1"><strong>Опыт:</strong> [X лет в отрасли]</p>
<p class="mb-1"><strong>Образование:</strong> [ВУЗ, специальность]</p>
<p class="mb-1"><strong>Сертификации:</strong> [Список]</p>
<p class="mb-0"><strong>Контакты:</strong> [Email, телефон]</p>
</div>
</div>
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Имя]",
  "jobTitle": "[Должность]",
  "affiliation": { "@type": "Organization", "name": "[Компания]" },
  "alumniOf": { "@type": "EducationalOrganization", "name": "[ВУЗ]" },
  "award": ["[Награды]"]
}
```

### БЛОК 20: Источники информации (8-15 источников)
```markdown
## Источники

1. [Автор/Организация]. "[Название]." [Платформа/Журнал], [Год]. [URL]
2. ...
[8-15 источников. Разнообразные: академические, отраслевые, государственные, внутренние отчёты.]

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "citation": [ ... ]
}
```

### БЛОК 21: How We Know (100-200 слов)
```markdown
## Как мы это узнали

**Методология:** [Кто автор, какая квалификация, как собиралась информация, как проверялись факты, на основе каких данных сделаны выводы. Без общих фраз — конкретно.]

**Процесс проверки:** [Первичный опыт X+ лет, анализ Y+ отчётов/кейсов, интервью Z+ экспертов.]

**Организации, предоставившие данные:** [Список компаний или источников.]

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "methodology": "[Описание методологии]",
  "creator": { "@type": "Person", "name": "[Автор]" }
}
```

### БЛОК 24: CTA и контакты
```markdown
<!-- @block: cta -->
## {primary_cta}

<div class="text-center py-5" style="background:linear-gradient(135deg,var(--color-text),#2d1060);border-radius:var(--radius-lg);color:#fff">
<h2 class="fw-bold mb-3">[Заголовок CTA — обещание + выгода]</h2>
<p class="lead mb-4 opacity-85 mx-auto" style="max-width:600px">[2 предложения: что получит клиент, сроки, гарантия]</p>
<div class="d-flex justify-content-center flex-wrap gap-3">
<a href="tel:{phone}" class="btn btn-light btn-lg px-5 py-3 fw-bold text-primary">{phone}</a>
<a href="#form" class="btn btn-outline-light btn-lg px-5 py-3">Оставить заявку</a>
</div>
<p class="mt-3 small opacity-50">Отвечаем в течение 15 минут</p>
</div>

**Schema JSON-LD:**
{
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "contactType": "Sales",
  "telephone": "{phone}",
  "email": "{email}",
  "availableLanguage": ["ru"]
}
```

---

## ЭТАП 3: ФИНАЛЬНАЯ ПРОВЕРКА (выведи в ответ)

После генерации всех блоков выведи чек-лист:

```
✅ ПОЛНОТА:
☑ Все обязательные блоки (1-6, 10, 14, 15, 18, 19, 20, 21, 24) присутствуют
☑ Всего блоков: [X] из 24
☑ Общий объём: [N] слов ([Y] KB)

✅ КАЧЕСТВО:
☑ Все числа имеют источники [Название, Год]
☑ Каждый абзац ≤4 предложений
☑ Каждое предложение ≤20 слов
☑ Нет канцелярита и цепочек существительных
☑ Нет «таким образом», «подводя итог», «в заключение»

✅ GEO-КОМПОНЕНТЫ (10/10):
☑ Ранжирование: есть позиционирование
☑ Намерение: ясно «для кого»
☑ Конкуренты: есть сравнение
☑ Отзывы: 3-8 с рейтингами
☑ Тон: уверенный, экспертный
☑ Авторитетность: E-E-A-T сигналы
☑ УТП: уникальные особенности выделены
☑ Срочность: CTA с дедлайном
☑ Сканируемость: жирный текст, таблицы, списки
☑ Факты: все утверждения проверяемы

✅ JSON-LD МИКРОРАЗМЕТКА:
☑ Article (блок 1)
☑ QAPage (блок 6) — Featured Snippet
☑ HowTo (блок 12) — инструкция
☑ FAQPage (блок 15) — вопросы
☑ AggregateRating + Review (блок 18) — отзывы
☑ Person (блок 19) — автор
```

---

## ТРЕБОВАНИЯ К ТЕКСТУ

1. **Визуализация:** каждый абзац содержит конкретный образ или цифру
2. **Фальсифицируемость:** каждое утверждение проверяемо (истинно/ложно)
3. **Закон Каплана:** каждое слово работает. Нет воды.
4. **Структура абзаца-буррито:** одна мысль + обёртка из деталей
5. **Конфликт:** каждый пример по схеме [Было] → [Оказалось] → [Поэтому]
6. **Тест 2 секунды:** H1 и первый абзац понятны мгновенно
7. **Никаких «я начинаю», «сейчас я», «в этой статье мы»** — просто пиши контент
