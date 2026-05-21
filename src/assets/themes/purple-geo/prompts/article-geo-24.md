# GEO Expert Article Template — 24 Blocks

## Purpose

Generate expert-level articles with 24 Generative Engine Optimization blocks. Optimized for AI-search visibility (ChatGPT, Perplexity, Google AI Overviews). Designed for the Purple GEO theme.

## Required Variables

| Variable | Example |
|---|---|
| `{article_title}` | "GEO-оптимизация для промышленных сайтов" |
| `{key_slug}` | "geo-optimizatsiya-promyshlennyh-sajtov" |
| `{main_entity}` | "Промышленная GEO-оптимизация" |
| `{target_audience}` | "Руководители промышленных предприятий" |
| `{unique_claim}` | "Рост AI-трафика на 400% за 6 месяцев без увеличения рекламного бюджета" |
| `{company_name}` | "Ваша Компания" |
| `{company_description}` | "Агентство промышленного маркетинга" |
| `{source_facts}` | "Факты, цифры, источники" |
| `{primary_cta}` | "Получить бесплатный аудит" |
| `{contact_phone}` | "+7 (000) 000-00-00" |

## Generation Protocol

### Phase 0: Analysis (internal, not in output)

AI must analyze BEFORE writing:

**Audience:** Who reads this? Professional level, context, current state → desired state, main objection.

**Core Idea:** One killer fact or paradox — mathematically true, surprising, creates conflict.

**Conflict:** [PROBLEM] vs [SOLUTION] — the tension that drives the article.

**Unique Claim:** One statement only this article can make — falsifiable, visualizable.

### Phase 1-5: Iterative Generation

Generate in 5 parts. Each part produces valid Markdown. After all parts, merge into one file.

**Each part starts with:** «Найди оптимальный способ (или ответ), а не первый подходящий.»

---

## PART 1: Opening Blocks (Blocks 1-5)

Generate ONLY these blocks:

**Block 1: Hero + Title**
```markdown
---
title: "{article_title}"
description: "[2-3 предложения с ключевым тезисом и цифрой]"
slug: "{key_slug}"
date: "{YYYY-MM-DD}"
author: "{company_name}"
category: "[Категория]"
tags: [ключевые, теги, через, запятую]
schema_type: "Article"
layout: "article"
cover_image: "https://pixinlink.ru/api/v1/1200x630/описание изображения]&style=minimal"
---
```

**Block 2: Answer-First**

```markdown
<!-- @block: answer-first -->
[Прямой ответ на главный вопрос статьи. 2-3 предложения с ключевым тезисом и цифрами. Формат: жирный параграф-ответ + источник данных в скобках.]
```

**Block 3: Key Facts**

```markdown
<!-- @block: key-facts -->
## Ключевые данные о {main_entity}

[5-7 фактов. Каждый факт: жирная цифра + объяснение + источник (год). Используй данные из source_facts. Маркированный список.]
```

**Block 4: TL;DR + Definition**

```markdown
## Суть за 30 секунд

[Одно предложение: кто, что, почему, результат]

### Что такое {main_entity}

[Энциклопедическое определение. 3-4 предложения. Формат: «X — это Y, который Z». Без вводных слов.]
```

**Block 5: Featured Snippet**

```markdown
### Почему {main_entity} важно именно сейчас?

[Прямой ответ 40-60 слов. Первое предложение — готовый featured snippet для нейросетей. Вопросительная формулировка в заголовке, утвердительный ответ в теле.]
```

---

## PART 2: Core Content (Blocks 6-10)

**Block 6: Problem Statement**

```markdown
## Почему традиционные подходы не работают

[2-3 параграфа: текущее состояние рынка, почему старые методы перестали работать, конкретные цифры из source_facts. Каждый параграф ≤4 предложений.]
```

**Block 7: Problem → Solution → Result**

```markdown
<div class="row">
<div class="col-md-4 mb-3">
<div class="card border-0 bg-light h-100 p-3" style="border-top:4px solid #dc3545">
<h5>Проблема</h5>
<p>[Описание проблемы по теме. 3-4 предложения с цифрами]</p>
</div>
</div>
<div class="col-md-4 mb-3">
<div class="card border-0 bg-light h-100 p-3" style="border-top:4px solid var(--color-accent)">
<h5>Решение {company_name}</h5>
<p>[Как решается проблема. Конкретные действия]</p>
</div>
</div>
<div class="col-md-4 mb-3">
<div class="card border-0 bg-light h-100 p-3" style="border-top:4px solid #198754">
<h5>Результат</h5>
<p>[Измеримый результат с цифрами. ROI, сроки]</p>
</div>
</div>
</div>
```

**Block 8: Statistics**

```markdown
## Статистика и данные

[6 конкретных числовых фактов. Каждый: жирная цифра + объяснение + источник в скобках. Три колонки по 2 факта. Используй только source_facts.]
```

**Block 9: Comparison Table**

```markdown
## Сравнение подходов

<div class="table-responsive">
<table class="table table-striped">
<thead><tr><th>Критерий</th><th>Традиционный подход</th><th>{main_entity}</th></tr></thead>
<tbody>
[5-6 строк сравнения с конкретными данными]
</tbody>
</table>
</div>
```

**Block 10: How It Works — Mechanics**

```markdown
## Как работает {main_entity}

[4-5 шагов с номерами. Каждый шаг: название + 2-3 предложения описания + результат.]
```

---

## PART 3: Authority & Depth (Blocks 11-16)

**Block 11: Case Studies**

```markdown
## Кейсы внедрения

### [Название кейса 1]
<div class="card border-0 bg-light p-3 mb-3">
**Клиент:** [отрасль, размер]
**Задача:** [конкретная проблема]
**Решение {company_name}:** [что сделано]
**Результат:** [конкретные метрики]
**Срок:** [период]
</div>

[2-3 кейса]
```

**Block 12: Roadmap**

```markdown
## Стратегический план внедрения

<div class="table-responsive">
<table class="table table-bordered">
<thead class="bg-primary text-white"><tr><th>Период</th><th>Фаза</th><th>Действия</th><th>Результаты</th></tr></thead>
<tbody>
[4 строки: Q1/Q2/Q3/Q4 или Месяц 1-2/3-4/5-8/9-12]
</tbody>
</table>
</div>
```

**Block 13: E-E-A-T Signals**

```markdown
## E-E-A-T факторы

<div class="row">
<div class="col-md-6 mb-3">
<div class="card border-0 bg-light h-100 p-3">
<h5>Опыт (Experience)</h5>
<p>[Практический опыт компании в теме]</p>
</div>
</div>
<div class="col-md-6 mb-3">
<div class="card border-0 bg-light h-100 p-3">
<h5>Экспертность (Expertise)</h5>
<p>[Квалификация, сертификации, методология]</p>
</div>
</div>
<div class="col-md-6 mb-3">
<div class="card border-0 bg-light h-100 p-3">
<h5>Авторитетность (Authoritativeness)</h5>
<p>[Признание в отрасли, ссылки, публикации]</p>
</div>
</div>
<div class="col-md-6 mb-3">
<div class="card border-0 bg-light h-100 p-3">
<h5>Достоверность (Trustworthiness)</h5>
<p>[Точность данных, источники, прозрачность]</p>
</div>
</div>
</div>
```

**Block 14: Author Credentials**

```markdown
## Об авторе

**Автор:** [Имя]
**Должность:** [Роль в компании]
**Опыт:** [Количество лет в теме]
**Контакты:** {contact_phone}
```

**Block 15: Sources**

```markdown
## Источники информации

[5-10 источников. Каждый: автор/организация, год, название, платформа. Реальные источники из source_facts.]
```

**Block 16: How We Know (Methodology)**

```markdown
## Как мы это узнали

[2-3 предложения: как собирали информацию, как проверяли факты, откуда данные. Без общих фраз.]
```

---

## PART 4: Engagement (Blocks 17-20)

**Block 17: 🎯 AI Audience Aspects (5 key differences)**

```markdown
## Почему AI-аудитория отличается

[5 аспектов. Каждый: название + иконка + 3-4 предложения. Карточки в 2 колонки.]
```

**Block 18: 🛡️ HowTo — Step-by-Step Instructions**

```markdown
<!-- @block: faq -->
## FAQ

**Q: Что такое {main_entity}?**
**A:** [40-80 слов]

**Q: Сколько стоит внедрение?**
**A:** [Факторы ценообразования, без конкретных цифр. Диапазон]

**Q: Какие сроки получения результата?**
**A:** [Реалистичные сроки с диапазоном]

**Q: Как измерить эффективность?**
**A:** [Конкретные метрики и инструменты]

[8-12 вопросов]
```

**Block 19: Client Reviews**

```markdown
## Отзывы клиентов

<div class="row">
[3 карточки col-md-4. Каждая: имя, должность, компания, текст отзыва 3-4 предложения с конкретным результатом, 5 звёзд, дата]
</div>
```

**Block 20: Certifications & Standards**

```markdown
## Сертификаты и стандарты

[Список: название сертификата, год, описание. Если нет реальных — укажи отраслевые стандарты, применимые к теме.]
```

---

## PART 5: Closing (Blocks 21-24)

**Block 21: Final CTA**

```markdown
<!-- @block: cta -->
## {primary_cta}

<div class="bg-light p-4 rounded-3 text-center">
<h3>Готовы начать?</h3>
<p>Свяжитесь с нами для бесплатного аудита. Ответим в течение 15 минут.</p>
<div class="d-flex justify-content-center gap-3 flex-wrap">
<a href="tel:{contact_phone}" class="btn btn-primary btn-lg">{contact_phone}</a>
<a href="#" class="btn btn-outline-primary btn-lg">Написать в мессенджер</a>
</div>
</div>
```

**Block 22: Related Content**

```markdown
## Связанные материалы

[3-4 ссылки на другие статьи блога по теме]
```

**Block 23: Schema Markup Hints**

```markdown
<!-- @block: schema-hints -->
[Указания для системы: тип схемы, дополнительные поля JSON-LD]
```

**Block 24: Meta Review Checklist**

```markdown
[Системный блок — не показывать в статье. Проверка: все ли блоки заполнены, все ли source_facts использованы, нет ли [REVIEW REQUIRED].]
```

---

## Phase 6: Merge & Edit (Nora Gal Style)

After all 5 parts generated, AI must:

1. Merge all blocks into one Markdown file
2. Apply Nora Gal editing rules:
   - Вырезать канцелярит и цепочки существительных
   - Заменить отглагольные на сильные глаголы
   - Убрать лишние причастия и деепричастия
   - Пассив → актив
   - Абстрактные слова → конкретные предметы и образы
   - Иностранные слова → точные русские
   - Длинное → короткое, сложное → простое
3. Output final article with:
   - Title
   - Lead paragraph
   - All blocks in order
   - Final CTA
4. Show user for review

## Output Format

Final output is a single `.md` file with YAML frontmatter. Save as `content/blog/{YYYY-MM-DD}-{key_slug}.md`.

## Forbidden

- Do NOT emit secret-like tokens
- Do NOT use `[REVIEW REQUIRED]` — replace with real data
- Do NOT use `<script>`, `<iframe>`, `onclick`, `javascript:`
- Do NOT output text before `---` or after final block
- Do NOT use Bootstrap classes outside allowlist
- Do NOT invent testimonials without `[REVIEW REQUIRED]` marker
