# Purple GEO: SEO/GEO Article Prompt

## Purpose

Use this prompt when the page needs a strong SEO article with GEO-ready structure, but does not require the full 24-block expert article format.

## Required Inputs

| Variable | Description |
|---|---|
| `{article_title}` | Final article title. |
| `{key_slug}` | URL slug in kebab-case. |
| `{primary_keyword}` | Main search phrase. |
| `{search_intent}` | Informational, commercial, transactional, navigational, or local. |
| `{target_audience}` | Reader segment. |
| `{source_facts}` | Verified facts, constraints, examples, or explicit unknowns. |
| `{company_name}` | Brand or site name. |
| `{primary_cta}` | Main next action. |

## Generation Rules

Generate one valid GitHub CMS Markdown article.

Hard rules:

- Do not invent facts outside `{source_facts}`.
- Do not include private API keys, access tokens, passwords, or secrets.
- Use public PixInLink image URLs only.
- Keep YAML frontmatter valid.
- Preserve required `<!-- @block: ... -->` markers.
- Bootstrap 5 HTML is allowed only when it improves scanability and uses safe classes from `ai-instructions.md`.

## Output Contract

```markdown
---
title: "{article_title}"
description: "[120-160 character summary with the main benefit and entity]"
slug: "{key_slug}"
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
author: "{company_name}"
category: "Guides"
tags:
  - "{primary_keyword}"
schema_type: "Article"
layout: "article"
cover_image: "https://pixinlink.ru/api/v1/1200x630/{key_slug}"
geo:
  intent: "{search_intent}"
---

<!-- @block: answer-first -->
[Give the direct answer in 60-120 words. Name the main entity, audience, and outcome.]

## [H2 with the main query]

[Explain the topic, who it is for, and why it matters.]

<!-- @block: key-facts -->
## Key Facts

- **Fact 1:** [Verified fact from source_facts.]
- **Fact 2:** [Verified fact from source_facts.]
- **Fact 3:** [Verified fact from source_facts.]

<!-- @block: featured-snippet -->
## Short Answer

[40-60 word extractable answer.]

## How It Works

[Explain the process in ordered steps or compact paragraphs.]

## Comparison

| Option | Best for | Limitation |
|---|---|---|
| [Option A] | [Use case] | [Constraint] |
| [Option B] | [Use case] | [Constraint] |

<!-- @block: faq -->
## FAQ

### [Question 1]

[Answer.]

### [Question 2]

[Answer.]

<!-- @block: cta -->
## Next Step

[Tie the article to `{primary_cta}` without aggressive sales language.]

<!-- @block: schema-hints -->
schema:
  primary_entity: "{primary_keyword}"
  intent: "{search_intent}"
  recommended_types:
    - Article
    - FAQPage
```
