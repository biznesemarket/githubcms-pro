---
title: "GitHub Actions CI/CD — автоматический деплой с 368 тестами"
description: "workflow_dispatch, rsync, атомарный symlink, health-check. 10 категорий тестов при каждом push."
slug: "github-actions"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "DevOps"
tags:
  - github-actions
  - ci-cd
  - rsync
  - symlink
  - атомарный-деплой
  - health-check
schema_type: "HowTo"
layout: "article"
---

CI/CD GitHub CMS: 368 тестов (10 категорий) при каждом push. Деплой через rsync → атомарный symlink → health-check. 0 downtime, 2 минуты до production.

## Настройка

### Шаг 1: GitHub Secrets
IP-адрес сервера, имя пользователя SSH, SSH-ключ сервера в Settings → Secrets → Actions.

### Шаг 2: Workflow
deploy.yml: workflow_dispatch (dry_run/confirm_deploy), validate-build job → deploy job.

### Шаг 3: Атомарный деплой
rsync → /var/www/site/next → health-check → ln -sfn next current.

### Шаг 4: Тесты
10 категорий: content, markdown, SEO, безопасность, PixInLink, утилиты, интеграция, производительность, доступность, деплой.

## FAQ

### Что делать если тесты упали?
**Ответ:** Логи в GitHub Actions. Типичные ошибки: нарушение Frontmatter, отсутствие полей, секретные токены. Каждая ошибка — файл и строка.