---
title: "Деплой статического сайта — от git push до production за 2 минуты"
description: "Vite SSG → nginx → Let's Encrypt → GitHub Actions → rsync. 368 тестов, 0 downtime, TTFB ≤200ms."
slug: "deploj-obzor"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "DevOps"
tags:
  - деплой
  - vite-ssg
  - ci-cd
  - github-actions
  - nginx
  - vps
schema_type: "HowTo"
layout: "article"
---

Полный цикл деплоя GitHub CMS: git push → GitHub Actions → npm ci → npm run build → rsync → атомарное symlink → health-check. Время: 2 минуты. TTFB ≤200ms, 0 downtime.

## Процесс деплоя

### Шаг 1: Git Push
Отправка в main запускает workflow автоматически.

### Шаг 2: Сборка
npm ci → npm run build. Vite SSG генерирует HTML + JSON-LD + sitemap + RSS.

### Шаг 3: Деплой
rsync в /var/www/site/next/ → symlink current → next переключается атомарно.

### Шаг 4: Health-check
curl /healthz → OK. При ошибке — откат к предыдущей версии.

## GitHub Actions workflow
deploy.yml с workflow_dispatch: dry_run (тест) и confirm_deploy (боевой). Секреты: IP-адрес сервера, имя пользователя SSH, SSH-ключ сервера — никогда в коде.

## FAQ

### Сколько времени занимает деплой?
**Ответ:** 2 минуты. npm ci 15s + build 12s + rsync 3s + health-check 1s.