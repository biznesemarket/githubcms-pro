# AI Instructions: Purple GEO Template

## Overview

You are generating content for a site using the Purple GEO theme (GitHub CMS). Your Markdown will be rendered with the Purple GEO design system — gradient hero sections, shadow cards, rounded corners, Inter font family.

## Template Selection

| Request Type | Use |
|---|---|
| Expert article with statistics, case studies, frameworks | `article-geo-24.md` |
| Standard informational article | `article-seo-geo.md` |

## CSS Classes Available in Purple GEO Theme

When writing Bootstrap HTML inside Markdown, use ONLY these classes:

**Layout:** `container`, `row`, `col-md-*`, `col-lg-*`

**Cards:** `card`, `card-body`, `border-0`, `bg-light`, `h-100`, `p-3`, `p-4`, `p-5`

**Tables:** `table`, `table-striped`, `table-bordered`, `table-responsive`, `thead`, `tbody`

**Text:** `text-center`, `text-start`, `text-primary`, `text-success`, `text-danger`, `text-warning`, `text-muted`, `text-white`

**Backgrounds:** `bg-primary`, `bg-light`, `bg-white`, `bg-dark`

**Alerts:** `alert`, `alert-light`, `alert-info`, `alert-success`, `border-0`

**Buttons:** `btn`, `btn-primary`, `btn-lg`, `btn-sm`, `btn-outline-primary`, `btn-light`

**Utilities:** `d-flex`, `align-items-center`, `justify-content-center`, `gap-3`, `flex-wrap`, `me-2`, `ms-3`, `mb-*`, `mt-*`, `py-*`, `px-*`

**Radius:** `rounded-3`, `rounded-circle`

**Shadows:** `shadow-sm` (auto-applied)

## Style Rules

1. **Font:** Never specify font-family — the theme uses Inter
2. **Colors:** Never hardcode hex colors — use CSS variables via Bootstrap classes
3. **Spacing:** Use Bootstrap spacing utilities (mb-3, py-5, etc.)
4. **Cards:** Always add `border-0` for clean modern look
5. **Tables:** Always wrap in `<div class="table-responsive">`
6. **CTAs:** Always use `btn btn-primary btn-lg` for main action
7. **Dark theme:** All colors work in dark mode via CSS variables

## Block Markers

Use these block markers to trigger special rendering:

- `<!-- @block: answer-first -->` — gradient purple box
- `<!-- @block: key-facts -->` — white card with purple bottom border
- `<!-- @block: faq -->` — purple-tinted accordion
- `<!-- @block: cta -->` — dark gradient full-width CTA
- `<!-- @block: schema-hints -->` — hidden SEO metadata

## Example Block Structure

```markdown
<!-- @block: answer-first -->
GEO-оптимизация увеличивает AI-трафик на 400% за 6 месяцев без роста рекламного бюджета (SearchBridge AI, 2026).

<!-- @block: key-facts -->
## Ключевые факты
- **47%** компаний уже получают трафик из AI-ответов (Semrush, 2026)
- **400%** средний рост цитируемости после GEO-оптимизации

<!-- @block: faq -->
## FAQ
**Q: Что такое GEO-оптимизация?**
**A:** GEO (Generative Engine Optimization) — это...

<!-- @block: cta -->
## Начните сегодня
<div class="bg-light p-4 rounded-3 text-center">
<a href="#" class="btn btn-primary btn-lg">Получить аудит</a>
</div>
```
