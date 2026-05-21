# GitHub CMS — AI Agent Coordination System

You are an AI agent working with GitHub CMS. Your job is to help users manage their static website.

## How to use this file

1. Read the user's request
2. Find the matching instruction below
3. Read the linked instruction file in `.kilo/instructions/`
4. Follow it step-by-step — do not skip steps
5. After changes, run `npm run build` to verify

## Routing table

| User says (keywords) | Instruction file |
|---------------------|-----------------|
| create article, new post, write blog, новая статья, напиши пост, создай статью | `.kilo/instructions/create-article.md` |
| edit article, update post, исправь статью, обнови текст | `.kilo/instructions/edit-article.md` |
| create page, new page, about, contact, landing, новая страница, о компании, лендинг | `.kilo/instructions/create-page.md` |
| menu, navigation, add to menu, навигация, добавь в меню | `.kilo/instructions/update-menu.md` |
| theme, design, template, change look, тема, дизайн, шаблон, поменяй стиль | `.kilo/instructions/change-theme.md` |
| SEO, meta tags, JSON-LD, schema, мета-теги, разметка | `.kilo/instructions/seo-setup.md` |
| deploy, publish, ship, деплой, опубликуй, выложи | `.kilo/instructions/deploy.md` |
| translate, language, locale, EN version, перевод, английский, язык | `.kilo/instructions/localize.md` |
| product, shop, store, товар, магазин, price | `.kilo/instructions/manage-shop.md` |
| template, prompt, шаблон, промпт | `.kilo/instructions/manage-templates.md` |
| repo, repository, sync, governance, multi-repo, деплой репо, синхронизация, какой репо, где менять | `.kilo/instructions/repo-workflow.md` |

## Project layout (critical paths)

```
content/{locale}/          ← USER CONTENT — edit freely
  blog/                     ← articles as .md files
  pages/                    ← static pages (about.md, contact.md)
src/
  pages/                    ← Vue components — edit only per instruction
  components/               ← shared components (navbar, footer)
  i18n/                     ← translations (en.ts, ru.ts)
  generated/                ← AUTO-GENERATED — NEVER EDIT
scripts/                    ← build scripts — read only
```

## Critical content rules

1. Content lives in `content/{locale}/` — never hardcode text in `src/pages/`
2. Each `.md` file MUST have frontmatter: title, description, slug, date
3. Always add BOTH Russian (`ru`) and English (`en`) versions
4. After any content change: `npm run generate:content && npm run build`
5. `src/generated/` is auto-generated — editing it will be overwritten
6. Menu labels are in `src/i18n/{locale}.ts` — `nav` section
7. When in doubt, check `.kilo/instructions/` for the specific task

## Repository map — strict boundaries

| Repository | Role | Visibility | Code edits | Content edits |
|---|---|---|---|---|
| `hubcms-dot/githubcms` | Core + Production | Private | **YES — only here** | YES |
| `hubcms-dot/githubcms_free` | Demo Free | Private | **NO** (sync from core) | YES |
| `hubcms-dot/githubcms_pro` | Demo Pro | Private | **NO** (sync from core) | YES |
| `biznesemarket/githubcms` | Distro Free | Public | **NO** (sync-to-distro) | NO |
| `biznesemarket/githubcms-pro` | Distro Pro | Public | **NO** (sync-to-distro) | NO |

## Multi-repo critical rules

8. **Core is the SINGLE source of truth for code.** Edit `src/`, `scripts/`, `public/`, configs ONLY in `hubcms-dot/githubcms`.
9. **Content is NEVER synced between repos.** Each repo stores its own content in `content/{locale}/`.
10. **Demo repos receive core code via automatic sync.** Any manual code edits in Free/Pro repos WILL BE OVERWRITTEN.
11. **Distro repos** (`biznesemarket/*`) receive cleaned core code via `sync-to-distro.yml`. README/CHANGELOG/CONTRIBUTING are maintained manually — never overwritten.
12. **Secrets are NEVER copied between repos.** Configure manually via GitHub Settings → Secrets and variables → Actions.
13. **After any code change in Core → run sync.** `gh workflow run sync-free.yml` + `gh workflow run sync-pro.yml`.
14. **After code change: `npm run build && npm run test` before commit.**
15. **Full governance reference:** `docs/operations/multi-repo-governance.md` — canonical source of truth.

## Sync flow

```
Core (hubcms-dot/githubcms)
  │
  ├─ sync-free.yml ──→ githubcms_free ── free-deploy.yml ──→ demofree.githubcms.{ru,com}
  ├─ sync-pro.yml ───→ githubcms_pro ─── pro-deploy.yml ───→ demopro.githubcms.{ru,com}
  └─ sync-to-distro.yml → biznesemarket/githubcms{,-pro}
```
